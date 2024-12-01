import { NextApiRequest, NextApiResponse } from "next";

// lib/cors.js
const allowedOrigins = ['http://localhost:8081', 'http://localhost:3000'];
const APITOKEN = "light@blog2406";

export function cors(req: NextApiRequest, res: NextApiResponse): boolean {
  const origin = req.headers.origin || false;
  const appKey = req.headers["minimal-access-token"] || false;

  // Handle preflight requests (CORS preflight check)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, minimal-access-token");
    res.status(200).end();
    return true; // Successfully handled the CORS preflight, so return true
  }

  // If origin is not provided, assume it's a same-origin request and skip CORS.
  if (!origin) {
    console.log("Same-origin request detected, skipping CORS.");
    return false; // No need to handle CORS for same-origin requests
  }

  // If the app key is correct, allow the request regardless of the origin
  if (appKey === APITOKEN) {
    console.log("API token is valid. Allowing request from origin:", origin);
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, minimal-access-token");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return true; // CORS handled successfully with valid API token
  }

  // If the origin is in the allowedOrigins list, allow the request
  if (allowedOrigins.includes(origin)) {
    console.log("Origin allowed:", origin);
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, minimal-access-token");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return true; // CORS handled successfully for allowed origin
  }

  // If the origin is not allowed and the API token is not valid, block the request
  console.log("Blocked for no access:", origin);
  res.setHeader("Access-Control-Allow-Origin", "null");
  res.status(403).json({ error: "Origin not allowed" });
  return true; // CORS failed, but the request has been handled (blocked)
}
