"use server";

import { gql } from "@apollo/client";
import { AUTH_HEADER } from "@glimpzio/config";
import { getClient } from "@glimpzio/hooks/graphql";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function upsertUser(
    fieldFirstName: string,
    fieldLastName: string,
    fieldPersonalEmail: string,
    fieldBio: string,
    fieldProfilePicture: string,
    fieldProfileEmail: string,
    fieldProfilePhone: string,
    fieldProfileWebsite: string,
    fieldProfileLinkedIn: string,
    formData: FormData
) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = await getClient(apiUrl, authToken);

    const query = gql`
        mutation UpsertUser(
            $firstName: String!
            $lastName: String!
            $personalEmail: String!
            $bio: String!
            $profilePicture: String
            $email: String
            $phone: String
            $website: String
            $linkedin: String
        ) {
            upsertUser(
                input: {
                    firstName: $firstName
                    lastName: $lastName
                    email: $personalEmail
                    bio: $bio
                    profilePicture: $profilePicture
                    profile: { email: $email, phone: $phone, website: $website, linkedin: $linkedin }
                }
            ) {
                id
            }
        }
    `;

    const firstName = formData.get(fieldFirstName);
    const lastName = formData.get(fieldLastName);
    const personalEmail = formData.get(fieldPersonalEmail);
    const bio = formData.get(fieldBio);
    const profilePicture = formData.get(fieldProfilePicture);
    const email = formData.get(fieldProfileEmail);
    const phone = formData.get(fieldProfilePhone);
    const website = formData.get(fieldProfileWebsite);
    const linkedin = formData.get(fieldProfileLinkedIn);

    await client().mutate({
        mutation: query,
        variables: {
            firstName,
            lastName,
            personalEmail,
            bio,
            profilePicture,
            email,
            phone,
            website,
            linkedin,
        },
    });

    revalidatePath("/profile");
}
