import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { getClient } from "@glimpzio/hooks/graphql";
import { headers } from "next/headers";
import { AUTH_HEADER } from "@glimpzio/config";
import { gql } from "@apollo/client";
import { Index } from "./components";

interface Data {
    createInvite: {
        id: string;
        userId: string;
        expiresAt: number;
        publicProfile: {
            firstName: string;
            lastName: string;
        };
    };
}

export default async function Page(): Promise<JSX.Element> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = await getClient(apiUrl, authToken);

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

    const { data } = await client().mutate<Data>({ mutation: query });

    if (!data)
        return (
            <Container direction="vertical" size="half">
                <Text type="small" alignment="centre">
                    Failed to retrieve data.
                </Text>
            </Container>
        );

    return <Index {...data.createInvite} />;
}
