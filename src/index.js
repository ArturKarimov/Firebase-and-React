import React, {createContext} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAsuIsrTXFzJynrJIinOeLxL0zkbKEsrJg",
    authDomain: "chat-react-ad7b3.firebaseapp.com",
    projectId: "chat-react-ad7b3",
    storageBucket: "chat-react-ad7b3.appspot.com",
    messagingSenderId: "450734076741",
    appId: "1:450734076741:web:0bfdda0d84199a072ec42c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()

export const Context = createContext(null)


ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
)
