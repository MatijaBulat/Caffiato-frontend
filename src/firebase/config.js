//firebase config 
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2bjQkJTRwByE9C9D85TZsD9gjjVPoRPE",
  authDomain: "idemoukafic.firebaseapp.com",
  projectId: "idemoukafic",
  storageBucket: "idemoukafic.appspot.com",
  messagingSenderId: "205203260252",
  appId: "1:205203260252:web:985b8fd6185545ce767799",
  measurementId: "G-VDTYZN0Y94",
}

//init firebase
initializeApp(firebaseConfig)

//init firebase auth
const auth = getAuth()


//export kako bi mogli koristit auth u drugim fileovima
export { auth }

