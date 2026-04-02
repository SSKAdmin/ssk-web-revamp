import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./lib/i18n";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

// Ensure the JWT secret string matches the one used in `lib/security/jwt.ts`
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-development-only";
const encodedAdminKey = new TextEncoder().encode(ADMIN_JWT_SECRET);

// 1. Define Role-Based Access Control (RBAC)
const PROTECTED_ROUTES = {
  admin: ["/dashboard", "/cms", "/documents"],
  director: ["/dashboard", "/documents"],
  manager: ["/dashboard"],
  viewer: ["/dashboard"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. Handle Locale Redirects
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Intercept Cloudflare/Ngrok proxy headers to preserve the public URL
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    
    if (forwardedHost) {
      redirectUrl.host = forwardedHost;
      redirectUrl.port = "";
    }
    if (forwardedProto) {
      redirectUrl.protocol = `${forwardedProto}:`;
    }
    
    return NextResponse.redirect(redirectUrl);
  }

  // 3. Extract Locale and Base Path
  const segments = pathname.split("/");
  const locale = segments[1];
  const basePath = "/" + segments.slice(2).join("/");

  // 4. Custom JWT Enforcement for the newly replicated SSK Admin Portal and API Admin endpoints
  if ((basePath.startsWith("/ssk-admin-portal") && !basePath.startsWith("/ssk-admin-portal/login")) || basePath.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get("ssk_admin_session")?.value;
    
    if (!sessionCookie) {
      if (basePath.startsWith("/api/admin")) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized access" }), { status: 401, headers: { 'content-type': 'application/json' } });
      }
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${locale}/ssk-admin-portal/login`;
      return NextResponse.redirect(loginUrl);
    }
    
    try {
      const { payload } = await jwtVerify(sessionCookie, encodedAdminKey, {
        algorithms: ["HS256"],
      });
      
      if (payload.role !== "admin" && payload.role !== "super_admin") {
        return new NextResponse(JSON.stringify({ error: "High-level clearance required." }), { status: 403, headers: { 'content-type': 'application/json' } });
      }
      
      return NextResponse.next();
    } catch (e) {
       if (basePath.startsWith("/api/admin")) {
         return new NextResponse(JSON.stringify({ error: "Session invalid or expired" }), { status: 401, headers: { 'content-type': 'application/json' } });
       }
       const loginUrl = request.nextUrl.clone();
       loginUrl.pathname = `/${locale}/ssk-admin-portal/login`;
       return NextResponse.redirect(loginUrl);
    }
  }

  // 5. Security Enforcement for Dashboard/Protected Routes (Legacy/NextAuth)
  const allProtectedPaths = Object.values(PROTECTED_ROUTES).flat();
  const isProtectedPath = allProtectedPaths.some(path => basePath.startsWith(path));

  if (isProtectedPath) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Not authenticated
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${locale}/login`;
      loginUrl.searchParams.set("callbackUrl", pathname);
      
      if (forwardedHost) {
        loginUrl.host = forwardedHost;
        loginUrl.port = "";
      }
      if (forwardedProto) {
        loginUrl.protocol = `${forwardedProto}:`;
      }
      
      return NextResponse.redirect(loginUrl);
    }

    // Role-based authorization check
    const userRole = (token.role as keyof typeof PROTECTED_ROUTES) || "viewer";
    const allowedPaths = PROTECTED_ROUTES[userRole] || PROTECTED_ROUTES.viewer;
    
    const isAuthorized = allowedPaths.some(path => basePath.startsWith(path));

    if (!isAuthorized) {
      // Redirect unauthorized users to their default dashboard
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = `/${locale}/dashboard`;
      
      if (forwardedHost) {
        dashboardUrl.host = forwardedHost;
        dashboardUrl.port = "";
      }
      if (forwardedProto) {
        dashboardUrl.protocol = `${forwardedProto}:`;
      }

      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|brand_assets|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|woff2)).*)"],
};
