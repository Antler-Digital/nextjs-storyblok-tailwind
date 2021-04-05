// If you export an async function called getStaticPaths from a page that uses dynamic routes,
// Next.js will statically pre-render all the paths specified by getStaticPaths.
// Add the following code to any page with dynamic routes like pages/[slug].js to enable this feature.

// it only renders the paths provided apparently
export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/links/', {});

  let paths = [];

  for (const linkKey of Object.keys(data.links)) {
    if (!data.links[linkKey].is_folder && data.links[linkKey].slug !== 'home') {
      paths.push({ params: { slug: data.links[linkKey].slug } });
    }
  }

  return {
    paths: paths,
    fallback: false
  };
}
