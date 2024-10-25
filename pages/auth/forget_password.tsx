import React, { FC, useState } from "react";
import { TextField } from "@mui/material";
import styles from "@/styles/auth.module.css";
import SendData from "@/components/send_data";
import { ResponseConfig } from "@/components/interfaces";

import { useRouter } from "next/router";
const ForgetPage: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
  });
  const router = useRouter();

  const [error, setError] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value) {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.email) {
      const response = (await SendData({
        data: userData,
        route: "/api/auth/reset_password",
      })) as ResponseConfig;

      setError(response.message);

      if (response.status == 200) {
        setTimeout(() => {
          router.push("/login");
          console.log("Redirecting to Homepage");
        }, 3000);
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
          <h1 className={styles.title}>Reset Password</h1>
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
              />
            </div>

            <div>
              <a className={styles.forget_password} href="/forget_password">
                Login Here !
              </a>
              <button>Create Reset Email</button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};

export default ForgetPage;
