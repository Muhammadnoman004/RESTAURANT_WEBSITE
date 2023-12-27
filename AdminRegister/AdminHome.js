import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc , deleteDoc} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
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



let SaveBtn = document.querySelector("#Add");
let SBtn = document.querySelector("#Save");
let ClearBtn = document.querySelector("#Clear");
let productDiv = document.querySelector("#productDiv");
let ImageOutput = document.querySelector("#imageOutput");
let imageoutDiv = document.querySelector(".imageoutDiv");
let ItemImage = document.querySelector("#itemImg");
let imageURL;
let ProductID = [];

    //  Storage //

const downloadImageUrl = (file) => {
    return new Promise((resolve, reject) => {
        const restaurantImageRef = ref(storage, `images/${file.name}`
        );
        const uploadTask = uploadBytesResumable(restaurantImageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case "paused":
                        console.log('Upload is paused');
                        break;
                    case "running":
                        console.log("running");
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        );
    });
};

ItemImage.addEventListener("change", async () => {
    if (ItemImage.files.length > 0) {
        const file = ItemImage.files[0];
        imageURL = await downloadImageUrl(file);
        imageoutDiv.style.display = "block";
        if (imageURL) {
            ImageOutput.src = imageURL;
        }
    }
})


//  get Data From FireBase  //

const getData = async () => {

    onSnapshot(collection(db, "Add Product"), (AllData) => {
        AllData.docChanges().forEach((data) => {
            console.log(data);
            ProductID.push(data.doc.id);
            console.log(data.doc.data());
            if(data.type == "removed"){
                const ProductChildDiv = document.getElementById(data.doc.id);
                if(ProductChildDiv){

                    ProductChildDiv.remove();
                }
            }
           else if (data.type == "added") {

                productDiv.style.display = "block"
                productDiv.innerHTML += `<div class = "ProductChildDiv" id="${data.doc.id}"><div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col col-md-4">
                    <img src="${data.doc.data().Item_ImageURL}" id="proImg" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${data.doc.data().Item_Name}</h5>
                      <h6 class="card-title">$${data.doc.data().Item_Price}</h6>
                      <p class="card-text">${data.doc.data().Item_Description}</p>
                      <p class="card-text"><small class="text-body-secondary">Last updated 2 mins ago</small></p>
                    </div>
                    <div class = "cardBtnDiv">
                    <button type="button" id = "EditBtn" onclick = "updateData('${data.doc.id}')" data-bs-toggle="modal" data-bs-target="#updateItemModal">Edit</button>
                    <button id = "DelBtn" onclick = "DelData('${data.doc.id}')">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
                </div>`
                ClearBtn.style.display = "block";
                SBtn.style.display = "block";
            }
        })
    })


}
getData();

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
                Item_ImageURL: imageURL,
                Time: new Date().toLocaleString(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        // window.location = "./AdminLogIn.html";

        ItemName.value = ''
        ItemCate.value = ''
        ItemDesc.value = ''
        Price.value = ''
        ItemImage.value = ''
        imageoutDiv.style.display = 'none'
    }


})

    //  Update  Data From Database  //

function updateData(id) {
    console.log(id);
}

    //  Delete Data From Database   //

 async function DelData(id){
    await deleteDoc(doc(db, "Add Product", id));
    
}

    //  Clear All Data From Database    //

ClearBtn.addEventListener("click" , async ()=>{
    productDiv.innerHTML = '';
    const arr = [];
    for(let i = 0; i < ProductID.length; i++){
       arr.push(await deleteDoc(doc(db, "Add Product", ProductID[i])));

    }
    Promise.all(arr)
    .then((res) => {
      console.log('All item has been deleted');
    })
    .catch((err) => {
      console.log('error-->' , err);
    })

})


window.updateData = updateData
window.DelData = DelData