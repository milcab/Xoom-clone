import { useState, useEffect } from "react";
import { auth, emailVerification, signUp, signIn, updateUser } from "./app";
import { getContactsFromCurrentUser, addContact } from "./contacts";
import { getTransactionsFromCurrentUser, addTransaction } from "./transactions";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
});

export const useContacts = () => {
  const [contacts, setContacts] = useState(null);
  const { authUser } = useFirebaseAuth();

  useEffect(() => {
    if (authUser) {
      getContactsFromCurrentUser(authUser, (contacts) => {
        setContacts(contacts);
      });
    }
  }, [authUser]);

  console.log({
    contacts,
  });

  return {
    contacts,
    addContact: ({ name, email }: Record<string, string>) => {
      return addContact({ currentUser: authUser, name, email });
    },
  };
};

export const useTransaction = () => {
  const [transactions, setTransactions] = useState(null);
  const { authUser } = useFirebaseAuth();

  useEffect(() => {
    if (authUser) {
      getTransactionsFromCurrentUser(authUser, (transactions) => {
        setTransactions(transactions);
      });
    }
  }, [authUser]);

  return {
    transactions,
    addTransaction: ({ name, email, type, amount }: Record<string, string>) => {
      return addTransaction({
        currentUser: authUser,
        name,
        email,
        type,
        amount,
      });
    },
  };
};

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
