import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
  Platform,
  Animated,
  Share,
  AppState
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker"; //カレンダー

import { styles } from './styles'; // 新しく作成したstyles.jsファイルをインポート

import axios from 'axios';
import moment from 'moment';

import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { getLocales } from 'expo-localization';

const isAndroid = Platform.OS == 'android';
const adUnitId = isAndroid
 ? 'ca-app-pub-3179323992080572/5698067704'
 : 'ca-app-pub-3179323992080572/9648166408';
const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  keywords: ['健康', '食品', 'ファッション', 'ビール'],
});

const locales = getLocales();
const languageTag = locales[0].languageTag;
console.log('locales:', locales[0].languageTag, locales);

const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';
const Headline_URL = 'https://raw.githubusercontent.com/Kichiset/SakuraPJ/main/headlineMessage.json';
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

// Admobバナー
import { AdmobFullBanner } from "../Admob";

const peakSeason_prePost = ["2023-12-29", "2023-12-30", "2023-12-31", "2024-01-03"];
const peakSeason1 = ["2024-04-28"];
const peakSeason2 = ["2024-05-06"];
const tempSchedule=["2024-04-27", "2024-04-29"];

const isWeekEnd = moment().format('d') % 6 == 0 ? true : false;

// 桜島港と鹿児島港の出発時刻データ
import ferryTimetable from '../timeTable.json';

// 出発時刻の探索関数 (先発と次発を探す)
  const getNextDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  
  return schedule; // 最終便が終わった場合は翌日の最初の便を表示
};

// 時刻表を現在時刻を基準に並び替える関数
const sortSchedule = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm').add(1, 'm');  //////クソ怪しい処理をしているのでしばらく様子見
  const todaySchedule = schedule.filter(time => moment(time, 'HH:mm') >= currentMoment);
  const nextDaySchedule = schedule.filter(time => moment(time, 'HH:mm') < currentMoment);

  return [...todaySchedule, ...nextDaySchedule];
};

const openLink = (url) => {
  Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
};

