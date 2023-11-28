import { ACCESS_TOKEN_COOKIE, AUTH_HEADER } from "@glimpzio/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const cookie = cookies();

    const accessTokenCookie = cookie.get(ACCESS_TOKEN_COOKIE);

    const accessToken = accessTokenCookie?.value;
    if (!accessToken) return NextResponse.redirect(new URL(`/api/auth/refresh?referer=${encodeURIComponent(req.url)}`, req.url));

    const res = NextResponse.next();

    res.headers.set(AUTH_HEADER, accessToken);

    return res;
}

export const config = {
    matcher: ["/", "/connections"],
};
