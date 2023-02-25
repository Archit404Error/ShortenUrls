import React, { useState, createContext, useContext, useEffect } from "react";

interface UserDetails {
  email: string;
  accessToken: string;
  idToken: string;
}

export type UserContextType = {
  userInfo: UserDetails | undefined;
  setUserInfo: (userInfo: UserDetails) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState<UserDetails>();

  useEffect(() => {
    if (localStorage.hasOwnProperty("userInfo") && localStorage.getItem("userInfo") !== "undefined") {
      console.log("got " + localStorage.getItem("userInfo"))
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")!))
    }
  }, [])
  useEffect(() => localStorage.setItem("userInfo", JSON.stringify(userInfo)), [userInfo]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
