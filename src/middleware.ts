import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
    matcher: ["/dashboard/:path*", "/plans", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

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
