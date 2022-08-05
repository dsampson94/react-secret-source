import React, { useEffect } from 'react';

export default function AdWindow() {
  const loadAds = () => {
    try {
      if (typeof window !== 'undefined')
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log('adsense error', error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return <div style={ {
    width: '300px',
    height: '300px',
    backgroundColor: 'white'
  } }>
    <ins className={ 'adsbygoogle' }
         style={ {
           display: 'block',
           width: '100%',
           height: '100%',
         } }
         data-ad-client={ 'ca-pub-7780458585019281' }
         data-ad-slot={ '9269449692' }
         data-ad-format={ 'auto' }
         data-full-width-responsive={ 'true' } />
  </div>;
}
