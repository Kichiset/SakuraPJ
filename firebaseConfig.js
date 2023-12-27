import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: ' AIzaSyC6r-YjmYrDra6MPdtcdPRAfyVhw6FsBOs ',
  authDomain: 'sakurajimaferrypj.firebaseapp.com',
  databaseURL: 'https://sakurajimaferrypj.firebaseio.com',
  projectId: 'sakurajimaferrypj',
  storageBucket: 'sakurajimaferrypj.appspot.com',
  messagingSenderId: '1066425501078',
  appId: '1:1066425501078:android:ccc21d2ca20b918c9809b7',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
