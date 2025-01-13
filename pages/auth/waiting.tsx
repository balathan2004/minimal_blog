import Link from "next/link";
import styles from "@/styles/auth.module.css";
import { Button } from "@mui/material";

const WaitingForRegistration: React.FC = () => {
  return (
    <div className="container">
      <div className="container_spacer"></div>
      <div className={styles.auth_container}>
        <div className={styles.waiting_page}>
          <h1 className={styles.heading}>Registration Pending</h1>
          <p className={styles.message}>
            Thank you for registering! Please check your inbox to verify your
            email address.
          </p>
          <p className={styles.note}>
            Didn&apos;t receive the email?{" "}
            <strong>Check your spam folder</strong> or{" "}
            <strong>resend the verification email</strong>.
          </p>
          <Link href="/">
            <Button variant="outlined" fullWidth className={styles.button}>Back to Home</Button>
          </Link>
        </div>
      </div>
      <div className="container_spacer"></div>
    </div>
  );
};

export default WaitingForRegistration;
