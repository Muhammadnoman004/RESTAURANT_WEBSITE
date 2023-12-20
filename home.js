import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBCk9IrnMaQwaBIc4cE7icTWgyCRnd7nDI",
  authDomain: "food-panda-2273e.firebaseapp.com",
  projectId: "food-panda-2273e",
  storageBucket: "food-panda-2273e.appspot.com",
  messagingSenderId: "53570164814",
  appId: "1:53570164814:web:50f3bc402ff0add09a0b1f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let LogOutBtn = document.querySelector("#logout");
  
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      
    } else {
      window.location = "./SignUp/index.html"
     
    }
  });

LogOutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('logout successfully');
    localStorage.removeItem("UserUid")
    localStorage.removeItem("AdminUid")
    window.location = "./SignUp/index.html"
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });

})