import React, { FC, useState } from "react";
import { TextField } from "@mui/material";
import styles from "@/styles/auth.module.css";
import SendData from "@/components/send_data";
import { ResponseConfig } from "@/components/interfaces";
import { useReplyContext } from "@/components/context/Reply_context";
import { useLoadingContext } from "@/components/context/loading_context";
import { useRouter } from "next/router";
import Link from "next/link";
const ForgetPage: FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { setReply } = useReplyContext();
  const { setLoading } = useLoadingContext();

  const [error, setError] = useState("");

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setReply("Email is Missing");
      return;
    }

    setLoading(true)

    const response = (await SendData({
      data: { email },
      route: "/api/auth/reset_password",
    })) as ResponseConfig;

    setError(response.message);
    setReply(response.message);
    setLoading(false)
    if (response.status == 200) {
      setTimeout(() => {
        router.push("/auth/login");
        console.log("Redirecting to Homepage");
      }, 3000);
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="container_spacer"></div>
      <div className={styles.auth_container}>
        <article>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.error}>{error}</p>
          <form onSubmit={handleForm}>
            <div>
              <label className={styles.placeholder}>Email</label>
              <TextField
                fullWidth
                required
                className={styles.input}
                id="outlined-basic"
                label="Enter Email Address"
                variant="outlined"
                name="email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <Link className={styles.forget_password} href="/auth/login">
                Login Here !
              </Link>
              <button>Create Reset Email</button>
            </div>
          </form>
        </article>
      </div>
      <div className="container_spacer"></div>
    </div>
  );
};

export default ForgetPage;
