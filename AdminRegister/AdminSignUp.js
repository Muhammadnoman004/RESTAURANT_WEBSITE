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

let AdSingnup = document.querySelector("#signUp");

AdSingnup.addEventListener("click", () => {
    let BusinessName = document.querySelector("#Bname");
    let BusinessType = document.querySelector("#inpdrop");
    let Contact = document.querySelector("#Contact");
    let Address = document.querySelector("#address");
    let Email = document.querySelector("#semail");
    let password = document.querySelector("#spass");
    let message = document.querySelector("#para");
    
    if (Email.value == '' && password.value == '' && BusinessName.value == '' && BusinessType.value == '' && Contact.value == '' && Address.value == '') {
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
    else if (BusinessName.value == '') {
        message.innerHTML = "Please Enter The Business_Name."
        setTimeout(() => {
            message.innerHTML = ""
        }, 3000)
    }
    else {
        console.log(BusinessName.value);
        console.log(Email.value);
        console.log(password.value);
        createUserWithEmailAndPassword(auth, Email.value, password.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log("user =>", user);
                try {
                    const docRef = await addDoc(collection(db, "Admin Registered"), {
                        Business_Name: BusinessName.value,
                        Business_Type: BusinessType.value,
                        Contact: Contact.value,
                        Address: Address.value,
                        Email: Email.value,
                        Password: password.value,

                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                window.location = "./AdminLogIn.html";


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error =>", errorCode);

            });
    }

});


let Sbtn = document.querySelector("#Sbutton1");
Sbtn.addEventListener("click", () => {
    window.location = "./AdminLogIn.html"
})