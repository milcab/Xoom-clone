import { firebase } from "./app";

import {
  getDatabase,
  ref,
  get,
  child,
  push,
  update,
  onValue,
} from "firebase/database";

const database = getDatabase(firebase);
const TransactionsRef = ref(database, "contacts");

export const addContact = async ({ currentUser, email, name }) => {
  if (!currentUser.uid) return null;

  const userTransactionsRef = child(TransactionsRef, currentUser.uid);
  const newKey = push(userTransactionsRef).key || "klk";

  const newContact = {
    [newKey]: {
      email,
      name,
    },
  };

  return update(userTransactionsRef, newContact);
};

export const getContactsFromCurrentUser = (currentUser, onNewContacts) => {
  if (!currentUser.uid) return null;

  const userTransactionsRef = child(TransactionsRef, currentUser.uid);

  onValue(userTransactionsRef, (snapshot) => {
    if (snapshot.exists()) {
      onNewContacts(snapshot.val());
    } else {
      console.log("No data available");
      onNewContacts(null);
    }
  });
};
