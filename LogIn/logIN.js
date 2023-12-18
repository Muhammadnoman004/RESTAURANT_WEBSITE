import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
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
const db = getFirestore(app);

let log_Btn = document.querySelector("#signIn");
let googlebtn = document.querySelector("#Google");

log_Btn.addEventListener("click", () => {
  let log_Email = document.querySelector("#lemail");
  let log_password = document.querySelector("#lpass");
  let message = document.querySelector("#para");

  if (log_Email.value == '' && log_password.value == '') {
    message.innerHTML = "Please Fill The Form."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (log_Email.value == '') {
    message.innerHTML = "Please Enter The Email."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (log_password.value == '') {
    message.innerHTML = "Please Enter The Password."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else {
    signInWithEmailAndPassword(auth, log_Email.value, log_password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user =>", user);
        localStorage.setItem("USEREmail", user.email)
        window.location = "../index.html"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error =>", errorMessage);

      });
  }
})

googlebtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log(user.displayName);
      console.log(user.email);
      localStorage.setItem("USEREMAIL", user.email)

      try {
        const docRef = await addDoc(collection(db, "users"), {
          Name: user.displayName,
          Email: user.email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      window.location = '../index.html'

    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

      const email = error.customData.email;

      const credential = GoogleAuthProvider.credentialFromError(error);

    });


})

let getBtn1 = document.querySelector("#Sbutton");
getBtn1.addEventListener("click", () => {
  window.location = "../SignUP/index.html"
})