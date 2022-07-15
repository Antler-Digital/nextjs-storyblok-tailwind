import '../styles/globals.css';
import 'aos/dist/aos.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import AOS from 'aos';
import { useEffect } from 'react';

import Teaser from '../components/Teaser';

// adding brands to FontAwesome selector
library.add(fab);

const components = {
  Teaser
};

storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_API_KEY,
  use: [apiPlugin],
  components: components
});

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
