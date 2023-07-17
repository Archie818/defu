import Link from "next/link";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useEnsName, useNetwork } from "wagmi";
import { useState, useEffect } from "react";

export default function Header({
  photo,
  email,
}: {
  photo?: string;
  email?: string;
}) {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    console.log("address:", address);
    console.log("isConnected:", isConnected);
    console.log("___________");
  }, [address, isConnected]);

  return (
    <header className="flex flex-row xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <span role="img" aria-label="robot" className="text-3xl">
          🤖
        </span>
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          Defu.ai
        </h1>
      </Link>
      {/* {account ? (
        <div className="flex items-center space-x-4">
          <span> {account}</span>
          <button
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-400 bg-blue-600 font-medium transition"
            onClick={async (event) => {
              event.preventDefault();
              console.log("Logout button clicked");
              logout();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-400 bg-blue-600 font-medium transition"
          onClick={async (event) => {
            event.preventDefault();
            console.log("Login button clicked");
            login();
          }}
        >
          Sign In
        </button>
      )} */}
      <div className="">
        <ConnectButton showBalance={false} />
      </div>
    </header>
  );
}
