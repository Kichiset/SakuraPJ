import React, { useEffect, useState, Component } from 'react';
import {
  View, Text, TouchableOpacity, Button, Image, StyleSheet, SafeAreaView, ScrollView, Linking, Platform, Animated, StatusBar, Share
} from 'react-native';

import { styles } from './styles'; // 新しく作成したstyles.jsファイルをインポート

import axios from 'axios';
import moment from 'moment';

const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';
const Headline_URL = 'https://raw.githubusercontent.com/Kichiset/SakuraPJ/main/headlineMessage.json';
const main_url = 'https://www.amazon.co.jp/dp/B0CH51LQMG';
const sub_url = 'https://onjunpenguin.com/';

// バナー広告用のリンク
const bannerUrls = [
  sub_url,
  'https://sakurajimatsubaki.com/',
  'http://www.sakurajima.gr.jp/svc/topics/post-340.html',
];


// バナー広告用の画像リンク
const bannerImages = [
  require('../assets/GENTOO_PENGUIN_SAKURAJIMA_WORKSHOP.png'),
  require('../assets/SAKURAJIMA_TSUBAKI.png'),
];

//一行広告のメッセージ（外部リンクをするのは品がないのでやめましょう）
let message = [
           "【注意】今週末は平日ダイヤで運行します。",
            "ランチは桜島港3F「MinatoCafe」でどうぞ。",
            "▼フェリーの待ち時間などでお読みください▼",
            "道の駅「桜島」の食堂は月曜日お休み",
            "3/16(土)火山好きｻﾐｯﾄ@HUB雲仙&ｵﾝﾗｲﾝ参加者募集",];

const openLink = (url) => {
  Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
};

const peakSeason_prePost = ["2023-08-11", "2023-08-15"];
const peakSeason = ["2023-08-12", "2023-08-13", "2023-08-14"];
const tempSchedule=["2023-11-03","2023-11-04","2023-11-05","2023-11-11","2023-11-12","2023-12-03","2023-12-09","2023-12-10","2023-12-16","2023-12-17"];

const isWeekEnd = moment().format('d') % 6 == 0 ? true : false;

// 桜島港と鹿児島港の平日と土日祝日の出発時刻データ
import ferryTimetable from '../timeTable.json';

// 出発時刻の探索関数 (先発と次発を探す)
const getNextDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const nextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  const nextDeptIndex = schedule.findIndex(time => moment(time, 'HH:mm') > currentMoment);
  
  //const result [id, index] = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  
  
  return schedule; // 最終便が終わった場合は翌日の最初の便を表示
};

// 時刻表を現在時刻を基準に並び替える関数
const sortSchedule = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const todaySchedule = schedule.filter(time => moment(time, 'HH:mm') >= currentMoment);
  const nextDaySchedule = schedule.filter(time => moment(time, 'HH:mm') < currentMoment);

  return [...todaySchedule, ...nextDaySchedule];
};

const App = (props) => { // propsを引数として受け取る  // 状態変数の定義
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureKagoshima, setNextDepartureKagoshima] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [holidaysData, setHolidaysData] = useState({});
  const [headline, setHeadline] = useState({});

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
  
  
  
    // ヘッドラインニュースのAPIリクエストを設定する
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Headline_URL);
        setHeadline(response.data);
      } catch (error) {
        console.error('Error fetching headline data:', error);
      }
    };

    // 起動時に一度だけAPIリクエストを行う
    fetchData();

    // 6時間ごとにAPIリクエストを行うタイマーを設定
    const fetchHeadlineTimer = setInterval(() => {
      fetchData();
    }, 10 * 1000); // 6時間

    // タイマーをクリーンアップする
    return () => {
      clearInterval(fetchHeadlineTimer);
    };
  }, []);
  
  
  
  
  
  
  
  
  
  
  

  // 時刻表の更新と表示を行う
  useEffect(() => {
    const isHoliday = holidaysData.hasOwnProperty(moment().format('YYYY-MM-DD'));
    const isPrePost = peakSeason_prePost.includes(moment().format('YYYY-MM-DD'));
    const isPeak = peakSeason.includes(moment().format('YYYY-MM-DD'));
    const isTemp = tempSchedule.includes(moment().format('YYYY-MM-DD'));
    
     // 使用するダイヤの種類を選択する
    let scheduleType = '平日';
    if (isTemp) {
      scheduleType = '平日';
    } else if (isHoliday||isWeekEnd) {
      scheduleType = '土日祝日';
    } else if (isPeak) {
      scheduleType = '繁忙期_1';
    } else if (isPrePost) {
      scheduleType = '繁忙期_2';
    }

    // ダイヤのスケジュールを取得
    const sakurajimaSchedule = ferryTimetable["桜島港"][scheduleType];
    const kagoshimaSchedule = ferryTimetable["鹿児島港"][scheduleType];

    // 時刻表を現在時刻を基準に並び替える
    const sortedSakurajimaSchedule = sortSchedule(sakurajimaSchedule, currentTime);
    const sortedKagoshimaSchedule = sortSchedule(kagoshimaSchedule, currentTime);
    
    // 先発と次発の出発時刻を取得
    const nextDepartureSakurajima = getNextDeparture(sortedSakurajimaSchedule, currentTime);
    const nextDepartureKagoshima = getNextDeparture(sortedKagoshimaSchedule, currentTime);

    
    // 状態変数を更新する
    setNextDepartureSakurajima(nextDepartureSakurajima);
    setNextDepartureKagoshima(nextDepartureKagoshima);
  }, [currentTime, holidaysData]);

 // 画面遷移する関数
  const goToScreenNotification = () => {
    // `navigation.navigate`で画面遷移し、`userData`をパラメータとして渡す
    navigation.navigate('Notification', {});
  };
  
  let setPort;
  const GetPort = () => {
     Port = setPort;
  return(Port)
  } 
  
  const KagoPort = "鹿児島港発"
  const SakuPort = "桜島港発"

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  // バナー広告の切り替え関数
  const switchBanner = () => {
    setCurrentBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
  };

  // バナー広告の切り替えタイマー
  useEffect(() => {
    const bannerTimer = setInterval(switchBanner, 15 * 1000); // 15秒ごとに切り替え
    return () => clearInterval(bannerTimer); // クリーンアップ
  }, []);
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
    // テキスト広告の切り替え関数
  const switchText = () => {
    setCurrentTextIndex(prevIndex => (prevIndex + 1) % message.length);
  };

  // テキスト広告の切り替えタイマー
  useEffect(() => {
    const textTimer = setInterval(switchText, 5000); // 5秒ごとに切り替え
    return () => clearInterval(textTimer); // クリーンアップ
  }, []);




