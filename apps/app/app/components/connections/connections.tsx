"use client";

import { Container, Link, Text } from "@glimpzio/ui";
import { GetCustomConnectionsType } from "@glimpzio/utils";

interface ConnectionsProps {
    connections: GetCustomConnectionsType["customConnections"];
}

export default function Connections(props: ConnectionsProps): JSX.Element {
    if (props.connections.length === 0)
        return (
            <Text alignment="centre" type="small">
                No connections.
            </Text>
        );

    return (
        <Container direction="vertical" pad={false}>
            {props.connections.map((connection) => (
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
        </Container>
    );
}
