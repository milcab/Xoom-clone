import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useFirebaseAuth from "../firebase/hooks";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { authUser } = useFirebaseAuth();

  console.log({
    authUser,
  });
  return (
    <div className="flex items-center">
      <div className="lg:w-0 lg:flex-1 p-12">
        <h1 className="text-3xl font-bold mb-6">WHAT'S MILCA-TRANSFER?</h1>
        <p className="mb-6">
          Milca-transfer is a great way to send money to friends and family,
          even if they bank somewhere different than you do.1 That means it’s
          super easy to pitch in or get paid back for all sorts of things like
          the neighborhood block party or getting paid back for covering the
          cost of a vacation rental for a group of friends. Zelle® is already in
          lots of banking apps, so look for it in yours today.
        </p>
        <Link href={"/signup"}>
          <button
            type="button"
            className="w-full text-gold hover:text-white border border-gold hover:bg-gold focus:ring-4 focus:outline-none focus:ring-gold font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gold dark:text-gold dark:hover:text-white dark:hover:bg-gold dark:focus:ring-gold"
          >
            Sign Up
          </button>
        </Link>
      </div>
      <div className="flex justify-start lg:w-0 lg:flex-1 p-12">
        <img
          className="mb-3 w-[350px] h-[350px] rounded-full shadow-lg"
          src="/cash_app_banner.jpeg"
          alt="Bonnie image"
        />
      </div>
    </div>
  );
};

export default Home;
