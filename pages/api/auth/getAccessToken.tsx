// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig } from "@/components/interfaces";
import { firestore } from "@/components/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { UserDataInterface } from "@/components/interfaces";
import { DummyUserData } from "@/components/interfaces";
import withMiddleware from "@/libs/cors";
import { verifyRefreshToken } from "@/libs/jwt";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  try {
    const refreshToken = (req.body.refreshToken as string) || "";

    console.log({ refreshToken });

    const cred = verifyRefreshToken(refreshToken);

    console.log({ cred });

    if (!cred) return;

    const userRef = doc(firestore, "users", cred.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      res.json({
        message: "login failed",

        credentials: DummyUserData,
      });
      return;
    }
    const userData = userDoc.data() as UserDataInterface;
    res.json({
      message: "login success",

      credentials: userData,
    });
  } catch (err) {
    console.log(err);

    res.json({
      message: "login failed",

      credentials: null,
    });
  }
}

export default withMiddleware(handler as any);
