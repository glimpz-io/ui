import { META_COLOR, META_IMAGE, META_URL } from "@glimpzio/config";
import "@glimpzio/ui/styles.css";
import type { Metadata } from "next";

import { gql } from "@apollo/client";
import { getClient } from "@glimpzio/hooks/graphql";

interface Request {
    params: {
        inviteId: string;
    };
}

interface Data {
    invite: { publicProfile: { firstName: string; lastName: string; bio: string } };
}

export async function generateMetadata(req: Request): Promise<Metadata> {
    const inviteId = req.params.inviteId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = await getClient(apiUrl);

    const query = gql`
        query GetInvite($id: ID!) {
            invite(id: $id) {
                publicProfile {
                    firstName
                    lastName
                    bio
                }
            }
        }
    `;

    const { data: invite } = await client().query<Data>({ query, variables: { id: inviteId } });
    const data = invite.invite;

    const userName = `${data.publicProfile.firstName} ${data.publicProfile.lastName}`;
    const userBio = data.publicProfile.bio;

    const title = `${userName} - Glimpz Profile`;
    const description = `${userBio}`;
    const url = `${META_URL}/app/profile/${inviteId}`;

    return {
        metadataBase: new URL(META_URL),
        title: title,
        description: description,
        themeColor: META_COLOR,
        openGraph: {
            title: title,
            description: description,
            images: META_IMAGE,
            url: url,
        },
    };
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <div style={{ minWidth: 480 }}>{children}</div>;
}
