import { ACCESS_TOKEN_COOKIE, AUTH_HEADER, ID_HEADER } from "@glimpzio/config";
import { GetUserQuery, GetUserType, getClientNoCache } from "@glimpzio/utils";
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

    const client = getClientNoCache(apiUrl, accessToken);

    let res: NextResponse;
    try {
        const { data } = await client.query<GetUserType>({ query: GetUserQuery });

        res = NextResponse.next();
        res.headers.set(ID_HEADER, data.user.id);
    } catch {
        if (req.nextUrl.pathname.startsWith("/profile")) res = NextResponse.next();
        else res = NextResponse.redirect(new URL(`/profile`, req.url));
    }

    res.headers.set(AUTH_HEADER, accessToken!);

    return res;
}

export const config = {
    matcher: ["/", "/connections", "/connections/custom/:connectionId*", "/profile"],
};
