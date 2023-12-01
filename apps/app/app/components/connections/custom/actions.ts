"use server";

import { AUTH_HEADER } from "@glimpzio/config";
import { DeleteConnectionQuery, getClient } from "@glimpzio/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteConnection(id: string | null) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = getClient(apiUrl, authToken);

    await client().mutate({
        mutation: DeleteConnectionQuery,
        variables: {
            id,
        },
    });

    redirect("/connections");
}
