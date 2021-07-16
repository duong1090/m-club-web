import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBa7gOFIRFEF-K3cehZqxpbLVDdcWL9cs",
  authDomain: "mclub-e52a3.firebaseapp.com",
  databaseURL: "https://mclub-e52a3.firebaseio.com",
  projectId: "mclub-e52a3",
  storageBucket: "mclub-e52a3.appspot.com",
  messagingSenderId: "472042172682",
  appId: "1:472042172682:web:31d02ccb8f305eba6f4af3",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

//set configuration
auth.languageCode = "it";
auth.useDeviceLanguage();

//setup reCaptcha
export const setUpReCaptcha = () => {
  return new Promise((resolve, reject) => {
    global.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("setUpReCaptcha:::callback:", response);
          resolve(response);
        },
        "expired-callback": (e) => {
          console.log("setUpReCaptcha:::expired-callback:", e);
          reject(e);
        },
      }
    );
  });
};
