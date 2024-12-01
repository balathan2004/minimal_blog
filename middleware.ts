import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:8081",
  "https://minimal-blog-ivory.vercel.app",
];

const middleware = (request: NextRequest) => {
  const { cookies, nextUrl } = request;

  const clientType = cookies.get("minimal_blog_uid")?.value;

  // Handle API routes with CORS
  if (nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect logic for /create_post route
  if (nextUrl.pathname.includes("/create_post") && !clientType) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default: Allow other requests
  return NextResponse.next();
};

export const config = {
  matcher: ["/api/:path*", "/create_post"],
};

export default middleware;
