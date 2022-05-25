import type { NextPage } from "next";
import { forwardRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useFirebaseAuth from "../../firebase/hooks";

const Home: NextPage = () => {
  const { authUser } = useFirebaseAuth();

  return <div className="flex items-center items-stretch">Send money</div>;
};

export default Home;
