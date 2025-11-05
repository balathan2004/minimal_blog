import { UserDataInterface } from "@/components/interfaces";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const verifyAccessToken = (req: NextRequest) => {
  const token = req.headers.authorization as string;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (err) {
    return null;
  }
};

export const verifyRefreshToken = ( token: string) => {
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as UserDataInterface;

  } catch (err) {
    return null;
  }
};

export const createAccessToken = (userData: UserDataInterface) => {
  return jwt.sign(userData, JWT_ACCESS_SECRET, { expiresIn: "10d" });
};

export const createBothToken = (userData: UserDataInterface) => {
  return {
    accessToken: jwt.sign(userData, JWT_ACCESS_SECRET, { expiresIn: "1d" }),
    refreshToken: jwt.sign(userData, JWT_REFRESH_SECRET, { expiresIn: "30d" }),
  };
};
