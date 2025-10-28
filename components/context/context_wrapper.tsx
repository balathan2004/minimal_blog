import React, { useEffect } from "react";
import Navbar from "@/components/elements/navbar";
import ReplyPopup from "../elements/ReplyPopup";
import LoadingComponent from "../elements/loading";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // async function GetCred() {
  //   const response = (await GetRequest(
  //     "/api/auth/login_cred"
  //   )) as AuthResponseConfig;
  //   if (response == 200) {
  //     setUserCred(response.credentials);

  //   }
  // }

  useEffect(() => {
    // GetCred();
  }, []);

  return (
    <>
      <Navbar />
      <LoadingComponent />
      <ReplyPopup />
      {children}
    </>
  );
}
