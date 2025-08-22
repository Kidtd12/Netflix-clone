import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTLROFIQqs1QcUho9xCsU97IzSbCiFOGs",
  authDomain: "netflix-clone-13ccd.firebaseapp.com",
  projectId: "netflix-clone-13ccd",
  storageBucket: "netflix-clone-13ccd.appspot.com",
  messagingSenderId: "612948865292",
  appId: "1:612948865292:web:16f48052f2b87f7d611929"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
export const signup = async (name, email, password) => {
  if (!name || !email || !password) {
    toast.error("Please fill in all fields.");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Account created successfully!");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("Email already in use. Please sign in.");
    } else {
      toast.error(error.message || "Signup failed.");
    }
  }
};

// Login function
export const login = async (email, password) => {
  if (!email || !password) {
    toast.error("Please enter email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    if (
      error.code === "auth/wrong-password" || 
      error.code === "auth/invalid-credential"
    ) {
      toast.error("Invalid email or password.");
    } else if (error.code === "auth/user-not-found") {
      toast.error("User not found. Please sign up.");
    } else {
      toast.error(error.message || "Login failed.");
    }
  }
};

// Logout function
export const logout = () => {
  signOut(auth);
  toast.info("Logged out");
};

export { auth, db };
