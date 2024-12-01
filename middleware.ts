import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const { cookies, nextUrl } = request;

  const clientType = cookies.get("minimal_blog_uid")?.value;


  if (nextUrl.pathname.includes("/api")) {
    return NextResponse.next();
  }

  if (nextUrl.pathname.includes("/create_post") && !clientType) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export default middleware;
