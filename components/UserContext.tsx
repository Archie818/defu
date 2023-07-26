import React, { createContext, ReactNode, useCallback } from "react";
import { useLocalStorage } from "./localStorage";

interface UserContextProps {
  user: {
    isVipUser: boolean;
    picsGenerated: number;
    lastUpdated: string;
  } | null;
  fetchUserData: (address: string) => Promise<void>;
  incrementPicsGenerated: () => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const VIP_USERS = ["0x47fc3417213161efa7eeabd22b30286103c7fa25"];

  const [localUser, setLocalUser] = useLocalStorage("user", null);

  const fetchUserData = useCallback(async (address: string) => {
    const userFromLocalStorage = JSON.parse(
      window.localStorage.getItem("user") || "{}"
    );
    const currentDate = new Date().toISOString().split("T")[0];
    const lastUpdated = userFromLocalStorage.lastUpdated || "";
    const isSameDay = currentDate === lastUpdated;
    const fetchedUserData = {
      isVipUser: VIP_USERS.includes(address.toLowerCase()),
      picsGenerated: isSameDay ? userFromLocalStorage.picsGenerated : 0,
      lastUpdated: currentDate,
    };
    setLocalUser(fetchedUserData);
  }, []);

  const incrementPicsGenerated = () => {
    setLocalUser((prevState: any) => {
      if (prevState) {
        const updatedUser = {
          ...prevState,
          picsGenerated: prevState.picsGenerated + 1,
        };
        window.localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      } else {
        return null;
      }
    });
  };

  return (
    <UserContext.Provider
      value={{ user: localUser, fetchUserData, incrementPicsGenerated }}
    >
      {children}
    </UserContext.Provider>
  );
};
