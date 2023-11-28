"use server";

import { gql } from "@apollo/client";
import { AUTH_HEADER } from "@glimpzio/config";
import { getClient } from "@glimpzio/hooks/graphql";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createConnection(
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

    const client = await getClient(apiUrl, authToken);

    const query = gql`
        mutation UpsertConnection($firstName: String, $lastName: String, $email: String, $phone: String, $website: String, $linkedin: String, $notes: String) {
            upsertCustomConnection(customConnection: { firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, website: $website, linkedin: $linkedin, notes: $notes }) {
                id
                email
                firstName
                lastName
                notes
                phone
                website
                linkedin
            }
        }
    `;

    const firstName = formData.get(fieldFirstName);
    const lastName = formData.get(fieldLastName);
    const email = formData.get(fieldEmail);
    const phone = formData.get(fieldPhone);
    const website = formData.get(fieldWebsite);
    const linkedin = formData.get(fieldLinkedIn);
    const notes = formData.get(fieldNotes);

    await client().mutate({
        mutation: query,
        variables: {
            firstName,
            lastName,
            email,
            phone,
            website,
            linkedin,
            notes,
        },
    });

    revalidatePath("/connections");
}
