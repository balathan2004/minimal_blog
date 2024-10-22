// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig, ResponseConfig } from "@/components/interfaces";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, firestore } from "@/components/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { setCookie } from "cookies-next";
import { UserDataInterface } from "@/components/interfaces";
import { DummyUserData } from "@/components/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (email && password) {
      const userId =
        (await signInWithEmailAndPassword(auth, email, password)).user.uid ||
        null;

      if (userId) {
        const userRef = doc(firestore, "users", userId);

        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserDataInterface;
          setCookie("minimal_blog_uid", userData.uid, {
            req,
            res,
            maxAge: 900000,
            httpOnly: false,
            sameSite: "none",
          });
          res.json({
            message: "login success",
            status: 200,
            credentials: userData,
          });
        }
      }
    } else {
      res.json({
        message: "login failed",
        status: 300,
        credentials: DummyUserData,
      });
    }
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
