import DynamicComponent from '../components/DynamicComponent';
import Footer from '../components/layout/Footer';
import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';
import useStoryblok from '../hooks/useStoryBlok';
import Storyblok from '../lib/storyblok';

export default function Home({ story, layout, preview }) {
  // the Storyblok hook to enable live updates

  const storyBlok = useStoryblok(story, preview);

  const footer = layout.footer[0];
  const nav = layout.nav[0];
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
export async function getStaticProps(context) {
  let slug = 'home';

  let parameters = {
    version: 'draft' // or 'published'
  };

  if (context.preview) {
    parameters.version = 'draft';

    parameters.cv = Date.now();
  }

  let { data } = await Storyblok.get(`cdn/stories/${slug}`, parameters);
  // let layout = await Storyblok.get(
  //   `cdn/stories/<<Add layout here >>`,
  //   parameters
  // );
  let layout = false;

  return {
    props: {
      story: data ? data.story : false,
      layout: layout?.data ? layout?.data.story.content : false,
      preview: context.preview || false
    },

    revalidate: 10
  };
}
