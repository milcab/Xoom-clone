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
const TransactionsRef = ref(database, "transactions");

export const addTransaction = async ({
  currentUser,
  email,
  name,
  type,
  amount,
}) => {
  if (!currentUser.uid) return null;

  const userTransactionsRef = child(TransactionsRef, currentUser.uid);
  const newKey = push(userTransactionsRef).key || "klk";

  const newTransaction = {
    [newKey]: {
      email,
      name,
      type,
      amount,
    },
  };

  return update(userTransactionsRef, newTransaction);
};

export const getTransactionsFromCurrentUser = (
  currentUser,
  onNewTransactions
) => {
  if (!currentUser.uid) return null;

  const userTransactionsRef = child(TransactionsRef, currentUser.uid);

  onValue(userTransactionsRef, (snapshot) => {
    if (snapshot.exists()) {
      onNewTransactions(snapshot.val());
    } else {
      console.log("No data available");
      onNewTransactions(null);
    }
  });
};
