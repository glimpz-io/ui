import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@glimpzio/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const cookie = cookies();
    cookie.set(ACCESS_TOKEN_COOKIE, "", { expires: 0 });
    cookie.set(REFRESH_TOKEN_COOKIE, "", { expires: 0 });

    redirect("/");
}