const App = (props) => { // propsを引数として受け取る  // 状態変数の定義
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureKagoshima, setNextDepartureKagoshima] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [holidaysData, setHolidaysData] = useState({});
  const [headline, setHeadline] = useState({});

  // 現在時刻を0.1秒ごとに更新するタイマーを設定する
  useEffect(() => {
    const getCurrentTime = () => {
      const now = moment().format('HH:mm:ss');
      setCurrentTime(now);
    };

    getCurrentTime();

    const timer = setInterval(() => {
      getCurrentTime();
    }, 100);

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


  //　カレンダー表示用のAPI叩く
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();

    console.log(moment(date).add(9, 'h').format('YYYY-MM-DD'))
   

    //同じロジックを下で使っているので気に入らない。要関数化
    const isWeekEnd = moment(date).format('d') % 6 == 0 ? true : false;
    const isHoliday = holidaysData.hasOwnProperty(moment(date).format('YYYY-MM-DD'));
    const isPrePost = peakSeason_prePost.includes(moment(date).format('YYYY-MM-DD'));
    const isPeak = peakSeason.includes(moment(date).format('YYYY-MM-DD'));
    const isTemp = tempSchedule.includes(moment(date).format('YYYY-MM-DD'));

    console.log(isHoliday, !isWeekEnd, isTemp, isWeekEnd)

    if(isTemp||(!isWeekEnd)){
      openLink("https://www.city.kagoshima.lg.jp/sakurajima-ferry/koro-jikoku/documents/01kaiteidaiyajikokuhyouheijitu.pdf")
    } else {
      openLink("https://www.city.kagoshima.lg.jp/sakurajima-ferry/koro-jikoku/documents/02kaiteidaiyajikokuhyoudonichishuku.pdf")
    }
  };

  
  
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
    // 起動時に一度、APIリクエストを行う
    fetchData();

    // 1分ごとにAPIリクエストを行うタイマーを設定
    const fetchHeadlineTimer = setInterval(() => {
      fetchData();
    }, 15 * 1000);

    // タイマーをクリーンアップする
    return () => {
      clearInterval(fetchHeadlineTimer);
    };
  }, []);

  // 時刻表の更新と表示を行う
  useEffect(() => {
    const isHoliday = holidaysData.hasOwnProperty(moment().format('YYYY-MM-DD'));
    const isPeak1 = peakSeason1.includes(moment().format('YYYY-MM-DD'));
    const isPeak2 = peakSeason2.includes(moment().format('YYYY-MM-DD'));
    const isTemp = tempSchedule.includes(moment().format('YYYY-MM-DD'));
    
     // 使用するダイヤの種類を選択する
    let scheduleType = '平日';
    if (isTemp) {
      scheduleType = '土日祝日';
    } else if (isPeak1) {
      scheduleType = '繁忙期_1';
    } else if (isPeak2) {
      scheduleType = '繁忙期_2';
    }else if (isHoliday||isWeekEnd) {
      scheduleType = '土日祝日';
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
/*
  analytics.logEvent("screen_view", {
    firebase_screen_class: "EditProfile",
    firebase_screen: "EditProfile",
  });
  */
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


  // テキスト広告の切り替え関数
   const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const messageLength = Object.keys(headline).length;
   const maxMessageLength = 100;
 
  const switchText = () => {
    setCurrentTextIndex(prevIndex => (prevIndex + 1) % maxMessageLength); //message.length);
  };
  // テキスト広告の切り替えタイマー
  useEffect(() => {
    const textTimer = setInterval(switchText, 5 * 1000); // 5秒ごとに切り替え
    return () => clearInterval(textTimer); // クリーンアップ
  }, []);


if(!isAndroid){
  // Preload an app open ad
  appOpenAd.load();

  const [closed, setClosed] = useState(false);
  useEffect(() => {
    const unsubscribe = appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
      setClosed(true);
  });
  // Start loading the interstitial straight away
  appOpenAd.load();
  // Unsubscribe from events on unmount
  return unsubscribe;
}, []);

const [flag, setFlag] = useState(false);
const [isBackground, setAppState] = useState(false);
  useEffect(() => {
    const onChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState != "active");
      setFlag(nextAppState != "active");
    };
      AppState.addEventListener("change", onChange);

    return () => {
      AppState.removeEventListener("change", onChange), setFlag;
    };
  }, []);
  console.log(appOpenAd.loaded, isBackground, closed, flag)
  // ここに復帰判定
  if(appOpenAd.loaded && flag){
    appOpenAd.show();
    appOpenAd.load();
  }
}
  async function onShare() {
    try {
      const result = await Share.share({
        title: 'タイトル',
        message: '先発次発という桜島フェリーに乗るときに便利なアプリ。\n Android: https://play.google.com/store/apps/details?id=com.kichiset.SakuraFerry01&pcampaignid=web_share \n IOS: https://apps.apple.com/jp/app/%E6%A1%9C%E5%B3%B6%E3%83%95%E3%82%A7%E3%83%AA%E3%83%BC-%E5%85%88%E7%99%BA%E6%AC%A1%E7%99%BA-%E6%99%82%E5%88%BB%E8%A1%A8/id6465898880',
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
  }

return (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar style="default"/>
    <AdmobFullBanner />
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

      {/* 屈辱的だけど、カレンダーをつけて当日の全スケジュールを表示（公式サイトのpdfにぶっ飛ばしてやる【仮】）*/}
        <TouchableOpacity onPress={
          showDatePicker
        }
          style={styles.showPdfFrame}>
          <Text>カレンダーから</Text><Text>公式時刻表を表示</Text>
        </TouchableOpacity>
          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            display='calendar'
            value={new Date()} 
            maximumDate={new Date(2025, 2, 31)}
            minimumDate={new Date(2023, 0, 1)}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale={languageTag}
          />
      
      <View style={styles.headLineNews}>
      <Text>{headline[currentTextIndex % messageLength +1]}</Text>
      {/*}<Text>{headline[currentTextIndex]}</Text>*/}
      
      </View>

        <TouchableOpacity onPress={() => openLink(bannerUrls[currentBannerIndex])} style={styles.linkButton}>
          <Image
            source={bannerImages[currentBannerIndex]} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
      
      <TouchableOpacity
        onPress={onShare}
      >
      <View style={styles.shareLink}>
        <Text>便利だと思ったら</Text><Text>シェアをお願いします</Text>
      </View>
      </TouchableOpacity> 
    </ScrollView>
  </SafeAreaView>
  );
};

export default App;