import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@glimpzio/config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
    const cookie = cookies();

    cookie.set(ACCESS_TOKEN_COOKIE, "", { maxAge: 0 });
    cookie.set(REFRESH_TOKEN_COOKIE, "", { maxAge: 0 });

    return NextResponse.redirect(new URL("/auth/status?status=logout", req.url));
}
