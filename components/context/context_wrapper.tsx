import React, { useEffect, useState } from "react";
import Navbar from "@/components/elements/navbar";
import ReplyPopup from "../elements/ReplyPopup";
import LoadingComponent from "../elements/loading";
import { useGetAccessTokenMutation } from "../redux/api/authApi";


export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [getAccessToken] = useGetAccessTokenMutation();

  useEffect(() => {
    const token = localStorage.getItem("minimalBlogRefreshToken");

    if (!token) return;
    getAccessToken(token)
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
