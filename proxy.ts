import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/pricing",
  "/services",
  "/get-started",
  "/thank-you",
  "/login",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
  "/api/auth",
  "/api/me",
  "/api/leads",
  "/api/create-checkout",
  "/api/webhooks",
  "/_next",
  "/favicon",
  "/robots",
  "/sitemap",
];

const PUBLIC_FILES =
  /^\/(logo\.png|apple-icon\.png|favicon\.ico|.*\.(png|jpe?g|gif|webp|svg|ico))$/i;

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_FILES.test(pathname)) return true;
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Protected: /dashboard, /admin
  const sessionCookie =
    request.cookies.get("better-auth.session_token")?.value ??
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|apple-icon.png).*)",
  ],
};
