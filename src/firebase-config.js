import { initializeApp } from "firebase/app";
// import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getFirestore} from '@firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_KEY,
  authDomain: "throw-down-the-gauntlet.firebaseapp.com",
  projectId: "throw-down-the-gauntlet",
  storageBucket: "throw-down-the-gauntlet.appspot.com",
  messagingSenderId: "660444473569",
  appId: "1:660444473569:web:15ecea4571c0f303fcafa0",
  measurementId: "G-YC5LKZLBQ2"
};

const app = initializeApp(firebaseConfig)
// const appCheck = initializeAppCheck(app, { provider: new ReCaptchaV3Provider('6LcquSghAAAAAK1FXZaSduuDVMliUHTeO6nr0CqP'), isTokenAutoRefreshEnabled: true})
export const auth = getAuth(app);
export const db = getFirestore(app);