// Web3Context.tsx
import React, { createContext, useContext, useState } from "react";
import Web3 from "web3";

interface IWeb3Context {
  login: () => void;
  logout: () => void;
  signMessage: (message: string) => Promise<string>;
  account: string | null;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

const Web3Context = createContext<IWeb3Context | undefined>(undefined);

export const useWeb3 = (): IWeb3Context => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  const login = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const logout = () => {
    setAccount(null);
  };

  const signMessage = async (message: string) => {
    if (account) {
      const signature = await web3.eth.personal.sign(message, account, "");
      return signature;
    }
    throw new Error("User not logged in");
  };

  const value = { login, logout, signMessage, account };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
