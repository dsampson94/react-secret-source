import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import * as gtag from '../tools/components/ads/gtag';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => gtag.pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return <>
    <Head>
      <title>{ 'React Secret Source' }</title>
    </Head>
    <Component { ...pageProps } />
  </>;
}

export default MyApp;
