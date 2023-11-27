import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@glimpzio/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface Data {
    access_token: string;
    refresh_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const code = params.get("code");
    if (!code) throw Error("missing code");

    const state = params.get("state");

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const auth0Domain = process.env.AUTH0_DOMAIN;
    const auth0ClientId = process.env.AUTH0_CLIENT_ID;
    const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;
    const auth0Audience = process.env.AUTH0_AUDIENCE;
    const auth0Redirect = process.env.AUTH0_REDIRECT;

    if (!auth0Domain || !auth0ClientId || !auth0Audience || !auth0Redirect) throw Error("missing auth0 variables");

    const payload = `grant_type=authorization_code&client_id=${auth0ClientId}&client_secret=${auth0ClientSecret}&code=${code}&redirect_uri=${auth0Redirect}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload,
    };

    const response = await fetch(`https://${auth0Domain}/oauth/token`, options);

    if (!response.ok) throw new Error("failed to authorize");

    const token: Data = await response.json();

    const cookie = cookies();
    cookie.set(ACCESS_TOKEN_COOKIE, token.access_token, { maxAge: token.expires_in, secure: true, sameSite: "strict", httpOnly: true, path: "/" });
    cookie.set(REFRESH_TOKEN_COOKIE, token.refresh_token, { maxAge: Number.MAX_SAFE_INTEGER, secure: true, sameSite: "strict", httpOnly: true, path: "/" });

    if (state) redirect(decodeURI(state));
    else redirect("/");
}
