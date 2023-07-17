import React, { createContext, useState, useEffect, ReactNode } from "react";

interface UserContextProps {
  user: {
    isVipUser: boolean;
    picsGenerated: number;
  } | null;
  fetchUserData: (address: string) => Promise<void>;
  incrementPicsGenerated: () => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    isVipUser: boolean;
    picsGenerated: number;
  } | null>(null);

  // Function to update user's data
  // You would typically fetch this data from your back-end
  const fetchUserData = async (address: string) => {
    // Replace the following code with your actual API call
    const fetchedUserData = {
      isVipUser: false, // get this data from your back-end
      picsGenerated: 0, // get this data from your back-end
    };
    setUser(fetchedUserData);
  };

  // Function to increment the number of pics generated
  // You would typically update this data in your back-end
  const incrementPicsGenerated = () => {
    setUser((prevState) => {
      if (prevState) {
        return { ...prevState, picsGenerated: prevState.picsGenerated + 1 };
      } else {
        return null;
      }
    });
  };

  return (
    <UserContext.Provider
      value={{ user, fetchUserData, incrementPicsGenerated }}
    >
      {children}
    </UserContext.Provider>
  );
};
