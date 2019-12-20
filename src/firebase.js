import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDo83g9DCpYILPC2EFC7Y9FRi5yTXokjJk',
  authDomain: 'winnie-blog.firebaseapp.com',
  databaseURL: 'https://winnie-blog.firebaseio.com',
  projectId: 'winnie-blog',
  storageBucket: 'winnie-blog.appspot.com',
  messagingSenderId: '187807006085',
  appId: '1:187807006085:web:1b1e13866dd306f4e758ec',
  measurementId: 'G-ZDFHH7YM2Q'
};

let firebaseCache;

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(firebaseConfig);
  firebaseCache = firebase;
  return firebase;
};
