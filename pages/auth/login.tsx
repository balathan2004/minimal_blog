import React, { FC, useEffect, useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/auth.module.css";
import SendData from "@/components/send_data";
import { AuthResponseConfig } from "@/components/interfaces";
import { useRouter } from "next/router";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/Reply_context";
import Link from "next/link";
import { useLoginMutation } from "@/components/redux/api/authApi";
const SignIn: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const { setReply } = useReplyContext();
  const [error, setError] = useState("");
  const [passError, setPassError] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

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
      setPassError(false);
    } else if (!noSpacesRegex.test(userData.password)) {
      setError("Password cannot contain spaces.");
      setPassError(true);
    }
  }, [userData.password]);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      userData.email.length > 5 &&
      userData.password.length > 5 &&
      !passError
    ) {
      const response = await login(userData).unwrap();
      setReply(response.message);

      setError(response.message);

      if (response) {
        setTimeout(() => {
          router.push("/blog");
          console.log("Redirecting to Homepage");
        }, 1000);
      } else {
        // Login failed
        console.error("Login failed");
      }
    }
  };

  return (
    <div className="container">
      <div className="container_spacer"></div>
      <div className={styles.auth_container}>
        <article>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.error}>{error}</p>
          <form onSubmit={handleForm}>
            <div>
              <label className={styles.placeholder}>Email</label>
              <TextField
                fullWidth
                required
                className={styles.input}
                id="outlined-basic"
                placeholder="Enter Email Address"
                variant="outlined"
                name="email"
                type="email"
                onChange={handleInput}
              />
            </div>
            <div>
              <label className={styles.placeholder}>Password</label>
              <TextField
                fullWidth
                required
                className={styles.input}
                id="outlined-basic"
                placeholder="Password"
                variant="outlined"
                name="password"
                onChange={handleInput}
              />
            </div>
            <div>
              <Link className={styles.forget_password} href="/auth/register">
                or create an account
              </Link>
              <Link
                className={styles.forget_password}
                href="/auth/forget_password"
              >
                forget password ?
              </Link>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in" : "Login"}
              </Button>
            </div>
          </form>
        </article>
      </div>
      <div className="container_spacer"></div>
    </div>
  );
};

export default SignIn;
