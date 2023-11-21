"use server";

import { gql } from "@apollo/client";
import { getClient } from "@glimpzio/hooks/graphql";

export async function submitEmail(fieldNameEmail: string, fieldNameSubscribe: string, formData: FormData, inviteId: string) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = await getClient(apiUrl);

    const query = gql`
        mutation ConnectByEmail($inviteId: ID!, $email: String!, $subscribe: Boolean!) {
            connectByEmail(inviteId: $inviteId, email: $email, subscribe: $subscribe) {
                id
            }
        }
    `;

    const email = formData.get(fieldNameEmail);
    const rawSubscribe = formData.get(fieldNameSubscribe);

    let subscribe: boolean;
    if (rawSubscribe === "on") subscribe = true;
    else subscribe = false;

    await client().mutate({
        mutation: query,
        variables: {
            inviteId,
            email,
            subscribe,
        },
    });
}
