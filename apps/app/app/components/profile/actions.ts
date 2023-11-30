"use server";

import { gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { NextSSRApolloClient, NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";
import { AUTH_HEADER } from "@glimpzio/config";
import { getClient, getClientFile } from "@glimpzio/hooks/graphql";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function upsertUser(
    fieldFirstName: string,
    fieldLastName: string,
    fieldPersonalEmail: string,
    fieldBio: string,
    // fieldProfilePicture: string,
    fieldProfileEmail: string,
    fieldProfilePhone: string,
    fieldProfileWebsite: string,
    fieldProfileLinkedIn: string,
    formData: FormData,
    profilePictureUrl: string | null
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
    const profilePicture = profilePictureUrl;
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

interface ProfilePictureData {
    uploadProfilePicture: string;
}

export async function uploadProfilePicture(fieldFile: string, formData: FormData) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = await getClientFile(apiUrl, authToken);

    const query = gql`
        mutation UploadProfilePicture($file: Upload!) {
            uploadProfilePicture(file: $file)
        }
    `;

    const file = formData.get(fieldFile) as File;
    const { data } = await client().mutate<ProfilePictureData>({ mutation: query, variables: { file } });

    if (!data) throw Error("missing data");

    return data.uploadProfilePicture;
}
