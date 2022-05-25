import type { NextPage } from "next";
import { forwardRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useFirebaseAuth, {
  useContacts,
  useTransaction,
} from "../../firebase/hooks";
import { useState } from "react";
import Modal from "../../components/Modal";
import { useRef } from "react";
import { stringify } from "querystring";

const transactionTypes = {
  SEND: "send",
  REQUEST: "request",
};
const User = ({ name, email }) => {
  const [transactionType, setTransactionType] = useState(transactionTypes.SEND);
  const [transactionVisibility, showTransaction] = useState(false);

  const closeModal = () => {
    showTransaction(false);
  };

  return (
    <div className="flex items-center  pb-6">
      <img
        src="https://cdn.tuk.dev/assets/components/misc/doge-coin.png"
        alt="coin avatar"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex items-start justify-between w-full">
        <div className="pl-3 w-full">
          <p
            tabIndex={0}
            className="focus:outline-none text-xl font-medium leading-5 text-gray-800"
          >
            {name}
          </p>
          <p
            tabIndex={0}
            className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 "
          >
            {email}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            onClick={() => {
              setTransactionType(transactionTypes.SEND);
              showTransaction(true);
            }}
            className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-dark hover:bg-indigo-700"
          >
            Send Money
          </a>
          <a
            onClick={() => {
              setTransactionType(transactionTypes.REQUEST);
              showTransaction(true);
            }}
            className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-medium hover:bg-indigo-700"
          >
            Request Money
          </a>
        </div>
      </div>
      {transactionVisibility && (
        <Transaction
          recipient={{ name, email }}
          type={transactionType}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const AddRecipient = ({ onClose }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const formRef = useRef(null);
  const { addContact } = useContacts();
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!nameRef.current || !emailRef.current) {
      return;
    }

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    addContact({ name, email }).then(closeModal);
  };
  const closeModal = () => {
    formRef.current?.reset();
    onClose();
  };
  return (
    <Modal onCloseHandler={closeModal}>
      <form onSubmit={onFormSubmit} ref={formRef}>
        <label
          htmlFor="name"
          className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
        >
          Contact Name
        </label>
        <input
          id="name"
          ref={nameRef}
          className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="James"
        />
        <label
          htmlFor="email2"
          className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
        >
          Contact Email
        </label>
        <div className="relative mb-5 mt-2">
          <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
            @
          </div>
          <input
            type="email"
            ref={emailRef}
            id="email2"
            className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
            placeholder="joedoe@email.com"
          />
        </div>
        <div className="flex items-center justify-start w-full">
          <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
            Add Contact
          </button>
          <button
            className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

const Transaction = ({
  onClose,
  type = "send",
  recipient = {},
}: Record<string, any>) => {
  const amountRef = useRef(null);
  const formRef = useRef(null);
  const { addTransaction } = useTransaction();
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!amountRef.current) {
      return;
    }

    const amount = amountRef.current.value;
    addTransaction({ ...recipient, type, amount }).then(closeModal);
  };
  const closeModal = () => {
    formRef.current?.reset();
    onClose();
  };
  const title = `${
    type === transactionTypes.SEND ? "sending to" : "requesting from"
  } ${recipient.name}`;
  return (
    <Modal onCloseHandler={closeModal} title={title}>
      <form onSubmit={onFormSubmit} ref={formRef}>
        <label
          htmlFor="amount"
          className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
        >
          How much?
        </label>
        <input
          id="amount"
          ref={amountRef}
          className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="James"
        />

        <div className="flex items-center justify-start w-full">
          <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
            {type.toLocaleUpperCase()}
          </button>
          <button
            className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

const Home: NextPage = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const { contacts } = useContacts();

  const contactsList = contacts ? Object.entries(contacts) : [];

  console.log({
    contactsList,
  });

  const onAddNewRecepientClick = () => {
    setModalVisibility(!isModalVisible);
  };

  const closeModalHandler = () => setModalVisibility(false);

  return (
    <div className="flex flex-col  gap-4 items-center items-stretch">
      <div className="p-4 flex flex-col items-center justify-center">
        <h1 className="mb-2 text-3xl">Select Recepient</h1>
        <a
          onClick={onAddNewRecepientClick}
          className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add New Receipient
        </a>
      </div>

      {isModalVisible && <AddRecipient onClose={closeModalHandler} />}

      {/* <section>
        <h2>Recent Contacts</h2>
        <div>Coming soon</div>
      </section> */}
      <section>
        <h2 className="border-b border-gray-200 mb-4">All Contacts</h2>

        <div>
          {contactsList.map(([contactId, contact]: any[]) => (
            <User key={contactId} name={contact.name} email={contact.email} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
