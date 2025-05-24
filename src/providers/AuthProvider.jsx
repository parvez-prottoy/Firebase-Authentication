import AuthContext from "../context/AuthContext";
import app from "../config/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function AuthProvider({ children }) {
  const auth = getAuth(app);
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
      console.error("Error registering user:", error);
      throw error;
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
      console.error("Error logging in user:", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
}
