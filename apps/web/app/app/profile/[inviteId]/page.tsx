import { Text } from "@glimpz-io/ui/text";
import { Container } from "@glimpz-io/ui/container";
import Image from "next/image";
import { Contact } from "../../../components/app/profile/contact";
import { getClient } from "@glimpz-io/hooks/graphql";
import { gql } from "@apollo/client";
import { Banner } from "../../../components/app/profile/banner";

interface Request {
    params: {
        inviteId: string;
    };
}

interface Data {
    invite: {
        id: string;
        userId: string;
        expiresAt: number;
        publicProfile: {
            firstName: string;
            lastName: string;
            bio: string;
            profilePicture: string | null;
            profile: {
                email: string | null;
                phone: string | null;
                website: string | null;
                linkedin: string | null;
            };
        };
    };
}

export default async function Page(req: Request): Promise<JSX.Element> {
    const inviteId = req.params.inviteId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = await getClient(apiUrl);

    const query = gql`
        query GetInvite($id: ID!) {
            invite(id: $id) {
                id
                userId
                expiresAt
                publicProfile {
                    firstName
                    lastName
                    bio
                    profilePicture
                    profile {
                        email
                        phone
                        website
                        linkedin
                    }
                }
            }
        }
    `;

    const { data: invite } = await client().query<Data>({ query, variables: { id: inviteId } });
    const data = invite.invite;

    return (
        <Container direction="vertical" size="half">
            <Banner linkId={data.id} userId={data.userId} />
            <Container direction="vertical" size="full" className="bg-sky-500 rounded-md">
                <Image
                    src={data.publicProfile.profilePicture || "https://i.imgur.com/H1eyXTn.png"}
                    alt="Profile picture."
                    width={150}
                    height={150}
                    className={`rounded-full drop-shadow-md ${data.publicProfile.profilePicture ? "" : "invisible"}`}
                />
            </Container>
            <Text type="title" alignment="centre">
                {data.publicProfile.firstName} {data.publicProfile.lastName}
            </Text>
            <Text type="p" alignment="centre">
                {data.publicProfile.bio}
            </Text>
            <Contact linkId={data.id} userId={data.userId} profile={data.publicProfile.profile} />
        </Container>
    );
}
