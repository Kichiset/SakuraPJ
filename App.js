import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Linking, Animated } from 'react-native';

//import Carousel from 'react-native-snap-carousel';

import axios from 'axios';
import moment from 'moment';

const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';
const url_01 = 'https://www.sakurajima-kinkowan-geo.jp/';
const url_02 = 'https://onjunpenguin.com/';

const openLink = (url) => {
  Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
};

const peakSeason_prePost = ["2023-08-11", "2023-08-15"];
const isPrePost = peakSeason_prePost.includes(moment().format('YYYY-MM-DD'));
const peakSeason = ["2023-08-12", "2023-08-13", "2023-08-14"];
const isPeak = peakSeason.includes(moment().format('YYYY-MM-DD'));

const isWeekEnd = moment().format('d') % 6 == 0 ? true : false;

// 桜島港と鹿児島港の平日と土日祝日の出発時刻データ
import ferryTimetable from './timeTable.json';

// 出発時刻の探索関数 (先発と次発を探す)
const getNextDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  let nextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  return nextDepartureTime || schedule[0];
};

const getNextNextDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const nextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  let   nextNextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > moment(nextDepartureTime, 'HH:mm'));
  //console.log('12:34');
  return nextNextDepartureTime || schedule[1];
};

// 現在時刻を基準に,時刻表を並べる関数
const sortSchedule = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const todaySchedule = schedule.filter(time => moment(time, 'HH:mm') >= currentMoment);
  const nextDaySchedule = schedule.filter(time => moment(time, 'HH:mm') < currentMoment);

  return [...todaySchedule, ...nextDaySchedule];
};

const App = () => {
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [nextDepartureKagoshima, setNextDepartureKagoshima] = useState('');
  const [nextNextDepartureSakurajima, setNextNextDepartureSakurajima] = useState('');
  const [nextNextDepartureKagoshima, setNextNextDepartureKagoshima] = useState('');
  const [holidaysData, setHolidaysData] = useState({});

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

  // 祝日の判定を行うタイマーと初回のAPIリクエストを設定する
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setHolidaysData(response.data);
      } catch (error) {
        console.error('Error fetching holidays data:', error);
      }
    };

    // 起動時に一度だけAPIリクエストを行う
    fetchData();

    // 6時間ごとにAPIリクエストを行うタイマーを設定
    const fetchHolidaysTimer = setInterval(() => {
      fetchData();
    }, 6 * 60 * 60 * 1000); // 6時間

    // タイマーをクリーンアップする
    return () => {
      clearInterval(fetchHolidaysTimer);
    };
  }, []);

  // 時刻表の更新と表示を行う
  useEffect(() => {
    const isHoliday = holidaysData.hasOwnProperty(moment().format('YYYY-MM-DD'));
    
     // 使用するダイヤの種類を選択する
    let scheduleType = '平日';
    if (isHoliday||isWeekEnd) {
      scheduleType = '土日祝日';
    } else if (isPeak) {
      scheduleType = '繁忙期_1';
    } else if (isPrePost) {
      scheduleType = '繁忙期_2';
    }

    // ダイヤのスケジュールを取得
    const sakurajimaSchedule = ferryTimetable["桜島港"][scheduleType];
    const kagoshimaSchedule = ferryTimetable["鹿児島港"][scheduleType];

    //
    const sortedSakurajimaSchedule = sortSchedule(sakurajimaSchedule, currentTime);
    const sortedKagoshimaSchedule = sortSchedule(kagoshimaSchedule, currentTime);
    const nextDepartureSakurajima = getNextDeparture(sortedSakurajimaSchedule, currentTime);
    const nextDepartureKagoshima = getNextDeparture(sortedKagoshimaSchedule, currentTime);
    const nextNextDepartureSakurajima = getNextNextDeparture(sortedSakurajimaSchedule, currentTime);
    const nextNextDepartureKagoshima = getNextNextDeparture(sortedKagoshimaSchedule, currentTime);
    setNextDepartureSakurajima(nextDepartureSakurajima);
    setNextDepartureKagoshima(nextDepartureKagoshima);
    setNextNextDepartureSakurajima(nextNextDepartureSakurajima);
    setNextNextDepartureKagoshima(nextNextDepartureKagoshima);
  }, [currentTime, holidaysData]);

  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentTime}>現在: {currentTime}</Text>
      
      <View style={styles.kagoFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>鹿児島港</Text>
        <Text style={styles.nextDeparture}>先発: {nextDepartureKagoshima}</Text>
        <Text style={styles.nextDeparture}>次発: {nextNextDepartureKagoshima}</Text>
      </View>
      
      <View style={styles.sakuraFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>桜島港</Text>
        <Text style={styles.nextDeparture}>先発: {nextDepartureSakurajima}</Text>
        <Text style={styles.nextDeparture}>次発: {nextNextDepartureSakurajima}</Text>
      </View>
        <TouchableOpacity onPress={() => openLink(url_02)} style={styles.linkButtonTop}>
          <Image
            source={require('./assets/GENTOO_PENGUIN_SAKURAJIMA_WORKSHOP.png')} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => openLink(url_01)} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>広告主様募集中！！</Text>
        </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 0, // Androidの場合、セーフエリアに対応するために25ポイント追加
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currentTime: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
    portTitle: {
    fontSize: 24,
    marginTop: 0,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  kagoFrame:{
    marginTop: 10,
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#5F3770',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  sakuraFrame:{
    marginTop: 10,
    backgroundColor: '#FCDCE0',
    borderWidth: 1,
    borderColor: '#C87D99',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextDeparture: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headLineNews:{
    marginTop: 50,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#1C1C1C',
    margin: 'auto',
    width: 300,
    height: 30,
    borderRadius: 255,
    alignItems: 'center',
  },
  bottomColumn: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  linkButtonText: {
    backgroundColor: '#EBEBEB',
    padding: 20,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },  
  linkButtonTop: {
    marginTop: 80,
    padding: 10,
  },
  linkButton: {
    marginTop: 10,
    padding: 10,
  },
  linkButtonImage: {
    width: 200,
    height: 60,
  },
});


export default App;
