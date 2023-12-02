import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { headers } from "next/headers";
import { AUTH_HEADER } from "@glimpzio/config";
import Image from "next/image";
import { GetUserQuery, GetUserType, getClient } from "@glimpzio/utils";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("../components/profile/profile"), { ssr: false });

export default async function Page(): Promise<JSX.Element> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const authToken = headers().get(AUTH_HEADER);
    if (!authToken) throw Error("auth token missing");

    const client = getClient(apiUrl, authToken);

    let user: GetUserType["user"] | undefined = undefined;
    try {
        const { data } = await client().query<GetUserType>({ query: GetUserQuery });
        user = data.user;
    } catch {}

    return (
        <Container direction="vertical" size="half">
            {user?.id ? (
                <>
                    <Text alignment="centre" type="title">
                        Profile <Text type="highlight">Details</Text>
                    </Text>
                    {user.profilePicture && (
                        <Image priority={true} src={user.profilePicture} alt="Profile picture" width={250} height={250} className="rounded-full ring-2 ring-zinc-900 drop-shadow-md" />
                    )}
                </>
            ) : (
                <Text alignment="centre" type="title">
                    Create <Text type="highlight">Profile</Text>
                </Text>
            )}
            <Profile {...user} />
        </Container>
    );
}
