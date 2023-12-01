"use server";

import { ConnectByEmailQuery, getClient } from "@glimpzio/utils";

export async function submitEmail(fieldNameEmail: string, fieldNameSubscribe: string, formData: FormData, inviteId: string) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = getClient(apiUrl);

    const email = formData.get(fieldNameEmail);
    const rawSubscribe = formData.get(fieldNameSubscribe);

    let subscribe: boolean;
    if (rawSubscribe === "on") subscribe = true;
    else subscribe = false;

    await client().mutate({
        mutation: ConnectByEmailQuery,
        variables: {
            inviteId,
            email,
            subscribe,
        },
    });
}
