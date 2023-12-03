"use server";

import { AUTH_HEADER } from "@glimpzio/config";
import { GetUploadQuery, GetUploadType, UpsertUserQuery, getClient } from "@glimpzio/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function uploadImage() {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = getClient(apiUrl, authToken);

    const { data } = await client().query<GetUploadType>({ query: GetUploadQuery });

    return data.upload;
}

export async function upsertUser(
    fieldFirstName: string,
    fieldLastName: string,
    fieldPersonalEmail: string,
    fieldBio: string,
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

    const client = getClient(apiUrl, authToken);

    const firstName = formData.get(fieldFirstName);
    const lastName = formData.get(fieldLastName);
    const personalEmail = formData.get(fieldPersonalEmail);
    const bio = formData.get(fieldBio);
    const email = formData.get(fieldProfileEmail);
    const phone = formData.get(fieldProfilePhone);
    const website = formData.get(fieldProfileWebsite);
    const linkedin = formData.get(fieldProfileLinkedIn);

    await client().mutate({
        mutation: UpsertUserQuery,
        variables: {
            firstName,
            lastName,
            personalEmail,
            bio,
            profilePicture: profilePictureUrl,
            email,
            phone,
            website,
            linkedin,
        },
    });

    revalidatePath("/profile");
}
