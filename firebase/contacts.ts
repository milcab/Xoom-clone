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
const contactsRef = ref(database, "contacts");

export const addContact = async ({ currentUser, email, name }) => {
  if (!currentUser.uid) return null;

  const userContactsRef = child(contactsRef, currentUser.uid);
  const newKey = push(userContactsRef).key || "klk";

  const newContact = {
    [newKey]: {
      email,
      name,
    },
  };

  return update(userContactsRef, newContact);
};

export const getContactsFromCurrentUser = (currentUser, onNewContacts) => {
  if (!currentUser.uid) return null;

  const userContactsRef = child(contactsRef, currentUser.uid);

  onValue(userContactsRef, (snapshot) => {
    if (snapshot.exists()) {
      onNewContacts(snapshot.val());
    } else {
      console.log("No data available");
      onNewContacts(null);
    }
  });
};
