import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDUvlfSn3Rp9579Javsw0yeWx36yjrYkb0",
  authDomain: "final-project-c829c.firebaseapp.com",
  projectId: "final-project-c829c",
  storageBucket: "final-project-c829c.appspot.com",
  messagingSenderId: "601121403820",
  appId: "1:601121403820:web:d9b22f82ce987a3f1b8009"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }