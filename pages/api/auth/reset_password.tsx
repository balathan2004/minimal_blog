// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {  ResponseConfig } from "@/components/interfaces";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/components/firebase/config";
import { FirebaseError } from "firebase/app";
import cors from "@/libs/cors";



 async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {

    const { email } = req.body;

    if (email ) {
     
      await sendPasswordResetEmail(auth,email)
      res.json({
        message: "Password reset email sent successfully",
        status: 200,
      });
         
    }
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


export default cors(handler as any)