import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export async function authenticateToken(req: NextApiRequest) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];
  return await verifyToken(token, req);
}

export async function verifyToken(token: string, req: NextApiRequest) {
  let jwtResponse: any = null;

  console.log(process.env.JWT_ACCESS_SECRET);

  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET || "",
    (err: any, user: any) => {
      if (err) {
        return null;
      } else {
        jwtResponse = user as any;
      }
    }
  );

  return jwtResponse;
}
