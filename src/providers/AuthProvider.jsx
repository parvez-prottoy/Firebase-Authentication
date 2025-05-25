import AuthContext from "../context/AuthContext";
import app from "../config/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [observerLoading, setObserverLoading] = useState(true);
  // authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setObserverLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
  // Google Sign In
  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      return userCredential.user;
    } catch (error) {
      return error;
    }
  };
  //   registerUser
  const registerUser = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // You can also update the user's profile with the username
      await updateProfile(user, { displayName: username });
      return user;
    } catch (error) {
      return error;
    }
  };
  // loginUser
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return error;
    }
  };
  // logoutUser
  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return true;
    } catch (error) {
      return error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        user,
        observerLoading,
        logoutUser,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
