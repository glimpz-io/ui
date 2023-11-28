import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { getClient } from "@glimpzio/hooks/graphql";
import { gql } from "@apollo/client";
import { headers } from "next/headers";
import { AUTH_HEADER } from "@glimpzio/config";
import { Edit } from "../components/profile/edit";

interface Data {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        bio: string;
        profilePicture: string | null;
        profile: {
            email: string | null;
            phone: string | null;
            website: string | null;
            linkedin: string | null;
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
        query GetUser {
            user {
                id
                firstName
                lastName
                email
                bio
                profilePicture
                profile {
                    email
                    phone
                    website
                    linkedin
                }
            }
        }
    `;

    const { data: customConnection } = await client().query<Data>({ query });
    const data = customConnection.user;

    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="title">
                Profile <Text type="highlight">Details</Text>
            </Text>
            <Edit {...data} />
        </Container>
    );
}
