
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { NavbarContext } from "@/pages/_app";
export type NavBarType = { path: string; name: string }[];
export const ForGuests: NavBarType = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/auth/login", name: "login" },
  { path: "/auth/register", name: "register" },

];

export const ForUsers: NavBarType = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/create_post", name: "create post" },
 
];

export default function Navbar() {
  const currentRoute = useRouter().asPath;

  const { dirs } = useContext(NavbarContext);

  const [inputValue, setInputValue] = useState<boolean>(false);

  const changeInput = () => {
    setInputValue(false);
  };

  const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.checked);
  };

  return (
    <div>
      <nav className={"nav"}>
        <input
          className={"input"}
          type="checkbox"
          id="check"
          onChange={setInput}
          checked={inputValue}
        ></input>
        <label htmlFor="check" className={"checkbtn"}>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <Link href="/" className={"brand"}>
          Minimal Blogger
        </Link>
        <ul className={"uls"}>
          {dirs.map((x) => {
            if (x.path != currentRoute) {
              return (
                <li key={x.path} id={x.path}>
                  <Link href={x.path} onClick={changeInput}>
                    {x.name}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={x.path} id={x.path}>
                  <Link href={x.path} className={"active"}>
                    {x.name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
}
