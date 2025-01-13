import React, { useContext, useState } from "react";
import { ForGuests, ForUsers, NavBarType } from "@/components/elements/navbar";

interface NavContextType {
  dirs: NavBarType;
  setDirs: React.Dispatch<React.SetStateAction<NavBarType>>;
}

const NavContext = React.createContext<NavContextType>({
  dirs: ForGuests,
  setDirs: () => {},
});

export default function NavHolder({ children }: { children: React.ReactNode }) {
  const [dirs, setDirs] = useState<NavBarType>(ForGuests);

  return (
    <NavContext.Provider value={{ dirs, setDirs }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNavContext = () => useContext(NavContext);
