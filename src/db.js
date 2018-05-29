import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyB9w7_-o0iE0brcI4cPs0QgZkbxUB3nUuE",
    authDomain: "chatapp-3078c.firebaseapp.com",
    databaseURL: "https://chatapp-3078c.firebaseio.com",
    projectId: "chatapp-3078c",
    storageBucket: "chatapp-3078c.appspot.com",
    messagingSenderId: "620909952644"
}

firebase.initializeApp(config)
const db = firebase.firestore()
export default db