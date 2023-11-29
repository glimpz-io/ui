import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { getClient } from "@glimpzio/hooks/graphql";
import { cookies, headers } from "next/headers";
import { AUTH_HEADER, INVITE_ID_COOKIE } from "@glimpzio/config";
import { gql } from "@apollo/client";
import { Index } from "./components";

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

    const client = await getClient(apiUrl, authToken);

    let inviteData: Data | null | undefined;

    const inviteId = cookies().get(INVITE_ID_COOKIE);

    if (!inviteId) {
        const query = gql`
            mutation CreateInvite {
                createInvite {
                    id
                    userId
                    expiresAt
                    publicProfile {
                        firstName
                        lastName
                    }
                }
            }
        `;

        const { data } = await client().mutate<{ createInvite: Data }>({ mutation: query });
        inviteData = data?.createInvite;
    } else {
        const query = gql`
            query GetInvite($id: ID!) {
                invite(id: $id) {
                    id
                    userId
                    expiresAt
                    publicProfile {
                        firstName
                        lastName
                    }
                }
            }
        `;

        const { data } = await client().query<{ invite: Data }>({ query, variables: { id: inviteId.value } });
        inviteData = data.invite;
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
