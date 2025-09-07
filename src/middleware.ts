import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "@/env";

export const config = {
    matcher: ["/dashboard/:path*", "/plans", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;
    console.log("tokens middleware",token);
    
    // Block private pages if not signed in
    if (
        !token &&
        (pathname.startsWith("/dashboard") || pathname.startsWith("/plans"))
    ) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Already logged in → no need for verify page
    if (token && pathname.startsWith("/verify")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
