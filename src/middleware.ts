import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  
  // Add header for standalone landing pages
  const isStandaloneLanding = pathname.includes("ketamine-meditation-journey-music-mobile-app");
  
  const response = NextResponse.next();
  
  if (isStandaloneLanding) {
    response.headers.set("x-standalone-landing", "true");
  }
  
  // Public routes - no authentication required
  const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/webhooks",
    "/ketamine-meditation-journey-music-mobile-app",
    "/hub",
    "/workflows",
    "/articles",
    "/docs",
  ];
  
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path + "/")
  );
  
  // Only protect non-public routes (for now, make most routes public)
  // TODO: Add authentication back to specific routes when ready
  // if (!isPublicPath) {
  //   await auth.protect();
  // }
  
  return response;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - but include webhooks
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
