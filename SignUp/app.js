import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
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

let Btn = document.querySelector("#signUp");
let googlebtn = document.querySelector("#Google");

Btn.addEventListener("click", () => {
  let Name = document.querySelector("#sname");
  let message = document.querySelector("#para");
  let Email = document.querySelector("#semail");
  let password = document.querySelector("#spass");

  if (Email.value == '' && password.value == '' && Name.value == '') {
    message.innerHTML = "Please Fill The Form."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (Email.value == '') {
    message.innerHTML = "Please Enter The Email."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (password.value == '') {
    message.innerHTML = "Please Enter The Password."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (Name.value == '') {
    message.innerHTML = "Please Enter The Name."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else {
    console.log(Name.value);
    console.log(Email.value);
    console.log(password.value);
    createUserWithEmailAndPassword(auth, Email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("user =>", user);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            Name: Name.value,
            Email: Email.value,
            Password: password.value,

          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        window.location = "../LogIn/logIn.html"


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error =>", errorCode);

      });
  }

});

googlebtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log(user.displayName)
      console.log(user.email)
      localStorage.setItem("UserUid", user.uid)

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

let getBtn = document.querySelector('#Sbutton1');
getBtn.addEventListener('click', () => {
  window.location = "../LogIn/logIn.html"
})
let adminBtn = document.querySelector("#admin");
adminBtn.addEventListener("click", ()=>{
  window.location = "../AdminRegister/AdminSignUp.html";
})