import React, { useEffect, useState } from "react";
import Navbar from "@/components/elements/navbar";
import ReplyPopup from "../elements/ReplyPopup";
import LoadingComponent from "../elements/loading";
import { useGetLoginCredQuery } from "../redux/api/authApi";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {} = useGetLoginCredQuery();



  return (
    <>
      <Navbar />
      <LoadingComponent />
      <ReplyPopup />
      {children}
    </>
  );
}
