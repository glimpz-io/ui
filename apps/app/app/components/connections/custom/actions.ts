"use server";

import { gql } from "@apollo/client";
import { AUTH_HEADER } from "@glimpzio/config";
import { getClient } from "@glimpzio/hooks/graphql";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteConnection(id: string | null) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = await getClient(apiUrl, authToken);

    const query = gql`
        mutation DeleteConnection($id: ID!) {
            deleteCustomConnection(id: $id) {
                id
            }
        }
    `;

    await client().mutate({
        mutation: query,
        variables: {
            id,
        },
    });

    redirect("/connections");
}
