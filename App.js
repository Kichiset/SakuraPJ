import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Button,Vibration, Platform,} from 'react-native';
import * as Notifications from 'expo-notifications';

import MainScreen from './screens/MainScreen';
import KagoshimaDepartureScreen from './screens/KagoshimaDepartureScreen';
import SakurajimaDepartureScreen from './screens/SakurajimaDepartureScreen';
import Notification from './screens/Notification';

import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
//import { AdMobBanner } from 'expo-ads-admob';


const isAndroid = Platform.OS == 'android';
console.log(isAndroid, Platform.OS)

const adUnitId = isAndroid
 ? 'ca-app-pub-3179323992080572/5698067704'
 : 'ca-app-pub-3179323992080572/9648166408';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

// Preload an app open ad
appOpenAd.load();

const Stack = createNativeStackNavigator();


export default function App() {
  React.useEffect(() => {
    requestPermissionsAsync();
  })

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
