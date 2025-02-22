import React, { FC, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/auth.module.css";
import SendData from "@/components/send_data";
import { ResponseConfig } from "@/components/interfaces";
import { useRouter } from "next/router";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/Reply_context";
import Link from "next/link";

const Register: FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { loading, setLoading } = useLoadingContext();
  const { setReply } = useReplyContext();

  const [error, setError] = useState("");
  const [passError, setPassError] = useState(false);

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
      setLoading(true);
      const response = (await SendData({
        data: userData,
        route: "/api/auth/register",
      })) as ResponseConfig;
      console.log("request sent");

      setReply(response.message);
      setLoading(false);
      setError(response.message);

      if (response.status == 200) {
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
        console.log("Account Created successful");
      } else {
        console.error("Failed to Create Account");
      }
    }
  };

  return (
    <div className="container">
      <div className="container_spacer"></div>
      <div className={styles.auth_container}>
        <article>
          <h1 className={styles.title}>Register</h1>
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
                // Error shown if length is less than 5
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
                helperText={
                  userData.password.length < 6
                    ? "Minimum 6 characters required"
                    : ""
                }
              />
            </div>
            <div>
              <Link className={styles.forget_password} href="/auth/login">
                Have An Account Login here !
              </Link>
             
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                     {loading ? "Registering" : "Register"}
              </Button>
            </div>
          </form>
        </article>
      </div>
      <div className="container_spacer"></div>
    </div>
  );
};

export default Register;
