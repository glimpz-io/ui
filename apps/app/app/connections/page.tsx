import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { headers } from "next/headers";
import { AUTH_HEADER, ID_HEADER, PAGE_SIZE } from "@glimpzio/config";
import { GetCustomConnectionsQuery, GetCustomConnectionsType, getClient } from "@glimpzio/utils";
import dynamic from "next/dynamic";

const Create = dynamic(() => import("../components/connections/create"), { ssr: false });
const Connections = dynamic(() => import("../components/connections/connections"), { ssr: false });
const Navigate = dynamic(() => import("../components/connections/navigate"), { ssr: false });

interface Request {
    searchParams: {
        page?: "success" | "logout";
        pageSize?: string;
    };
}

export default async function Page(req: Request): Promise<JSX.Element> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const header = headers();

    const authToken = header.get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const userId = header.get(ID_HEADER);
    if (!userId) throw Error("user id missing");

    const client = getClient(apiUrl, authToken);

    let page: number = 1;
    let pageSize: number = PAGE_SIZE;
    if (req.searchParams.page) page = Math.max(1, parseInt(req.searchParams.page));
    if (req.searchParams.pageSize) pageSize = parseInt(req.searchParams.pageSize);

    const { data } = await client().query<GetCustomConnectionsType>({ query: GetCustomConnectionsQuery, variables: { limit: PAGE_SIZE, offset: (page - 1) * pageSize } });

    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="title">
                Your <Text type="highlight">Contacts</Text>
            </Text>
            <Create userId={userId} />
            <Connections connections={data.customConnections} />
            <Navigate page={page} pageSize={pageSize} />
        </Container>
    );
}
