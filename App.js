import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Linking} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Swiper from 'react-native-swiper';

const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';
const url_01 = 'https://www.sakurajima-kinkowan-geo.jp/';

const ferryTimetable = {
  "桜島港": {
    "平日": [
            "0:00",
            "1:00",
            "2:00",
            "3:00",
            "4:00",
            "5:00",
            "6:05",
            "6:25",
            "6:45",
            "7:05",
            "7:25",
            "7:45",
            "8:05",
            "8:25",
            "8:45",
            "9:05",
            "9:25",
            "9:45",
            "10:05",
            "10:25",
            "10:45",
            "11:05",
            "11:25",
            "11:45",
            "12:05",
            "12:25",
            "12:45",
            "13:05",
            "13:25",
            "13:45",
            "14:05",
            "14:25",
            "14:45",
            "15:05",
            "15:25",
            "15:45",
            "16:05",
            "16:25",
            "16:45",
            "17:05",
            "17:25",
            "17:45",
            "18:05",
            "18:25",
            "18:45",
            "19:00",
            "19:30",
            "20:00",
            "21:00",
            "22:00",
            "23:00"
          ],
    "土日祝日": [
            "0:00",
            "1:00",
            "2:00",
            "3:00",
            "4:00",
            "5:00",
            "6:05",
            "6:25",
            "6:45",
            "7:05",
            "7:25",
            "7:45",
            "8:05",
            "8:25",
            "8:45",
            "9:05",
            "9:25",
            "9:45",
            "10:05",
            "10:25",
            "10:45",
            "11:05",
            "11:25",
            "11:45",
            "12:05",
            "12:25",
            "12:45",
            "13:05",
            "13:25",
            "13:45",
            "14:05",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
            "17:00",
            "17:15",
            "17:30",
            "17:45",
            "18:00",
            "18:15",
            "18:30",
            "18:45",
            "19:05",
            "19:30",
            "20:00",
            "21:00",
            "22:00",
            "23:00"
          ]
  },
  "鹿児島港": {
    "平日": [
            "0:30",
            "1:30",
            "2:30",
            "3:30",
            "4:30",
            "5:30",
            "6:00",
            "6:30",
            "7:00",
            "7:20",
            "7:40",
            "8:00",
            "8:20",
            "8:40",
            "9:00",
            "9:20",
            "9:40",
            "10:00",
            "10:20",
            "10:40",
            "11:00",
            "11:20",
            "11:40",
            "12:00",
            "12:20",
            "12:40",
            "13:00",
            "13:20",
            "13:40",
            "14:00",
            "14:20",
            "14:40",
            "15:00",
            "15:20",
            "15:40",
            "16:00",
            "16:20",
            "16:40",
            "17:00",
            "17:20",
            "17:40",
            "18:00",
            "18:20",
            "18:40",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:30",
            "22:30",
            "23:30"
          ],
    "土日祝日": [
            "0:30",
            "1:30",
            "2:30",
            "3:30",
            "4:30",
            "5:30",
            "6:00",
            "6:30",
            "7:00",
            "7:20",
            "7:40",
            "8:00",
            "8:20",
            "8:40",
            "9:00",
            "9:20",
            "9:40",
            "10:00",
            "10:20",
            "10:40",
            "11:00",
            "11:20",
            "11:40",
            "12:00",
            "12:20",
            "12:40",
            "13:00",
            "13:20",
            "13:40",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
            "17:00",
            "17:15",
            "17:30",
            "17:45",
            "18:00",
            "18:15",
            "18:30",
            "18:45",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:30",
            "22:30",
            "23:30" 
          ]
  }
};

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

const App = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [nextDepartureKagoshima, setNextDepartureKagoshima] = useState('');
  const [nextNextDepartureSakurajima, setNextNextDepartureSakurajima] = useState('');
  const [nextNextDepartureKagoshima, setNextNextDepartureKagoshima] = useState('');

  useEffect(() => {
    const getCurrentTime = () => {
      const now = moment().format('HH:mm:ss');
      setCurrentTime(now);
    };

    getCurrentTime();

    const timer = setInterval(() => {
      getCurrentTime();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const holidays = Object.keys(response.data);
        const isHoliday = holidays.includes(moment().format('YYYY-MM-DD'));
        const sakurajimaSchedule = isHoliday ? ferryTimetable["桜島港"]["土日祝日"] : ferryTimetable["桜島港"]["平日"];
        const kagoshimaSchedule = isHoliday ? ferryTimetable["鹿児島港"]["土日祝日"] : ferryTimetable["鹿児島港"]["平日"];
        const nextDepartureSakurajima = getNextDeparture(sakurajimaSchedule, currentTime);
        const nextDepartureKagoshima = getNextDeparture(kagoshimaSchedule, currentTime);
        const nextNextDepartureSakurajima = getNextNextDeparture(sakurajimaSchedule, currentTime);
        const nextNextDepartureKagoshima = getNextNextDeparture(kagoshimaSchedule, currentTime);
        setNextDepartureSakurajima(nextDepartureSakurajima);
        setNextDepartureKagoshima(nextDepartureKagoshima);
        setNextNextDepartureSakurajima(nextNextDepartureSakurajima);
        setNextNextDepartureKagoshima(nextNextDepartureKagoshima);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentTime]);
  
  const openLink = (url_01) => {
    Linking.openURL(url_01).catch((err) => console.error('An error occurred', err));
  };

  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentTime}>現在時刻: {currentTime}</Text>
      <Text style={styles.currentTime}>{'\n'}鹿児島港</Text>
      <Text style={styles.nextDeparture}>先発: {nextDepartureKagoshima}</Text>
        <View style={[styles.column, styles.leftColumn]}>
          <Text style={styles.nextDeparture}>次発: {nextNextDepartureKagoshima}</Text>
        </View>

      <Text style={styles.currentTime}>{'\n'}桜島港</Text>
      <Text style={styles.nextDeparture}>先発: {nextDepartureSakurajima}</Text>
      <Text style={styles.nextDeparture}>次発: {nextNextDepartureSakurajima}</Text>
      
        <TouchableOpacity onPress={() => openLink(url_01)} style={styles.linkButton}>
          <Image
            source={require('./assets/header_logo.png')} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => openLink(url_01)} style={styles.linkButton}>
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
    //paddingTop: Platform.OS === 'android' ? 50 : 0, // Androidの場合、セーフエリアに対応するために25ポイント追加
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
    fontSize: 20,
    marginBottom: 10,
  },
  nextDeparture: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  leftColumn: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  linkButtonText: {
    backgroundColor: '#CFCFCF',
    padding: 20,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },  
  linkButton: {
    marginTop: 20,
    padding: 10,
  },
  linkButtonImage: {
    width: 300,
    height: 100,
  },
});


export default App;
