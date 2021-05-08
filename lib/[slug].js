import DynamicComponent from '../components/DynamicComponent';
import Footer from '../components/layout/Footer';
import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';
import useStoryblok from '../hooks/useStoryBlok';
import Storyblok from './storyblok';

export default function Home({ story, preview, layout }) {
  // the Storyblok hook to enable live updates

  const storyBlok = useStoryblok(story, preview);

  const footer = layout?.footer[0];
  const nav = layout?.nav[0];
  return (
    <>
      <Nav {...nav} />
      <Layout preview={preview}>
        <h1 className="text-6xl">{storyBlok ? storyBlok.name : 'My Site'}</h1>
        {storyBlok
          ? storyBlok.content.body.map(blok => (
            <DynamicComponent blok={blok} key={blok._uid} />
          ))
          : ''}
      </Layout>
      <Footer {...footer} />
    </>
  );
}
export async function getStaticProps({ preview, params }) {
  let slug = params?.slug;

  let parameters = {
    version: 'draft' // or 'published'
  };

  if (preview) {
    parameters.version = 'draft';

    parameters.cv = Date.now();
  }

  let { data } = await Storyblok.get(`cdn/stories/${slug}`, parameters);

  return {
    props: {
      story: data ? data.story : false,
      preview: preview || false
    },
    revalidate: 10
  };
}

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
