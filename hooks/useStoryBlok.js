/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import React from 'react';
import StoryblokClient from 'storyblok-js-client';

// add the relations to resolve here
const relations = '';

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_API_KEY,
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

const resolvedRelations = relations.split(',');

export default function useStoryblok(originalStory, preview) {
  let [story, setStory] = useState(originalStory);

  // handles the route updating and changes
  React.useEffect(() => {
    if (story.uuid !== originalStory.uuid) {
      setStory(originalStory);
    }
  }, [originalStory]);

  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  function initEventListeners() {
    const { StoryblokBridge } = window;
    if (typeof StoryblokBridge !== 'undefined') {
      // initialize the bridge with your token
      const storyblokInstance = new StoryblokBridge({
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_API_KEY,
        resolveRelations: resolvedRelations
      });

      // reload on Next.js page on save or publish event in the Visual Editor
      storyblokInstance.on(['change', 'published'], () => {
        location.reload(true);
      });

      // live update the story on input events
      storyblokInstance.on('input', event => {
        // check if the ids of the event and the passed story match
        if (story && event.story.content._uid === story.content._uid) {
          // change the story content through the setStory function
          setStory(event.story);
        }
      });

      storyblokInstance.on('enterEditmode', event => {
        // loading the draft version on initial enter of editor
        Storyblok.get(`cdn/stories/${event.storyId}`, {
          version: 'draft',
          resolve_relations: resolvedRelations
        })
          .then(({ data }) => {
            if (data.story) {
              setStory(data.story);
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }

  // appends the bridge script tag to our document
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#installing-the-storyblok-js-bridge
  function addBridge(callback) {
    // check if the script is already present
    const existingScript = document.getElementById('storyblokBridge');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
      script.id = 'storyblokBridge';
      document.body.appendChild(script);
      script.onload = () => {
        // once the script is loaded, init the event listeners
        callback();
      };
    } else {
      callback();
    }
  }

  useEffect(() => {
    // only load inside preview mode
    if (preview) {
      // first load the bridge, then initialize the event listeners
      addBridge(initEventListeners);
    }
  }, []); // runs the effect only once & defines effect dependencies

  return story;
}
