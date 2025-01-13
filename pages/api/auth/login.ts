// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig } from "@/components/interfaces";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/components/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { setCookie } from "cookies-next";
import { UserDataInterface } from "@/components/interfaces";
import { DummyUserData } from "@/components/interfaces";
import cors from "@/libs/cors";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  try {
    const { email, password } = req.body;
    console.log(email);
    const isSecure = process.env.NODE_ENV === "production";

    if (!email || !password) {
      res.json({
        message: "fields missing",
        status: 300,
        credentials: DummyUserData,
      });
      return;
    }

    const fetchedUser = (
      await signInWithEmailAndPassword(auth, email, password)
    ).user;

    if (!fetchedUser.emailVerified) {
      res.json({
        message: "Youre Not Verified",
        status: 300,
        credentials: DummyUserData,
      });
      return;
    }

    const userRef = doc(firestore, "users", fetchedUser.uid);

    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      res.json({
        message: "User Not Found",
        status: 300,
        credentials: DummyUserData,
      });
      return;
    }

    const userData = userDoc.data() as UserDataInterface;
    setCookie("minimal_blog_uid", userData.uid, {
      req,
      res,
      maxAge: 900000,
      httpOnly: true,
      sameSite: "none",
      secure: isSecure,
    });
    res.json({
      message: "login success",
      status: 200,
      credentials: userData,
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.log(err.message);
      res.json({
        message: err.message,
        status: 300,
        credentials: DummyUserData,
      });
    } else {
      console.log(err);

      res.json({
        message: "login failed",
        status: 300,
        credentials: DummyUserData,
      });
    }
  }
}

export default cors(handler as any);
