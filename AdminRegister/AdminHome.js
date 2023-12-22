import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyBCk9IrnMaQwaBIc4cE7icTWgyCRnd7nDI",
    authDomain: "food-panda-2273e.firebaseapp.com",
    projectId: "food-panda-2273e",
    storageBucket: "food-panda-2273e.appspot.com",
    messagingSenderId: "53570164814",
    appId: "1:53570164814:web:50f3bc402ff0add09a0b1f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


let Upload = document.querySelector("#upload");
let SaveBtn = document.querySelector("#Save");
let productDiv = document.querySelector("#productDiv");
let ImageOutput = document.querySelector("#imageOutput");
let imageoutDiv = document.querySelector(".imageoutDiv");
let ItemImage = document.querySelector("#itemImg");
let imageURL;

Upload.addEventListener("click", async () => {

    const mountainsRef = ref(storage, `Images/${ItemImage.files[0].name}`);
    const uploadTask = uploadBytesResumable(mountainsRef, ItemImage.files[0]);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageURL = downloadURL
                console.log('File available at', downloadURL);
                imageoutDiv.style.display = "block"
                ImageOutput.src = imageURL;
            });
        }
    )
    
})

SaveBtn.addEventListener("click", async () => {
    let ItemName = document.querySelector("#Itemname");
    let ItemCate = document.querySelector("#ItemCate");
    let ItemDesc = document.querySelector("#ItemDesc");
    let Price = document.querySelector("#price");
    let ItemImage = document.querySelector("#itemImg");
    let message = document.querySelector("#para");


    if (ItemName.value == '' || ItemCate.value == '' || ItemDesc.value == '' || Price.value == '' || ItemImage.value == '') {
        message.innerHTML = "Please Fill The Form."
        setTimeout(() => {
            message.innerHTML = ""
        }, 3000)
    }
    else {

        try {
            const docRef = await addDoc(collection(db, "Add Product"), {
                Item_Name: ItemName.value,
                Item_Category: ItemCate.value,
                Item_Description: ItemDesc.value,
                Item_Price: Price.value,
                // Item_ImageURL : imageURL,

            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        // window.location = "./AdminLogIn.html";
        productDiv.style.display = "block"
        productDiv.innerHTML = `<div><div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${imageURL}" id="proImg" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${ItemName.value}</h5>
              <h6 class="card-title">$ ${Price.value}</h6>
              <p class="card-text">${ItemDesc.value}</p>
              <p class="card-text"><small class="text-body-secondary">Last updated 2 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
        </div>`

    }
})


// productDiv.innerHTML = `<div><h2>${ItemCate.value}</h2>
// <div><img src="${imageURL}" alt=""></div>
// <div><h3>${ItemName.value}</h3></div>
// <div><h4>${Price.value}</h4></div>
// <div><p>${ItemDesc.value}</p></div>
// </div>`