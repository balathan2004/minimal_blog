import React, { FC, useEffect, useState,useContext } from "react";
import { TextField } from "@mui/material";
import styles from "@/styles/auth.module.css";
import SendData from "@/components/send_data";
import { AuthResponseConfig } from "@/components/interfaces";
import { UserCredContext } from "../_app";
import { useRouter } from "next/router";
const SignIn: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router=useRouter()

  const { setUserCred } = useContext(UserCredContext);


  const [error, setError] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value) {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const noSpacesRegex = /^\S+$/;
    if (userData.password == "") {
      setError("");
    } else if (!noSpacesRegex.test(userData.password)) {
      setError("Password cannot contain spaces.");
    }
  }, [userData.password]);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.email.length > 5 && userData.password.length > 5 && !error) {
      const response = await SendData({
        data: userData,
        route: "/api/auth/login",
      }) as AuthResponseConfig

      setError(response.message);

      if (response.status == 200) {
        // Login successful
        setUserCred(response.credentials)
        console.log("Login successful");
        setTimeout(() => {
         // router.push("/")
          console.log("Redirecting to Homepage")
        },3000)
      } else {
        // Login failed
        console.error("Login failed");
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.auth_container}>
        <article>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.error}>{error}</p>
          <form onSubmit={handleForm}>
            <div>
              <label className={styles.placeholder}>Email</label>
              <TextField
                required
                className={styles.input}
                id="outlined-basic"
                label="Enter Email Address"
                variant="outlined"
                name="email"
                type="email"
                onChange={handleInput}
                // Error shown if length is less than 5
              />
            </div>
            <div>
              <label className={styles.placeholder}>Password</label>
              <TextField
                required
                className={styles.input}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                onChange={handleInput}
                helperText={
                  userData.password.length < 6
                    ? "Minimum 6 characters required"
                    : ""
                }
              />
            </div>
            <div>
              <a className={styles.forget_password} href="/forget_password">
                forget password ?
              </a>
              <button>Login</button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};

export default SignIn;
