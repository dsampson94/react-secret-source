import Document, { Html, Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from '../tools/components/ads/gtag';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="../static/favicon.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json"/>
          <meta name="description" content="Code repository/blog about Javascript, React.js, d3.js, React Native and
                 Next.js, sharing tutorials, code and insights from the mind of David Sampson (ZA)." />
          {/* Google Adsense */ }
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7780458585019281"
                  crossOrigin="anonymous"></script>
          {/* Global Site Tag (gtag.js) - Google Analytics */ }
          <script async src={ `https://www.googletagmanager.com/gtag/js?id=${ GA_TRACKING_ID }` } />
          <script dangerouslySetInnerHTML={ {
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ GA_TRACKING_ID }', {
              page_path: window.location.pathname,
            });`
          } }
          />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}
