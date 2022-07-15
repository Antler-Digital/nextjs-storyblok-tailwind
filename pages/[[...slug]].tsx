import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState
} from '@storyblok/react';
import { GetStaticPropsContext } from 'next';

import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';

export default function Page({
  story,
  preview
}: {
  story: any;
  preview: boolean;
}) {
  story = useStoryblokState(story, {}, preview);

  return (
    <Layout preview={preview}>
      {story.content.Nav && <Nav {...story.content.Nav.content} />}
      {/* You might need to change this for whatever the structure of a page is */}
      {story.content.body.map((component: any) => (
        <StoryblokComponent key={component.id} blok={component} />
      ))}
    </Layout>
  );
}

type ParametersTypes = {
  version: 'published' | 'draft';
  resolve_relations?: string;
  cv?: number;
};

export async function getStaticProps({
  preview,
  params
}: GetStaticPropsContext) {
  // For accessing latest content
  // let newsArticles = false;

  let slug = params?.slug || 'home';

  let parameters: ParametersTypes = {
    version: 'published',
    resolve_relations: 'Page.Nav,Page.nav'
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
    // once per minute
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const storyblokApi = await getStoryblokApi();

  // fetch all pages from Storyblok
  let { data } = await storyblokApi.get('cdn/links/');
  // create the links array
  const links = Object.keys(data.links)
    .map(link => data.links[link])
    .filter(link => !link.is_folder)
    .filter(link => !link.slug.includes('layout'));

  const paths = links
    .map(link => {
      // check to see if the path is a Layout component
      const path = ['Site Layout'].includes(link.name) ? '' : link.real_path;
      return {
        // if path is index route then return no forward /
        // if path is not index route then split on subpath to provide in correct format for NextJS catch all routes and remove empty strings
        params: {
          slug: path === '/' ? [''] : path.split('/').filter((n: any) => n)
        }
      };
    })
    // filter out Layout Components
    .filter(
      link =>
        link.params.slug.length > 0 || !link.params.slug[0].includes('layout')
    );

  return {
    paths,
    fallback: false
  };
}
