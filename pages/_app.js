import '../styles/globals.css';
import 'aos/dist/aos.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import AOS from 'aos';
import { useEffect } from 'react';

// adding brands to FontAwesome selector
library.add(fab);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
