"use server";

import { ConnectQuery, getClient } from "@glimpzio/utils";

export async function submitEmail(fieldEmail: string, fieldName: string, fieldSubscribe: string, formData: FormData, inviteId: string) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = getClient(apiUrl);

    const email = formData.get(fieldEmail);
    const name = formData.get(fieldName);
    const rawSubscribe = formData.get(fieldSubscribe);

    let firstName: string | null = null;
    let lastName: string | null = null;

    const firstLastName = name?.toString();

    if (firstLastName) {
        const split = firstLastName.split(" ");
        firstName = split[0];

        if (split.length > 1) lastName = split.slice(1).join(" ");
    }

    let subscribe: boolean;
    if (rawSubscribe === "on") subscribe = true;
    else subscribe = false;

    await client().mutate({
        mutation: ConnectQuery,
        variables: {
            inviteId,
            email,
            firstName,
            lastName,
            subscribe,
        },
    });
}
