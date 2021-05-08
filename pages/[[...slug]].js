import { useRouter } from 'next/router';

import DynamicComponent from '../components/DynamicComponent';
import Footer from '../components/layout/Footer';
import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';
import useStoryblok from '../hooks/useStoryBlok';
import Storyblok from '../lib/storyblok';

export default function Home({ story, layout={}, preview }) {
  // the Storyblok hook to enable live updates
  const router = useRouter();
  const path = router?.query?.slug || false;
  const storyBlok = useStoryblok(story, preview, path);
  const footer = layout.footer && layout.footer[0];
  const nav = layout.nav && layout.nav[0];

  return (
    <>
     { nav &&  <Nav {...nav} />}
      <Layout preview={preview}>
        {storyBlok?.content.body
          ? storyBlok.content.body.map(blok => (
              <DynamicComponent
                blok={blok}
                key={blok._uid}
                newsArticles={newsArticles}
              />
          ))
          : null}
      </Layout>
     { footer &&  <Footer {...footer} />}
    </>
  );
}
export async function getStaticProps({ preview, params }) {
  const storyBlockInstance = Storyblok({
    preview: preview
  });

  // For accessing latest content
  // let newsArticles = false;

  let slug = params?.slug || 'home';

  let parameters = {
    version: 'published' // or 'published'
  };

  if (preview) {
    parameters.version = 'draft';

    parameters.cv = Date.now();
  }

  // Managing nested catch all routes
  let { data } = await storyBlockInstance.get(
    `cdn/stories/${Array.isArray(slug) ? slug.join('/') : slug}`,
    parameters
  );

  // creates list of component names
  // used to check if it needs to lead component types
  // const componentNames = data.story.content.body.map(
  //   ({ component }) => component
  // );

  // check to see if there is a component that requires the news articles
  // const requiresArticles = componentNames.indexOf('LatestNewsSection') > 0;

  // if there is then fetch news articles
  // if (requiresArticles) {
  //   newsArticles = await storyBlockInstance.get(`cdn/stories/`, {
  //     ...parameters,
  //     starts_with: 'news/',
  //     filter_query: {
  //       content: {
  //         component: {
  //           is: 'NewsArticle'
  //         }
  //       }
  //     },
  //     per_page: 12,
  //     sort_by: 'first_published_at:desc'
  //   });
  // }

  // you will need a layout component
  // let layout = await storyBlockInstance.get(
  //   `cdn/stories/<<ADD_ID_HERE>>`,
  //   parameters
  // );

  return {
    props: {
      story: data ? data.story : false,
      // layout: layout.data ? layout.data.story.content : false,
      preview: preview || false
      // newsArticles: newsArticles ? newsArticles.data?.stories : []
    },

    revalidate: 10
  };
}

export async function getStaticPaths() {
  // fetch all pages from Storyblok
  let { data } = await Storyblok().get('cdn/links/', {});

  // create the links array
  const links = Object.keys(data.links).map(link => data.links[link]);

  const paths = links
    .map(link => {
      // check to see if the path is a Layout component
      const path = ['Site Layout'].includes(link.name) ? '' : link.real_path;
      return {
        // if path is index route then return no forward /
        // if path is not index route then split on subpath to provide in correct format for NextJS catch all routes and remove empty strings
        params: { slug: path === '/' ? [''] : path.split('/').filter(n => n) }
      };
    })
    // filter out Layout Components
    .filter(link => link.params.slug.length > 0);

  return {
    paths,
    fallback: false
  };
}
