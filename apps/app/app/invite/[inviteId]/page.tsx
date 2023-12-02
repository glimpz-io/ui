import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import Image from "next/image";
import { GetInviteQuery, GetInviteType, getClient } from "@glimpzio/utils";
import dynamic from "next/dynamic";

const Contact = dynamic(() => import("../../components/invite/contact"), { ssr: false });
const Banner = dynamic(() => import("../../components/invite/banner"), { ssr: false });
const Save = dynamic(() => import("../../components/invite/save"), { ssr: false });

interface Request {
    params: {
        inviteId: string;
    };
}

export default async function Page(req: Request): Promise<JSX.Element> {
    const inviteId = req.params.inviteId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = getClient(apiUrl);

    const { data: invite } = await client().query<GetInviteType>({ query: GetInviteQuery, variables: { id: inviteId } });
    const data = invite.invite;

    return (
        <Container direction="vertical" size="half">
            <Banner userId={data.userId} />
            <Save inviteId={data.id} userId={data.userId} expiresAt={data.expiresAt} publicProfile={data.publicProfile} />
            {data.publicProfile.profilePicture && (
                <Image priority={true} src={data.publicProfile.profilePicture} alt="Profile picture." width={250} height={250} className="rounded-full ring-2 ring-zinc-900 drop-shadow-md" />
            )}
            <Text type="title" alignment="centre">
                {data.publicProfile.firstName} <Text type="highlight">{data.publicProfile.lastName}</Text>
            </Text>
            <Text type="p" alignment="centre">
                {data.publicProfile.bio}
            </Text>
            <Contact userId={data.userId} profile={data.publicProfile.profile} />
        </Container>
    );
}
