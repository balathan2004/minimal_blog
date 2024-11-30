import { NextApiRequest, NextApiResponse } from "next";

// lib/cors.js
const allowedOrigins = ['http://localhost:8081', 'http://localhost:3000'];
//const allowedOrigins = ["*"]

export function cors(req:NextApiRequest, res:NextApiResponse) {
  const origin = req.headers.origin;

  console.log("origin is ",origin)

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
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
