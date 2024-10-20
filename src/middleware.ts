import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "./path";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.has("token");

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log({ isLoggedIn });

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/", "/dashboard", "/auth/login", "/auth/register"],
};
