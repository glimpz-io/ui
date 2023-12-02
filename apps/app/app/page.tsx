import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { cookies, headers } from "next/headers";
import { AUTH_HEADER, INVITE_ID_COOKIE } from "@glimpzio/config";
import { CreateInviteQuery, CreateInviteType, GetInviteQuery, GetInviteType, getClient } from "@glimpzio/utils";
import dynamic from "next/dynamic";

const Index = dynamic(() => import("./components"), { ssr: false });

interface Data {
    id: string;
    userId: string;
    expiresAt: number;
    publicProfile: {
        firstName: string;
        lastName: string;
    };
}

export default async function Page(): Promise<JSX.Element> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = getClient(apiUrl, authToken);

    let inviteData: Data | null | undefined;

    const inviteId = cookies().get(INVITE_ID_COOKIE);

    if (!inviteId) {
        const { data } = await client().mutate<CreateInviteType>({ mutation: CreateInviteQuery });
        inviteData = data?.createInvite;
    } else {
        try {
            const { data } = await client().query<GetInviteType>({ query: GetInviteQuery, variables: { id: inviteId.value } });
            inviteData = data.invite;
        } catch {
            const { data } = await client().mutate<CreateInviteType>({ mutation: CreateInviteQuery });
            inviteData = data?.createInvite;
        }
    }

    if (!inviteData)
        return (
            <Container direction="vertical" size="half">
                <Text type="small" alignment="centre">
                    Failed to retrieve data.
                </Text>
            </Container>
        );

    return <Index {...inviteData} />;
}
