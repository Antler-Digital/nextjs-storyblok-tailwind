module.exports = {
  images: {
    domains: ['a.storyblok.com']
  },
  async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/admin',
          destination: `/admin/editor.html`
        }
      ]
    };
  }
};
