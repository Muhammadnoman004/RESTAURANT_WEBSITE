import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
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

let Adloginbtn = document.querySelector("#signin");

Adloginbtn.addEventListener("click", () => {
    let BusinessName = document.querySelector("#Bname");
    let BusinessType = document.querySelector("#inpdrop");
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
                localStorage.setItem("AdminUid", user.uid)
                window.location = "./AdminHome.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error =>", errorMessage);

            });
    }
})

let lbtn = document.querySelector("#Sbutton");
lbtn.addEventListener("click", () => {
    window.location = "./AdminSignUp.html";
})