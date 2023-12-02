"use server";

import { AUTH_HEADER } from "@glimpzio/config";
import { DeleteConnectionQuery, UpsertConnectionQuery, getClient } from "@glimpzio/utils";
import { revalidatePath } from "next/cache";
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

export async function upsertCustomConnection(
    id: string,
    fieldFirstName: string,
    fieldLastName: string,
    fieldEmail: string,
    fieldPhone: string,
    fieldWebsite: string,
    fieldLinkedIn: string,
    fieldNotes: string,
    formData: FormData
) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = getClient(apiUrl, authToken);

    const firstName = formData.get(fieldFirstName);
    const lastName = formData.get(fieldLastName);
    const email = formData.get(fieldEmail);
    const phone = formData.get(fieldPhone);
    const website = formData.get(fieldWebsite);
    const linkedin = formData.get(fieldLinkedIn);
    const notes = formData.get(fieldNotes);

    await client().mutate({
        mutation: UpsertConnectionQuery,
        variables: {
            id,
            firstName,
            lastName,
            email,
            phone,
            website,
            linkedin,
            notes,
        },
    });

    revalidatePath(`/connections/custom/${id}`);
}
