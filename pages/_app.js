import '../src/styles/globals.css';
import 'aos/dist/aos.css';

import AOS from 'aos';
import { useEffect } from 'react';

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
