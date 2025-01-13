// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { generateFromEmail } from "unique-username-generator";
import { auth, firestore } from "@/components/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { setCookie } from "cookies-next";
import { UserDataInterface } from "@/components/interfaces";
import cors from "@/libs/cors";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      res.json({
        message: "field values missing",
        status: 300,
      });
      return;
    }
    const isSecure = process.env.NODE_ENV === "production" ? true : false;

    const username = generateFromEmail(email, 5);

    const userDoc =
      (await createUserWithEmailAndPassword(auth, email, password)).user ||
      null;

    const NewUserDoc: UserDataInterface = {
      uid: userDoc?.uid,
      email: userDoc?.email || "",
      display_name: username || "",
      created_at:
        userDoc.metadata.creationTime || new Date().getTime().toString(),
      profile_url: `https://ui-avatars.com/api/?name=${username}`,
    };

    const docRef = doc(firestore, "/users", NewUserDoc.uid);
    await setDoc(docRef, NewUserDoc);
    if (userDoc) {
      await sendEmailVerification(userDoc);
    }

    res.json({
      message: "Verification Mail sent to inbox",
      status: 200,
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.log(err.message);
      res.json({
        message: err.message,
        status: 300,
      });
    } else {
      console.log(err);

      res.json({
        message: "login failed",
        status: 300,
      });
    }
  }
}

export default cors(handler as any);
