import { gql } from "@apollo/client";
import { ACCESS_TOKEN_COOKIE, AUTH_HEADER } from "@glimpzio/config";
import { getClientNoCache } from "@glimpzio/hooks";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const cookie = cookies();

    const accessTokenCookie = cookie.get(ACCESS_TOKEN_COOKIE);
    const accessToken = accessTokenCookie?.value;
    if (!accessToken) return NextResponse.redirect(new URL(`/api/auth/refresh?referer=${encodeURIComponent(req.url)}`, req.url));

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = await getClientNoCache(apiUrl, accessToken);

    const query = gql`
        query GetUser {
            user {
                id
            }
        }
    `;

    let res: NextResponse;
    try {
        await client.query({ query });

        if (req.nextUrl.pathname.startsWith("/profile/create")) res = NextResponse.redirect(new URL("/profile", req.url));
        else res = NextResponse.next();
    } catch {
        res = NextResponse.redirect(new URL(`/profile/create`, req.url));
    }

    res.headers.set(AUTH_HEADER, accessToken);

    return res;
}

export const config = {
    matcher: ["/", "/connections", "/connections/custom/:connectionId*", "/profile", "/profile/create"],
};
