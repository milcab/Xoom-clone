import type { NextPage } from "next";
import { forwardRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useFirebaseAuth from "../firebase/hooks";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { authUser } = useFirebaseAuth();

  return (
    <div className="flex items-center items-stretch flex-col md:flex-row">
      <Link href={"/money/selectRecepients?action=send"}>
        <a
          className={`bg-blue-dark text-white text-xl antialiased font-bold flex justify-center items-center min-h-[200px] md:h-screen flex-1 p-12`}
        >
          Send Money
        </a>
      </Link>
      <Link href={"/money/selectRecepients?action=request"}>
        <a
          className={`bg-blue-medium text-white text-xl antialiased font-bold flex justify-center items-center min-h-[200px] md:h-screen flex-1 p-12`}
        >
          Request Money
        </a>
      </Link>
    </div>
  );
};

export default Home;
