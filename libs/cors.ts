import { NextApiRequest, NextApiResponse } from "next";

// lib/cors.js
const allowedOrigins = ['http://localhost:8081', 'http://localhost:3000'];

export function cors(req:NextApiRequest, res:NextApiResponse) {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
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
