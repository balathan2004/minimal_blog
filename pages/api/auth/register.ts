// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  AuthResponseConfig,
  DummyUserData,
  
} from "@/components/interfaces";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { generateFromEmail } from "unique-username-generator";
import { auth, firestore } from "@/components/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { setCookie } from "cookies-next";
import { UserDataInterface } from "@/components/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (email && password) {
      const username = generateFromEmail(email, 5);

      const UserDoc =
        (await createUserWithEmailAndPassword(auth, email, password)).user ||
        null;

      const NewUserDoc: UserDataInterface = {
        uid: UserDoc?.uid,
        email: UserDoc?.email || "",
        display_name: username || "",
        created_at:
          UserDoc.metadata.creationTime || new Date().getTime().toString(),
        profile_url: `https://ui-avatars.com/api/?name=${username}`,
      };

      const docRef = doc(firestore, "/users", NewUserDoc.uid);
      await setDoc(docRef, NewUserDoc);
      setCookie("minimal_blog_uid", NewUserDoc.uid, {
        req,
        res,
        maxAge: 900000,
        httpOnly: false,
        sameSite: "none",
        secure: true,
      });

      res.json({
        message: "login success",
        status: 200,
        credentials: NewUserDoc,
      });
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
