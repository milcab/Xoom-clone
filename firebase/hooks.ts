import { useState, useEffect } from "react";
import { auth, emailVerification, signUp, signIn, updateUser } from "./app";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const signInWithEmailAndPassword = ({ email, password }) =>
    signIn(email, password);

  const createUserWithEmailAndPassword = ({
    email,
    password,
    displayName = "Milca",
    phoneNumber = "6465458888",
  }) =>
    signUp(email, password)
      .then(() => updateUser({ displayName, phoneNumber, photoURL: "" }))
      .then(() => emailVerification())
      .then(() => auth.currentUser);

  const signOut = () => auth.signOut().then(clear);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    clear,
  };
}
