import moment from 'moment';
// 桜島港と鹿児島港の平日と土日祝日の出発時刻データ
import ferryTimetable from './timeTable.json';
const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';


const peakSeason_prePost = ["2023-08-11", "2023-08-15"];
const isPrePost = peakSeason_prePost.includes(moment().format('YYYY-MM-DD'));
const peakSeason = ["2023-08-12", "2023-08-13", "2023-08-14"];
const isPeak = peakSeason.includes(moment().format('YYYY-MM-DD'));

const isWeekEnd = moment().format('d') % 6 == 0 ? true : false;

// 出発時刻の探索関数 (先発と次発を探す)
const getNextDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const nextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  return nextDepartureTime || schedule[0]; // 最終便が終わった場合は翌日の最初の便を表示
};

// 次の次の出発時刻を探す関数
const getFollowingDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const nextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  const followingDepartureTime = schedule.find(time => moment(time, 'HH:mm') > moment(nextDepartureTime, 'HH:mm'));
  return followingDepartureTime || schedule[1]; // 最終便が終わった場合は翌日の2番目の便を表示
};

// 時刻表を現在時刻を基準に並び替える関数
const sortSchedule = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const todaySchedule = schedule.filter(time => moment(time, 'HH:mm') >= currentMoment);
  const nextDaySchedule = schedule.filter(time => moment(time, 'HH:mm') < currentMoment);
  return [...todaySchedule, ...nextDaySchedule];
};



// 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [nextDepartureKagoshima, setNextDepartureKagoshima] = useState('');
  const [followingDepartureSakurajima, setFollowingDepartureSakurajima] = useState('');
  const [followingDepartureKagoshima, setFollowingDepartureKagoshima] = useState('');
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

    // 時刻表を現在時刻を基準に並び替える
    const sortedSakurajimaSchedule = sortSchedule(sakurajimaSchedule, currentTime);
    const sortedKagoshimaSchedule = sortSchedule(kagoshimaSchedule, currentTime);
    
    // 先発と次発の出発時刻を取得
    const nextDepartureSakurajima = getNextDeparture(sortedSakurajimaSchedule, currentTime);
    const nextDepartureKagoshima = getNextDeparture(sortedKagoshimaSchedule, currentTime);
    
    // 次の次の出発時刻を取得
    const followingDepartureSakurajima = getFollowingDeparture(sortedSakurajimaSchedule, currentTime);
    const followingDepartureKagoshima = getFollowingDeparture(sortedKagoshimaSchedule, currentTime);
    
    // 状態変数を更新する
    setNextDepartureSakurajima(nextDepartureSakurajima);
    setNextDepartureKagoshima(nextDepartureKagoshima);
    setFollowingDepartureSakurajima(followingDepartureSakurajima);
    setFollowingDepartureKagoshima(followingDepartureKagoshima);
  }, [currentTime, holidaysData]);
 
 
 