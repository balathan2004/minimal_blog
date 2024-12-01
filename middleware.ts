import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:8081",
  "https://minimal-blog-ivory.vercel.app"
];

const middleware = (request: NextRequest) => {
  const { headers, method, cookies, nextUrl } = request;

  const clientType = cookies.get("minimal_blog_uid")?.value;

  // Handle API routes with CORS
  if (nextUrl.pathname.startsWith("/api")) {
    const origin = headers.get("origin");

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      const response = NextResponse.next();
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      // Handle preflight (OPTIONS) requests
      if (method === "OPTIONS") {
        response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours
        return new Response(null, { status: 204, headers: response.headers });
      }

      return response;
    }

    // If origin is not allowed, block the request
    return new Response("Origin not allowed by CORS", { status: 403 });
  }

  // Redirect logic for /create_post route
  if (nextUrl.pathname.includes("/create_post") && !clientType) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default: Allow other requests
  return NextResponse.next();
};

export default middleware;
