import React, { useEffect } from "react";
import { ForUsers } from "@/components/elements/navbar";
import { GetRequest } from "@/components/get_request";
import { AuthResponseConfig } from "@/components/interfaces";
import { useUserContext } from "./user_context";
import { useNavContext } from "./navbar_context";
import Navbar from "@/components/elements/navbar";
import ReplyPopup from "../elements/ReplyPopup";
import LoadingComponent from "../elements/loading";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUserCred } = useUserContext();
  const { setDirs } = useNavContext();

  async function GetCred() {
    const response = (await GetRequest(
      "/api/auth/login_cred"
    )) as AuthResponseConfig;
    if (response.status == 200) {
      setUserCred(response.credentials);
      setDirs(ForUsers);
    }
  }

  useEffect(() => {
    GetCred();
  }, []);

  return (
    <>
      <Navbar />
      <LoadingComponent/>
      <ReplyPopup />
      {children}
    </>
  );
}
