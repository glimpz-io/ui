import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { headers } from "next/headers";
import { AUTH_HEADER } from "@glimpzio/config";
import { Edit } from "../components/profile/edit";
import Image from "next/image";
import { GetUserQuery, GetUserType, getClient } from "@glimpzio/utils";

export default async function Page(): Promise<JSX.Element> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = getClient(apiUrl, authToken);

    const { data: customConnection } = await client().query<GetUserType>({ query: GetUserQuery });
    const data = customConnection.user;

    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="title">
                Profile <Text type="highlight">Details</Text>
            </Text>
            {data.profilePicture && <Image priority={true} src={data.profilePicture} alt="Profile picture" width={250} height={250} className="rounded-full ring-2 ring-zinc-900 drop-shadow-md" />}
            <Edit {...data} />
        </Container>
    );
}
