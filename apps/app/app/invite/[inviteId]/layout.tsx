import { META_COLOR_APP, META_IMAGE_APP, META_URL_APP } from "@glimpzio/config";
import "@glimpzio/ui/styles.css";
import type { Metadata, Viewport } from "next";
import { GetInviteQuery, GetInviteQueryType, getClient } from "@glimpzio/utils";

interface Request {
    params: {
        inviteId: string;
    };
}

export async function generateMetadata(req: Request): Promise<Metadata> {
    const inviteId = req.params.inviteId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = getClient(apiUrl);

    const { data: invite } = await client().query<GetInviteQueryType>({ query: GetInviteQuery, variables: { id: inviteId } });
    const data = invite.invite;

    const userName = `${data.publicProfile.firstName} ${data.publicProfile.lastName}`;
    const userBio = data.publicProfile.bio;

    const title = `${userName} - Glimpz Profile`;
    const description = `${userBio}`;
    const url = `${META_URL_APP}/invite/${inviteId}`;

    return {
        metadataBase: new URL(META_URL_APP),
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: META_IMAGE_APP,
            url: url,
        },
    };
}

export const viewport: Viewport = {
    themeColor: META_COLOR_APP,
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
