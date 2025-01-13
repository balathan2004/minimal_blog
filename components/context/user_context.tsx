import React, { useContext, useState } from "react";
import { ForGuests, ForUsers, NavBarType } from "@/components/elements/navbar";
import { DummyUserData, UserDataInterface } from "../interfaces";

interface UserContextType {
  userCred: UserDataInterface | null;
  setUserCred: React.Dispatch<React.SetStateAction<UserDataInterface | null>>;
}

const UserContext = React.createContext<UserContextType>({
  userCred: null, // Provide a fallback
  setUserCred: () => {}, // No-op function as default
});

export default function UserHolder({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userCred, setUserCred] = useState<UserDataInterface | null>(null);

  return (
    <UserContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
