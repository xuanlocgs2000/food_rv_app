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

const firebaseConfig = {
  // apiKey: API_KEY,
  // authDomain: "instagram-clone-b03b9.firebaseapp.com",
  // projectId: "instagram-clone-b03b9",
  // storageBucket: "instagram-clone-b03b9.appspot.com",
  // messagingSenderId: "394156483799",
  // appId: "1:394156483799:web:ae87249651dd54ddfafc92",
  // measurementId: "G-3LW9ES4TSX",
  // apiKey: "AIzaSyArBBJUyxkb7uJbCOK9EFIhWRVAyK0rEeI",
  // authDomain: "foodrv-a1e48.firebaseapp.com",
  // databaseURL: "https://foodrv-a1e48-default-rtdb.firebaseio.com",
  // projectId: "foodrv-a1e48",
  // storageBucket: "foodrv-a1e48.appspot.com",
  // messagingSenderId: "574997965894",
  // appId: "1:574997965894:web:40564917caa14d38832e47",
  // measurementId: "G-G3B34E10K1",
  apiKey: "AIzaSyBfqg5aCIdShpPes7r8zq_ktjlcZ42B9I4",
  authDomain: "foodrvapp.firebaseapp.com",
  projectId: "foodrvapp",
  storageBucket: "foodrvapp.appspot.com",
  messagingSenderId: "927684098464",
  appId: "1:927684098464:web:44d4648c9e89c0b1920cc5",
  measurementId: "G-ZMGYHHBVGZ",
  ////////////////////////
  // apiKey: "AIzaSyBv6UanAGExvkb1Nr8JzKT_n2HYWkTsu_M",
  // authDomain: "testdb-21179.firebaseapp.com",
  // databaseURL: "https://testdb-21179-default-rtdb.firebaseio.com",
  // projectId: "testdb-21179",
  // storageBucket: "testdb-21179.appspot.com",
  // messagingSenderId: "337720415295",
  // appId: "1:337720415295:web:123b6f067e8853ca88148a", // foodrv1 cua testdb
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const fsbase = getFirestore(app);
// apiKey: "AIzaSyBv6UanAGExvkb1Nr8JzKT_n2HYWkTsu_M",
// authDomain: "testdb-21179.firebaseapp.com",
// databaseURL: "https://testdb-21179-default-rtdb.firebaseio.com",
// projectId: "testdb-21179",
// storageBucket: "testdb-21179.appspot.com",
// messagingSenderId: "337720415295",
// appId: "1:337720415295:web:123b6f067e8853ca88148a", // foodrv1
