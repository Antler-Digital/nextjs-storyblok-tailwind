import StoryblokClient from 'storyblok-js-client';

const Storyblok = ({ preview = false } = {}) => {
  return new StoryblokClient({
    accessToken: preview
      ? process.env.STORYBLOK_PREVIEW_API_KEY
      : process.env.STORYBLOK_API_KEY,
    cache: {
      clear: 'auto',
      type: 'memory'
    }
  });
};

export default Storyblok;
