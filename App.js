import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Button,Vibration, Platform,} from 'react-native';
import * as Notifications from 'expo-notifications';

import MainScreen from './screens/MainScreen';
import KagoshimaDepartureScreen from './screens/KagoshimaDepartureScreen';
import SakurajimaDepartureScreen from './screens/SakurajimaDepartureScreen';
import Notification from './screens/Notification';

import { AppOpenAd, AdsConsent , AdsConsentDebugGeography, AdsConsentStatus} from 'react-native-google-mobile-ads';
//import { AdMobBanner } from 'expo-ads-admob';


const isAndroid = Platform.OS == 'android';
console.log(isAndroid, Platform.OS)

const adUnitId = isAndroid
 ? 'ca-app-pub-3179323992080572/5698067704'
 : 'ca-app-pub-3179323992080572/9648166408';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  keywords: ['健康', '食品', 'ファッション', 'ビール'],
});

// Preload an app open ad
appOpenAd.load();

const Stack = createNativeStackNavigator();


export default function App() {
  React.useEffect(() => {
    requestPermissionsAsync();
  })

    // トラッキング可否を保持する。これをContextなどに持たせて他の画面でも利用する
  // ※ trueでトラッキングしない。falseでトラッキングする
  const [nonPersonalizedOnly, setNonPersonalizedOnly] = React.useState(true);

  React.useEffect(() => {
    // ATTとGDPRの同意状態を取得
    AdsConsent.requestInfoUpdate({
      debugGeography: AdsConsentDebugGeography.EEA, // EU圏としてテストする設定
      testDeviceIdentifiers: ["TEST-DEVICE-HASHED-ID"],
    }).then(async (consentInfo) => {
      let status = consentInfo.status;
      if (
        consentInfo.isConsentFormAvailable &&
        status === AdsConsentStatus.REQUIRED
      ) {
        // 同意状態が必要な場合はダイアログを表示する
        const result = await AdsConsent.showForm();
        status = result.status;
      }

      if (
        consentInfo.status === AdsConsentStatus.OBTAINED ||
        status === AdsConsentStatus.OBTAINED
      ) {
        // 同意が取得できた場合はNonPersonalizedOnlyをfalseにする(トラッキング取得する)
        setNonPersonalizedOnly(false);
      }
    });
  }, []);

  // Preload an app open ad
  appOpenAd.load();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="メイン画面" component={MainScreen} />
        <Stack.Screen name="鹿児島港発" component={KagoshimaDepartureScreen} />
        <Stack.Screen name="桜島港発" component={SakurajimaDepartureScreen} />
        <Stack.Screen name="通知画面" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//通知の許可をリクエスト
const requestPermissionsAsync = async () => {
  const { granted } = await Notifications.getPermissionsAsync();
  //if (granted) { return }

  await Notifications.requestPermissionsAsync();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
