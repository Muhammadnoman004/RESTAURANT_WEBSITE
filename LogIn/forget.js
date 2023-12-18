import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBCk9IrnMaQwaBIc4cE7icTWgyCRnd7nDI",
  authDomain: "food-panda-2273e.firebaseapp.com",
  projectId: "food-panda-2273e",
  storageBucket: "food-panda-2273e.appspot.com",
  messagingSenderId: "53570164814",
  appId: "1:53570164814:web:50f3bc402ff0add09a0b1f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

let Btn2 = document.querySelector("#send_btn");

Btn2.addEventListener("click", () => {
  let getEmail = document.querySelector("#inp");

  sendPasswordResetEmail(auth, getEmail.value)
    .then(() => {
      console.log("Email Send");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("error =>", errorMessage);
    });
})

