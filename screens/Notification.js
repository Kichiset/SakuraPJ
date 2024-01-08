import React, { useEffect, useState, Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  Animated,
  StatusBar,
  Button,
  Vibration,
  BackHandler,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import {Picker} from '@react-native-picker/picker'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { styles } from './styles'; // 新しく作成したstyles.jsファイルをインポート

import axios from 'axios';
import moment from 'moment';

import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const isAndroid = Platform.OS == 'android';

//console.log(isAndroid)

const adUnitId = isAndroid
? 'ca-app-pub-3179323992080572/2091174818'
: 'ca-app-pub-3179323992080572/6064144618';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['健康', '食品', 'ファッション', 'ビール'],
});


const App = (props) => { // propsを引数として受け取る  // 状態変数の定義
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');

  // 現在時刻を1秒ごとに更新するタイマーを設定する
  useEffect(() => {
    const getCurrentTime = () => {
      const now = moment().format('HH:mm:ss');
      setCurrentTime(now);
    };

    getCurrentTime();

    const timer = setInterval(() => {
      getCurrentTime();
    }, 1000);

    // タイマーをクリーンアップする
    return () => {
      clearInterval(timer);
    };
  }, []);

{/*タイマーの表示をどうするか？フォアグラウンドでの挙動*/}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

{/*現在時刻の計算（前画面から受けた文字列をUNIX時間に変換したり、日本標準時間に変換したり）*/}
let [counter, setCounter] = useState(0)
let isoDapt = moment().format('YYYY-MM-DD')+ "T" + NextDept + ":00.000Z"; //出航時間を日本時間に変換


let setTempDept = new Date(isoDapt).toISOString();

if (moment(setTempDept) < moment())
     {setTempDept = moment(setTempDept).add(1, 'd')}
let dispTempDept = moment(setTempDept).add(-9, 'h');
setTempDept = moment(setTempDept).add(-9, 'h');
//console.log(setTempDept)

{/*Notificaionに渡す残り時間の計算*/}
const getDeptTime = () => {
if(counter == 0){
  timer = -1;
  } else {
  timer = (moment(setTempDept).add(-counter, 'm')-moment())/1000;
  }
console.log(setTempDept, timer + "秒後に通知",counter)
console.log(moment(setTempDept).add(-counter, 'm').format('HH:mm') +"にお知らせします") //
return(timer)
}

//文字列の表示系
let [message, setMessage] = useState("選択してください。")
const getMessage = () => {
  if(counter == 0){
    message = "通知しません"
  } else if (setDeptTime < 0){
    message = "予定時刻を過ぎています!!"
  } else {
    message = moment(dispTempDept).add(-counter, 'm').format('HH:mm') +"にお知らせします"
  }
  //console.log(message,counter,NextDept,moment(dispTempDept).add(-counter, 'm').format('HH:mm'))
  return (message)
}







{/*Notificaion本体。メッセージ出したり、タイミング調整したり*/}
const scheduleNotificationAsync = async (setTempDept) => {
  await Notifications.scheduleNotificationAsync(
  {
    content: {
      body: Port + 'の出発準備をしてください',
      title: counter + '分後に出港します！',
      sound: true,
      vibrate: true,
    },
    trigger: {
      seconds: setDeptTime,
    }
  })
}

// Firebase広告の表示系統
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
const [closed, setClosed] = useState(false);
useEffect(() => {
  const unsubscribe = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
    setClosed(true);
  });
  // Start loading the interstitial straight away
  interstitial.load();    
  // Unsubscribe from events on unmount
  return unsubscribe;
}, []);
const [err, setERR] = useState(false);
useEffect(() => {
  const unsubscribe = interstitial.addAdEventListener(AdEventType.ERROR, () => {
    setERR(true);
  });
  // Start loading the interstitial straight away
  interstitial.load();    
  // Unsubscribe from events on unmount
  return unsubscribe;
}, []);



console.log(loaded,closed,err)

// 選択した時刻とインデックスを保存
  const [choosenLabel, setChoosenLabel] = useState([0]);
  const [choosenIndex, setChoosenIndex] = useState([0]);

<StatusBar style="auto" />

{/*ここからリターン文（ほとんど表示系）*/}
  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.current4DepartureTime}>現在: {currentTime}</Text>


        
      {/* ここから、タイマー制御 */}
      <Text style={styles.buttonText}>▼</Text>

      <Text style={styles.buttonText}>出航の何分前に通知しますか？</Text>
      
      <View>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          style={[styles.wideButton, styles.picker]}
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel(itemValue);
            setChoosenIndex(itemIndex);
          }}>
          <Picker.Item label="通知しません" value="0" />
          <Picker.Item label="10分前" value="10" />
          <Picker.Item label="15分前" value="15" />
          <Picker.Item label="20分前" value="20" />
          <Picker.Item label="30分前" value="30" />
          <Picker.Item label="45分前" value="45" />
          <Picker.Item label="60分前" value="60" />
        </Picker>
        </View>


      <Text style={styles.buttonText}>▼</Text>

        {/* セットボタン */}
        <TouchableOpacity
          style={[styles.button, styles.SetButton]}
          onPress={() =>
          {
            setCounter(counter = choosenLabel)
            console.log(counter)
            setDeptTime = getDeptTime();
            setMessage(getMessage(message,counter));
            // No advert ready to show yet
            if(loaded && !closed){
              interstitial.show();
            }
            Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotificationAsync(setDeptTime)
            // 
          }
        }>
          <Text style={[styles.buttonText, {color: '#EBEBEB'}]}>セット</Text>
        </TouchableOpacity>



      <Text>{"広告が表示されます"}</Text>
      <Text style={styles.buttonText}>{'\n'}▼</Text>




      <View>
        <Text style={styles.portTitle}>{message}</Text>
      </View>



      <Text style={styles.buttonText}>▼</Text>
      <Text style={[styles.portTitle, styles.bottomColumn]}>{NextDept}  {Port}</Text>








        

      
      
      <View>
      {/* 全部リセットするボタン */}
      <TouchableOpacity
        style={[styles.button, styles.ResetButton]}
        onPress={() => {
          setCounter(counter = 0)
          Notifications.cancelAllScheduledNotificationsAsync(); // リセットAPI
          //画面リロードを入れる
          //props.navigation.reset(); // リロード
          setCounter(counter = 0);
          setMessage(message = "通知しません");
          }
        
        }>
          <Text style={[styles.buttonText, {color: '#B92021'}]}>リセット</Text>
      </TouchableOpacity>
      
      

      </View>

      {/* 鹿児島港発画面に遷移するボタン */}
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => {
          props.navigation.goBack(); // 遷移先の画面名を指定
          }
        
        }>
          <Text style={styles.buttonText}>戻る</Text>
      </TouchableOpacity>
      
      {/* メイン画面に遷移するボタン */}
      <TouchableOpacity
        style={[styles.button, styles.mainButton]}
        onPress={() => {
          props.navigation.navigate('メイン画面'); // 遷移先の画面名を指定
        }}
      >
        <Text style={styles.buttonText}>メインページに戻る</Text>
      </TouchableOpacity>

    </ScrollView>
  </SafeAreaView>
  );
};
export default App;