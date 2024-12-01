import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import {
  AuthResponseConfig,
  DummyUserData,
  UserDataInterface,
} from "@/components/interfaces";
import { getCookie } from "cookies-next";
import { ForGuests,ForUsers ,NavBarType} from "@/components/navbar";
import { GetRequest } from "@/components/get_request";
import Head from "next/head";
interface UserCredContextType {
  userCred: UserDataInterface;
  setUserCred: React.Dispatch<React.SetStateAction<UserDataInterface>>;
}

export const UserCredContext = React.createContext<UserCredContextType>({
  userCred: DummyUserData, // Provide a fallback
  setUserCred: () => {}, // No-op function as default
});


interface NavbarContextType {
  dirs: NavBarType;
  setDirs: React.Dispatch<React.SetStateAction<NavBarType>>;
}

export const NavbarContext = React.createContext<NavbarContextType>({
  dirs: ForGuests, // Provide a fallback
  setDirs: () => {}, // No-op function as default
});


export default function App({ Component, pageProps }: AppProps) {
  const [userCred, setUserCred] = useState(DummyUserData);
  const [dirs,setDirs]=useState(ForGuests);

  async function GetCred() {
  //  const minimal_blog_uid = getCookie("minimal_blog_uid") || false;
    
      const response = (await GetRequest(
        "/api/auth/login_cred"
      )) as AuthResponseConfig;
      if (response.status == 200) {
        setUserCred(response.credentials);
        setDirs(ForUsers)
      }
    
  }

  useEffect(() => {
    GetCred();
  }, []);

  return (
    <>
    <Head>
      <title>Minimal Blog</title>
    </Head>
    <UserCredContext.Provider value={{ userCred, setUserCred }}>
      <NavbarContext.Provider value={{dirs,setDirs}}>
      <Navbar />
      <Component {...pageProps} />
      </NavbarContext.Provider>
    </UserCredContext.Provider>
    </>
  );
}
