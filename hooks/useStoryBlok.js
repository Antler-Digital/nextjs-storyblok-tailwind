import { useEffect, useState } from 'react';

import Storyblok from '../lib/storyblok';

export default function useStoryblok(originalStory, preview, newPath) {
  let [story, setStory] = useState(originalStory);
  // a path tracks whether to update the story because of navigation
  // there were issues with the CMS not updating to reflect content changes due to the story being reset to the original story
  let [path, setPath] = useState(newPath);

  // handles updating the story dynamically
  if (path !== newPath) {
    setPath(newPath);
    setStory(originalStory);
  }
  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  function initEventListeners() {
    if (window.storyblok) {
      window.storyblok.init();

      // reload on Next.js page on save or publish event in the Visual Editor
      window.storyblok.on(['change', 'published'], () => location.reload(true));

      // live update the story on input events
      window.storyblok.on('input', event => {
        if (event.story.content._uid === story.content._uid) {
          event.story.content = window.storyblok.addComments(
            event.story.content,
            event.story.id
          );
          setStory(event.story);
        }
      });
    }
  }

  useEffect(() => {
    // load the bridge if we're in preview mode
    if (preview) {
      addBridge(initEventListeners);
    }
  }, [preview]);

  return story;
}

// appends the bridge script tag to our document
// see https://www.storyblok.com/docs/guide/essentials/visual-editor#installing-the-storyblok-js-bridge
function addBridge(callback) {
  // check if the script is already present
  const existingScript = document.querySelector('#storyblokBridge');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://app.storyblok.com/f/storyblok-latest.js?t=${Storyblok.accessToken}`;
    script.id = 'storyblokBridge';
    document.body.append(script);
    script.addEventListener('load', () => {
      // once the scrip is loaded, init the event listeners
      callback();
    });
  } else {
    callback();
  }
}
