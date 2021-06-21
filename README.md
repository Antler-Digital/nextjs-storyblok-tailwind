# NextJs, Storyblok & Tailwind CSS Template

Base setup for all Antler Digital NextJS Storyblok sites.

## Resources

https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-in-5-minutes#adding-preview-mode

https://www.storyblok.com/docs/api/management#core-resources/component-groups/create-component-group

### NextJS Graphql Example

https://github.com/vercel/next.js/tree/canary/examples/cms-storyblok

### Graphql Playground

https://gapi-browser.storyblok.com/?token=YOUR_STORYBLOK_SPACE_TOKEN



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
- Font Awesome (for Story Blok Plugin add in icons in _app.js)

## Update 21/06/21
- Updated packages 
  - Next 11 ( added support for local blurred images in Next/ Image and dynamic support with own server)
  - Added Next JS Linting
  - TailwindCSS 4.2+ 
    - Better JIT and CLI for Tailwind
    - Can use before: etc to set things straight from classNames

## Update 08/05/21
- Updated the prettier configs to remove Unicorn and Tailwind (they are irritating)
- Added nextJs config with default assets locale for storyBlok (required to pull images for NextJs/Image)
- Moved examples of other page generation (specific: i.e. index.js and semi-catch all: [...slug].js to lib folders in case of need) - shouldn't be required with a  catch all 
- Prevented no layout errors
- added useBodyLock hook for implementing navigation menus
- added useSessionStorage and useLocalStorage hooks 
- updated the purge instructions for TW 

## Update 30/04/21
- Updated to completely dynamic generation of pages with [[...slug]]
- Add in Fontawesome support for Storyblok plugin

## Update 28/04/21

- Added Rich text rendered to render Storyblok rich text in a more react and better way

## Updates 23/04/21

- Added Typescript support

## Updates 21/04/21

- Updated Tailwind packages and set it to use the JIT mode -> see more here https://tailwindcss.com/docs/just-in-time-mode#enabling-jit-mode

## To Add

1. Component management - want to extract and pull down components and then be able to upload base components to the StoryBlok instance using their management API
2. Extract individual preview and component logic into specific functions that are easier to handle an reuse.
