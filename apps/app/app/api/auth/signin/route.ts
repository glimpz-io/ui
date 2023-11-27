import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const referrer = params.get("referrer");
    const _referrer = referrer ? referrer : "";

    const auth0Domain = process.env.AUTH0_DOMAIN;
    const auth0ClientId = process.env.AUTH0_CLIENT_ID;
    const auth0Audience = process.env.AUTH0_AUDIENCE;
    const auth0Redirect = process.env.AUTH0_REDIRECT;

    if (!auth0Domain || !auth0ClientId || !auth0Audience || !auth0Redirect) throw Error("missing auth0 variables");

    const authUrl = `https://${auth0Domain}/authorize?audience=${auth0Audience}&scope=offline_access&response_type=code&client_id=${auth0ClientId}&redirect_uri=${auth0Redirect}&state=${_referrer}`;

    return NextResponse.redirect(authUrl);
}
