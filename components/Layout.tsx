import React from "react";
import styles from "./Layout.module.css";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function ({ children }: LayoutProps) {
  const outterPadding = "max-w-7xl mx-auto px-4 sm:px-6";
  return (
    <div className="bg-white h-screen">
      <Navbar />
      <main className={`${outterPadding}`}>{children}</main>
      <footer className={`${outterPadding}`}>footer goes here</footer>
    </div>
  );
}
