import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { getClient } from "@glimpzio/hooks/graphql";
import { headers } from "next/headers";
import { AUTH_HEADER } from "@glimpzio/config";
import { gql } from "@apollo/client";
import { Link } from "@glimpzio/ui/link";
import { Create } from "../components/connections/create";

interface Data {
    customConnections: {
        id: string;
        userId: string;
        connectedAt: number;
        firstName: string | null;
        lastName: string | null;
        notes: string | null;
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    }[];
}

export default async function Page(): Promise<JSX.Element> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = await getClient(apiUrl, authToken);

    const query = gql`
        query GetCustomConnections {
            customConnections {
                id
                userId
                connectedAt
                firstName
                lastName
                notes
                email
                phone
                website
                linkedin
            }
        }
    `;

    const { data } = await client().query<Data>({ query });

    if (!data)
        return (
            <Container direction="vertical" size="half">
                <Text type="small" alignment="centre">
                    Failed to retrieve data.
                </Text>
            </Container>
        );

    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="title">
                Your <Text type="highlight">Contacts</Text>
            </Text>
            <Create />
            {data.customConnections.map((connection) => (
                <Container direction="vertical" className="bg-zinc-900 rounded-md">
                    <Container pad={false}>
                        <Text type="small">{connection.email}</Text>
                    </Container>
                    <Container direction="horizontal" pad={false}>
                        <Text type="p">
                            <Text type="bold">
                                {connection.firstName} {connection.lastName}
                            </Text>
                        </Text>
                        <Text type="small" alignment="right">
                            Connected on <Text type="bold">{new Date(connection.connectedAt * 1000).toDateString()}</Text>
                        </Text>
                    </Container>
                    <Link color="lightblue" size="large" href={`/connections/${connection.id}`}>
                        View More
                    </Link>
                </Container>
            ))}
        </Container>
    );
}