//const isAndroid = Platform.OS === 'android'


  const iosURL = 'https://apps.apple.com/us/app/easy-board-sakurajima-ferry/id6468773953';
  const AndroidURL = 'https://play.google.com/store/apps/details?id=com.kichiset.EasyBoardSakurajimaFerry&pcampaignid=web_share'




  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'タイトル',
        message:
          'EasyBoardSakurajimaFerrya, The Applicatiom of Timeschedule for Sakurajima Ferry.\n Android: https://play.google.com/store/apps/details?id=com.kichiset.EasyBoardSakurajimaFerry&pcampaignid=web_share \n IOS: https://apps.apple.com/us/app/easy-board-sakurajima-ferry/id6468773953',
        
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

//console.log(HeadLine["News"])

  return (
  <SafeAreaView style={styles.safeArea}>
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentTime}>現在: {currentTime}</Text>
      
      {/* メイン画面から鹿児島港発画面に遷移するフレーム */}
      <TouchableOpacity
        
        onPress={() => {
          Dept = nextDepartureKagoshima
          setPort = KagoPort
          Port = GetPort(setPort)
          props.navigation.navigate('鹿児島港発',Dept,Port); // 遷移先の画面名を指定
        }}
      >
      <View style={styles.kagoFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>鹿児島港発</Text>
        <Text style={styles.nextDeparture}>先発 {nextDepartureKagoshima[0]}</Text>
        <Text style={styles.nextDeparture}>次発 {nextDepartureKagoshima[1]}</Text>
      </View>
      </TouchableOpacity>

      {/* メイン画面から桜島港発画面に遷移するフレーム */}
      <TouchableOpacity
      
        onPress={() => {
          Dept = nextDepartureSakurajima
          setPort = SakuPort
          Port = GetPort(setPort)
          console.log(Port, nextDepartureSakurajima[0])
          props.navigation.navigate('桜島港発',nextDepartureSakurajima,Port); // 遷移先の画面名を指定
        }
        }
      >
      <View style={styles.sakuraFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>桜島港発</Text>
        <Text style={styles.nextDeparture}>先発 {nextDepartureSakurajima[0]}</Text>
        <Text style={styles.nextDeparture}>次発 {nextDepartureSakurajima[1]}</Text>
      </View>
      </TouchableOpacity>
      
      <View style={styles.headLineNews}>
        <Text>{message[currentTextIndex]}</Text>
      
      </View>
      
        <TouchableOpacity onPress={() => openLink(main_url)} style={styles.linkButton}>
          <Image
            source={require('..//assets/桜島の不思議.png')} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
		<Text >▲先発次発アプリのオススメです。▲</Text>
		<Text >▲買って・読んで桜島を応援してください▲</Text>

            
        <TouchableOpacity onPress={() => openLink(bannerUrls[currentBannerIndex])} style={styles.linkButtonTop}>
          <Image
            source={bannerImages[currentBannerIndex]} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
        
      
      <TouchableOpacity
        onPress={onShare}
      >
      <View style={styles.shareLink}>
        <Text>便利だと思ったら{"\n"}シェアをお願いします</Text>
      </View>
      </TouchableOpacity> 

    </ScrollView>
  </SafeAreaView>
  );
};

export default App;

