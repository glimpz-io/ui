import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import Image from "next/image";
import { Contact } from "../../components/invite/contact";
import { Banner } from "../../components/invite/banner";
import { Save } from "../../components/invite/save";
import { GetInviteQuery, GetInviteQueryType, getClient } from "@glimpzio/utils";

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

    const { data: invite } = await client().query<GetInviteQueryType>({ query: GetInviteQuery, variables: { id: inviteId } });
    const data = invite.invite;

    return (
        <Container direction="vertical" size="half">
            <Banner userId={data.userId} />
            <Save inviteId={data.id} userId={data.userId} expiresAt={data.expiresAt} publicProfile={data.publicProfile} />
            <Container direction="vertical" size="full" className="bg-sky-500 rounded-md">
                {data.publicProfile.profilePicture && (
                    <Image
                        priority={true}
                        src={data.publicProfile.profilePicture}
                        alt="Profile picture."
                        width={150}
                        height={150}
                        className={`rounded-full drop-shadow-md ${data.publicProfile.profilePicture ? "" : "invisible"}`}
                    />
                )}
            </Container>
            <Text type="title" alignment="centre">
                {data.publicProfile.firstName} {data.publicProfile.lastName}
            </Text>
            <Text type="p" alignment="centre">
                {data.publicProfile.bio}
            </Text>
            <Contact userId={data.userId} profile={data.publicProfile.profile} />
        </Container>
    );
}
