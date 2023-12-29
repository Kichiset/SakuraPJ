import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import mobileAds ,{
  BannerAd,
  BannerAdSize,
  AppOpenAd,
  InterstitialAd,
  TestIds,
  AdEventType,
}from "react-native-google-mobile-ads";

// 初期化
mobileAds()
  .initialize()
  .then((adapterStatuses) => {});

// ユニットID
const adBannerUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-3179323992080572/4026178794";

export function AdmobFullBanner() {
  return (
    <BannerAd
      unitId={adBannerUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}

const adInterUnitId = __DEV__
 ? TestIds.INTERSTITIAL
 : 'ca-app-pub-3179323992080572/2091174818';

const interstitial = InterstitialAd.createForAdRequest(adInterUnitId, {
  keywords: ['fashion', 'clothing'],
});

{/*
export function AdmobInterstitial() {
  const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
      });
  
      // Start loading the interstitial straight away
      interstitial.load();
  
      // Unsubscribe from events on unmount
      return unsubscribe;
    }, []);
  
    // No advert ready to show yet
    if (!loaded) {
      return null;
    }
  
    return (
      loaded,
      <Button
        title="Show Interstitial"
        onPress={() => {
          interstitial.show();
        }}
      />
    )
    
  }
*/}