// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthResponseConfig } from "@/components/interfaces";
import { firestore } from "@/components/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { UserDataInterface } from "@/components/interfaces";
import { DummyUserData } from "@/components/interfaces";
import cors from "@/libs/cors";




 async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  try {

   
    
    const userId = req.cookies["minimal_blog_uid"] || false;

    if (userId) {
      const userRef = doc(firestore, "users", userId);

      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserDataInterface;

        res.json({
          message: "login success",
          status: 200,
          credentials: userData,
        });
      }
    } else {
      res.json({
        message: "login failed",
        status: 300,
        credentials: DummyUserData,
      });
    }
  } catch (err) {
    console.log(err);

    res.json({
      message: "login failed",
      status: 300,
      credentials: DummyUserData,
    });
  }
}

export default cors(handler as any);
