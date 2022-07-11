import {
  // getStoryblokApi,
  StoryblokComponent,
  useStoryblokState
} from '@storyblok/react';
import Head from 'next/head';

export default function Home({ story, preview }) {
  story = useStoryblokState(story, {}, preview);

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>{story ? story.name : 'My Site'}</h1>
      </header>

      <StoryblokComponent blok={story.content} />
    </div>
  );
}

export async function getStaticProps(context) {
  // let slug = 'home';

  // let sbParams = {
  //   version: 'published'
  // };

  // if (context.preview) {
  //   sbParams.version = 'draft';
  // }

  // const storyblokApi = getStoryblokApi();

  // let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      // story: data ? data.story : false,
      // key: data ? data.story.id : false,
      preview: context.preview || false
    },

    revalidate: 3600
  };
}

// export async function getStaticPaths() {
//   const storyblokApi = getStoryblokApi();

//   // fetch all pages from Storyblok
//   let { data } = await storyblokApi.get('cdn/links/', {});

//   // create the links array
//   const links = Object.keys(data.links)
//     .map(link => data.links[link])
//     .filter(link => !link.is_folder);

//   const paths = links
//     .map(link => {
//       // check to see if the path is a Layout component
//       const path = ['Site Layout'].includes(link.name) ? '' : link.real_path;
//       return {
//         // if path is index route then return no forward /
//         // if path is not index route then split on subpath to provide in correct format for NextJS catch all routes and remove empty strings
//         params: { slug: path === '/' ? [''] : path.split('/').filter(n => n) }
//       };
//     })
//     // filter out Layout Components
//     .filter(link => link.params.slug.length > 0);

//   return {
//     paths,
//     fallback: false
//   };
// }
