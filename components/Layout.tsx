import React from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function ({ children }: LayoutProps) {
  const outterPadding = "max-w-7xl mx-auto px-4 sm:px-6 min-h-screen";
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className={`${outterPadding}`}>{children}</main>
    </div>
  );
}
