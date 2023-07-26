import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';
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
            "23:00",
            "24:00",
            "25:00",
            "26:00"
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
            "23:00",
            "24:00",
            "25:00",
            "26:00"
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
            "23:30",
            "24:30",
            "25:30",
            "26:30"
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
            "23:30",
            "24:30",
            "25:30",
            "26:30"
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

  return (
    <View style={styles.container}>
      <Text style={styles.currentTime}>現在時刻: {currentTime}</Text>
      <Text style={styles.currentTime}>{'\n'}鹿児島港</Text>
      <Text style={styles.nextDeparture}>先発: {nextDepartureKagoshima}</Text>
        <View style={[styles.column, styles.leftColumn]}>
          <Text style={styles.nextDeparture}>次発: {nextNextDepartureKagoshima}</Text>
        </View>

      <Text style={styles.currentTime}>{'\n'}桜島港</Text>
      <Text style={styles.nextDeparture}>先発: {nextDepartureSakurajima}</Text>
      <Text style={styles.nextDeparture}>次発: {nextNextDepartureSakurajima}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default App;
