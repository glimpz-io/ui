import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { getClient } from "@glimpzio/hooks/graphql";
import { gql } from "@apollo/client";
import { headers } from "next/headers";
import { AUTH_HEADER } from "@glimpzio/config";
import { Edit } from "../../../components/connections/custom/edit";
import { Delete } from "../../../components/connections/custom/delete";

interface Request {
    params: {
        connectionId: string;
    };
}

interface Data {
    customConnection: {
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
    };
}

export default async function Page(req: Request): Promise<JSX.Element> {
    const inviteId = req.params.connectionId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = await getClient(apiUrl, authToken);

    const query = gql`
        query GetCustomConnection($id: ID!) {
            customConnection(id: $id) {
                id
                userId
                email
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

    const { data: customConnection } = await client().query<Data>({ query, variables: { id: inviteId } });
    const data = customConnection.customConnection;

    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="title">
                Contact <Text type="highlight">Details</Text>
            </Text>
            <Edit {...data} />
            <Delete userId={data.userId} id={data.id} />
        </Container>
    );
}
