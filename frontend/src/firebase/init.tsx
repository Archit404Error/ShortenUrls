import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../.firebase.json"

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)