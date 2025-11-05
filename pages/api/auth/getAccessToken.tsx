// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig } from "@/components/interfaces";
import { firestore } from "@/components/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { UserDataInterface } from "@/components/interfaces";
import { DummyUserData } from "@/components/interfaces";
import withMiddleware from "@/libs/cors";
import { createAccessToken, verifyRefreshToken } from "@/libs/jwt";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  try {
    const refreshToken = (req.body.refreshToken as string) || "";

    const cred = verifyRefreshToken(refreshToken);

    if (!cred) {
      res.status(300).json({
        message: "token not found",
        credentials: null,
      });
      return;
    }

    const userRef = doc(firestore, "users", cred.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      res.status(300).json({
        message: "user doesnt exist",
        credentials: null,
      });
      return;
    }
    const userData = userDoc.data() as UserDataInterface;
    res.status(200).json({
      message: "login success",
      credentials: userData,
      accessToken: createAccessToken(userData),
    });
  } catch (err) {
    console.log(err);

    res.status(300).json({
      message: "error caught",
      credentials: null,
    });
  }
}

export default withMiddleware(handler as any);
