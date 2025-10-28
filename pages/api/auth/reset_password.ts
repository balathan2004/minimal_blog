// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/components/firebase/config";
import { FirebaseError } from "firebase/app";
import cors from "@/libs/cors";

const url =
  process.env.NODE_ENV == "production"
    ? `${process.env.DOMAIN_URL?.replace(/^"|"$/g, "")}/auth/change_password`
    : "http://localhost:3000/auth/change_password";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { email } = req.body;

    if (!email) {
      res.json({
        message: "Email not found",
      });
      return;
    }

    await sendPasswordResetEmail(auth, email);
    res.json({
      message: "Password reset email sent successfully",
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.log(err.message);
      res.json({
        message: err.message,
      });
    } else {
      console.log(err);

      res.json({
        message: "login failed",
      });
    }
  }
}

export default cors(handler as any);
