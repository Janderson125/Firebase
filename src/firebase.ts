// src/firebase.ts
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyA0MOP3yXkQy5_mRMSEpIl4Wbz0lu1duEQ",
  authDomain: "ecommerce-api-e42c7.firebaseapp.com",
  projectId: "ecommerce-api-e42c7",
  storageBucket: "ecommerce-api-e42c7.appspot.com",
  messagingSenderId: "700782827478",
  appId: "1:700782827478:web:46ea2c0c33893ed6f43677"
}

const app = initializeApp(firebaseConfig)

export default app
