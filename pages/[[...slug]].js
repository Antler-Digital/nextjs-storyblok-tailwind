import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState
} from '@storyblok/react';

export default function Home({ story, preview }) {
  story = useStoryblokState(story, {}, preview);
  return (
    <div className="">
      <header>
        <h1>{story ? story.name : 'My Site'}</h1>
      </header>
      {/* You might need to change this for whatever the structure of a page is */}
      {story.content.body.map(component => (
        <StoryblokComponent key={component.id} blok={component} />
      ))}
    </div>
  );
}
export async function getStaticProps({ preview, params }) {
  // For accessing latest content
  // let newsArticles = false;

  let slug = params?.slug || 'home';

  let parameters = {
    version: 'published'
  };

  if (preview) {
    parameters.version = 'draft';
    parameters.cv = Date.now();
  }

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, parameters);
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      preview: preview || false
    },
    // once per hour
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  const storyblokApi = await getStoryblokApi();

  // fetch all pages from Storyblok
  let { data } = await storyblokApi.get('cdn/links/');
  // create the links array
  const links = Object.keys(data.links)
    .map(link => data.links[link])
    .filter(link => !link.is_folder);

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
