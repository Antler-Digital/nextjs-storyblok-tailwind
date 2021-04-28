# NextJs, Storyblok & Tailwind CSS Template

Base setup for all Antler Digital NextJS Storyblok sites.

## Resources

https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-in-5-minutes#adding-preview-mode

https://www.storyblok.com/docs/api/management#core-resources/component-groups/create-component-group

### NextJS Graphql Example

https://github.com/vercel/next.js/tree/canary/examples/cms-storyblok

### Graphql Playground

https://gapi-browser.storyblok.com/?token=YOUR_STORYBLOK_SPACE_TOKEN

## Update 28/04/21

- Added Rich text rendered to render Storyblok rich text in a more react and better way

## Updates 23/04/21

- Added Typescript support

## Updates 21/04/21

- Updated Tailwind packages and set it to use the JIT mode -> see more here https://tailwindcss.com/docs/just-in-time-mode#enabling-jit-mode

## Includes

- Eslint
  - Custom config set
- Prettier
- Tailwind CSS
- NextJS
- Storyblok
- React Hook Forms
- AOS (watch out for static rendering and google crawlers not seeing correct content
- Storyblok Rich Text renderer see docs here https://github.com/claus/storyblok-rich-text-react-renderer

## To Add

1. Component management - want to extract and pull down components and then be able to upload base components to the StoryBlok instance using their management API
2. Extract individual preview and component logic into specific functions that are easier to handle an reuse.
