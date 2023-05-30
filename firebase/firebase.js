// Import the functions you need from the SDKs you need
import { API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/storage";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyBfqg5aCIdShpPes7r8zq_ktjlcZ42B9I4",
//   authDomain: "foodrvapp.firebaseapp.com",
//   projectId: "foodrvapp",
//   storageBucket: "foodrvapp.appspot.com",
//   messagingSenderId: "927684098464",
//   appId: "1:927684098464:web:44d4648c9e89c0b1920cc5",
//   measurementId: "G-ZMGYHHBVGZ",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDS5OnKvwHo4mL5j247Flu7KBFVtWWvYqI",
  authDomain: "foodrv1.firebaseapp.com",
  databaseURL: "https://foodrv1-default-rtdb.firebaseio.com",
  projectId: "foodrv1",
  storageBucket: "foodrv1.appspot.com",
  messagingSenderId: "756448560301",
  appId: "1:756448560301:web:1ed0981374958c913fb224",
  measurementId: "G-064HT6TFRP"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const fsbase = getFirestore(app);
