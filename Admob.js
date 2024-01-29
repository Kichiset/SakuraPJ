import React, { useEffect, useState } from "react";
import {
  Platform,
  Button,
} from "react-native";

import mobileAds ,{
  BannerAd,
  BannerAdSize,
  AppOpenAd,
  InterstitialAd,
  TestIds,
  AdEventType,
}from "react-native-google-mobile-ads";



const isAndroid = Platform.OS == 'android';

// 初期化
mobileAds()
  .initialize()
  .then((adapterStatuses) => {});

// ユニットID
const adBannerUnitId = isAndroid
  ? "ca-app-pub-3179323992080572/4026178794"
  : "ca-app-pub-3179323992080572/5642253032";

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


{/*
const adInterUnitId = isAndroid
 ? 'ca-app-pub-3179323992080572/2091174818'
 : 'ca-app-pub-3179323992080572/9648166408';

const interstitial = InterstitialAd.createForAdRequest(adInterUnitId, {
  keywords: ['健康', '食品', 'ファッション', 'ビール'],
});

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