import React, { FC, useEffect, useState ,useContext} from "react";
import { TextField } from "@mui/material";
import styles from "@/styles/auth.module.css";
import SendData from "@/components/send_data";
import { AuthResponseConfig } from "@/components/interfaces";
import { UserCredContext } from "../_app";
import { ForUsers } from "@/components/navbar";
import { NavbarContext } from "../_app";
import { useRouter } from "next/router";
import Link from "next/link";


const Register: FC = () => {
  const router=useRouter()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setUserCred } = useContext(UserCredContext);
  const {setDirs}=useContext(NavbarContext)



  const [error, setError] = useState("");
  const [passError,setPassError] = useState(false)

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
      setPassError(false)
    } else if (!noSpacesRegex.test(userData.password)) {
      setError("Password cannot contain spaces.");
      setPassError(true)
    }
  }, [userData.password]);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.email.length > 5 && userData.password.length > 5 && !passError) {
      const response = await SendData({
        data: userData,
        route: "/api/auth/register",
      }) as AuthResponseConfig
      console.log("request sent")

      setError(response.message);

      if (response.status == 200) {
        setUserCred(response.credentials)
        setDirs(ForUsers)
        // Login successful
        setTimeout(() => {
          router.push("/blog")
          console.log("Redirecting to Homepage")
        },3000)
        console.log("Account Created successful");
      } else {
        // Login failed
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
              <Link className={styles.forget_password} href="/auth/login">
                Have An Account Login here !
              </Link>
              <button>Register</button>
            </div>
          </form>
        </article>
      </div>
      <div className="container_spacer"></div>
    </div>
  );
};

export default Register;
