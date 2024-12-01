import { NextApiRequest, NextApiResponse } from "next";

// lib/cors.js
const allowedOrigins = ['http://localhost:8081', 'http://localhost:3000',"https://minimal-blog-ivory.vercel.app"];
//const allowedOrigins = ["*"]

export function cors(req:NextApiRequest, res:NextApiResponse) {
  console.log(req.headers)
  const origin = req.headers.origin ||false;

  if (!origin) {
    console.log("Same-origin request detected, skipping CORS.");
    return false;
  }

  if (origin && allowedOrigins.includes(origin)) {
    console.log("origin allowed",origin)
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  } else {
    console.log("blocked for no access",origin)
    res.setHeader("Access-Control-Allow-Origin","null");
    res.status(403).json({ error: "Origin not allowed" });
    return true;
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests for complex requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}
