"use server";

import { gql } from "@apollo/client";
import { AUTH_HEADER } from "@glimpzio/config";
import { getClientFile } from "@glimpzio/hooks/graphql";
import { headers } from "next/headers";

interface Data {
    uploadProfilePicture: string;
}

export async function upsertUserCreate(fieldProfilePicture: string, fieldProfilePictureUrl: string, formData: FormData) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const profilePicture = formData.get(fieldProfilePicture) as File;
    let profilePictureUrl = formData.get(fieldProfilePictureUrl);

    if (profilePicture.size) {
        const fileClient = await getClientFile(apiUrl, authToken);

        const fileQuery = gql`
            mutation ($file: Upload!) {
                uploadProfilePicture(file: $file)
            }
        `;

        const { data } = await fileClient().mutate<Data>({ mutation: fileQuery, variables: { file: profilePicture } });
        if (!data) throw Error("missing data");

        profilePictureUrl = data.uploadProfilePicture;
    }

    console.log(profilePictureUrl);
}
