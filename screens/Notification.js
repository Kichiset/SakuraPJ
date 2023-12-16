import React, { useEffect, useState, Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Linking, Animated, StatusBar, Button, Vibration, BackHandler,
} from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { styles } from './styles'; // 新しく作成したstyles.jsファイルをインポート

import axios from 'axios';
import moment from 'moment';

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
timer = (moment(setTempDept).add(-counter, 'm')-moment())/1000;
console.log(setTempDept, timer,counter)
return(timer)
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

{/*ここからリターン文（ほとんど表示系）*/}
  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.DepartPortTitle}>{Port}</Text>
      <Text style={styles.current4DepartureTime}>現在: {currentTime}</Text>

        <Text style={[styles.portTitle, styles.bottomColumn]}>{NextDept}に出航</Text>
        
      {/* ここから、タイマー制御 */}
      <Text style={styles.buttonText}>何分前にお知らせしますか？</Text>

      {/* ボタンを横に並べるためのコンテナ */}
      <View style={"alignItems: 'center'"}>
      <View style={styles.buttonContainer}>
        
        {/* ボタン10 */}
        <TouchableOpacity onPress={() =>
          {
            setCounter(counter = 10)
            setDeptTime = getDeptTime();
            console.log(setDeptTime)
            Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotificationAsync(setDeptTime)
          }
        }>
          <Text style={styles.button}>10</Text>
        </TouchableOpacity>
        
        
        {/* ボタン15 */}
        <TouchableOpacity onPress={() =>
          {
            setCounter(counter = 15)
            setDeptTime = getDeptTime();
            console.log(setDeptTime)
            Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotificationAsync(setDeptTime)
          }
        }>
          <Text style={styles.button}>15</Text>
        </TouchableOpacity>
        
        
        {/* ボタン30 */}
        <TouchableOpacity onPress={() =>
          {
            setCounter(counter = 30)
            setDeptTime = getDeptTime();
            console.log(setDeptTime)
            Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotificationAsync(setDeptTime)
          }
        }>
          <Text style={styles.button}>30</Text>
        </TouchableOpacity>
        
        
        {/* ボタン45 */}
        <TouchableOpacity onPress={() =>
          {
            setCounter(counter = 45)
            setDeptTime = getDeptTime();
            console.log(setDeptTime)
            Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotificationAsync(setDeptTime)
          }
        }>
          <Text style={styles.button}>45</Text>
        </TouchableOpacity>
        
        
        {/* ボタン60 */}
        <TouchableOpacity onPress={() =>
          {
            setCounter(counter = 60)
            setDeptTime = getDeptTime();
            console.log(setDeptTime)
            Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotificationAsync(setDeptTime)
          }
        }>
          <Text style={styles.button}>60</Text>
        </TouchableOpacity>
        
      </View>
      </View>

      <View>
        <Text style={styles.portTitle}>{moment(dispTempDept).add(-counter, 'm').format('HH:mm')}にお知らせします</Text>
      </View>
      
      <View>
      {/* 全部リセットするボタン */}
      <TouchableOpacity
        style={[styles.button, styles.ResetButton]}
        onPress={() => {
          setCounter(counter = 0)
          Notifications.cancelAllScheduledNotificationsAsync(); // リセットAPI
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