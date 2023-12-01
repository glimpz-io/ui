import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { headers } from "next/headers";
import { AUTH_HEADER, ID_HEADER } from "@glimpzio/config";
import { Link } from "@glimpzio/ui/link";
import { Create } from "../components/connections/create";
import { GetCustomConnectionsQuery, GetCustomConnectionsType, getClient } from "@glimpzio/utils";

export default async function Page(): Promise<JSX.Element> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const header = headers();

    const authToken = header.get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const userId = header.get(ID_HEADER);
    if (!userId) throw Error("user id missing");

    const client = getClient(apiUrl, authToken);

    const { data } = await client().query<GetCustomConnectionsType>({ query: GetCustomConnectionsQuery });

    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="title">
                Your <Text type="highlight">Contacts</Text>
            </Text>
            <Create userId={userId} />
            {data.customConnections.length > 0 ? (
                <>
                    {data.customConnections.map((connection) => (
                        <Container key={connection.id} direction="vertical" className="bg-zinc-900 rounded-md">
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
                            <Link color="lightblue" size="large" href={`/connections/custom/${connection.id}`}>
                                View More
                            </Link>
                        </Container>
                    ))}
                </>
            ) : (
                <Text alignment="centre" type="small">
                    No connections.
                </Text>
            )}
        </Container>
    );
}
