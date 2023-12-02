import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { headers } from "next/headers";
import { AUTH_HEADER } from "@glimpzio/config";
import { GetCustomConnectionQuery, GetCustomConnectionType, getClient } from "@glimpzio/utils";
import dynamic from "next/dynamic";

const Edit = dynamic(() => import("../../../components/connections/custom/edit"), { ssr: false });
const Index = dynamic(() => import("../../../components/connections/custom/index"), { ssr: false });

interface Request {
    params: {
        connectionId: string;
    };
}

export default async function Page(req: Request): Promise<JSX.Element> {
    const inviteId = req.params.connectionId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = getClient(apiUrl, authToken);

    const { data: customConnection } = await client().query<GetCustomConnectionType>({ query: GetCustomConnectionQuery, variables: { id: inviteId } });
    const data = customConnection.customConnection;

    return (
        <Container direction="vertical" size="half">
            <Edit {...data} />
            {!data.firstName ? (
                <Text alignment="centre" type="title">
                    Contact <Text type="highlight">Details</Text>
                </Text>
            ) : (
                <Text alignment="centre" type="title">
                    {data.firstName} <Text type="highlight">{data.lastName}</Text>
                </Text>
            )}
            {data.notes && (
                <Text type="p" alignment="centre">
                    {data.notes}
                </Text>
            )}
            <Index {...data} />
        </Container>
    );
}
