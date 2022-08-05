import ContentContainer from '../tools/components/content-container/ContentContainer';
import { POSTS } from '../tools/general/system-variables.util';
import React, { useEffect } from 'react';
import AdWindow from '../tools/components/ads/AdWindow';

export default function Home() {

  const loadAds = () => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('adsense error', error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <ContentContainer view={ POSTS }
                      showClientsSideBar={ true }>
      <div>
        Hi there!!!
      </div>
      <AdWindow />

    </ContentContainer>
  );
}
