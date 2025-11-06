// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig } from "@/components/interfaces";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/components/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { UserDataInterface } from "@/components/interfaces";
import cors from "@/libs/cors";
import { createBothToken } from "@/libs/jwt";
import { setCookie } from "cookies-next";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  try {
    const { email, password } = req.body;
    console.log("Login Request from ", { email });

    const isDevEnv = process.env.NODE_ENV == "production";

    if (!email || !password) {
      res.status(401).json({
        message: "fields missing",
        credentials: null,
      });
      return;
    }

    const fetchedUser = (
      await signInWithEmailAndPassword(auth, email, password)
    ).user;

    if (!fetchedUser.emailVerified) {
      res.status(304).json({
        message: "Youre Not Verified",
        credentials: null,
      });
      return;
    }

    const userRef = doc(firestore, "users", fetchedUser.uid);

    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      res.json({
        message: "User Not Found",
        credentials: null,
      });
      return;
    }

    const userData = userDoc.data() as UserDataInterface;

    setCookie("minimal_blog_uid", userData.uid, {
      req: req,
      res: res,
      maxAge: 2592000000,
      httpOnly: true,
      sameSite: isDevEnv ? "none" : "lax",
      secure: isDevEnv,
    });

    res.status(200).json({
      message: "login success",
      credentials: { ...userData },
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.log(err.message);
      res.status(404).json({
        message: err.message,
        credentials: null,
      });
    } else {
      console.log(err);

      res.status(400).json({
        message: "login failed",
        credentials: null,
      });
    }
  }
}

export default cors(handler as any);
