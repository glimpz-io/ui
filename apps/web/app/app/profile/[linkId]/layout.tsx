import { META_COLOR, META_IMAGE, META_URL } from "@glimpz-io/config";
import "@glimpz-io/ui/styles.css";
import type { Metadata } from "next";

import { gql } from "@apollo/client";
import { getClient } from "@glimpz-io/hooks/graphql";

interface Request {
    params: {
        linkId: string;
    };
}

export async function generateMetadata(req: Request): Promise<Metadata> {
    const linkId = req.params.linkId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = getClient(apiUrl);

    const query = gql`
        query GetLink($id: ID!) {
            link(id: $id) {
                publicProfile {
                    name
                    bio
                }
            }
        }
    `;

    const { data } = await client().query({ query, variables: { id: linkId } });

    const userName = data.link.publicProfile.name;
    const userBio = data.link.publicProfile.bio;

    const title = `${userName} - Glimpz`;
    const description = `${userBio}`;
    const url = `${META_URL}/app/profile/${linkId}`;

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
