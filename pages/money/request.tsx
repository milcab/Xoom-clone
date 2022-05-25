import type { NextPage } from "next";
import { forwardRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useFirebaseAuth from "../../firebase/hooks";

const Home: NextPage = () => {
  const { authUser } = useFirebaseAuth();

  return (
    <div className="flex flex-column items-center items-stretch">request</div>
  );
};

export default Home;
