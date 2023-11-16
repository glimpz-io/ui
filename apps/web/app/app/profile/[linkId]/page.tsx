import { Text } from "@glimpz-io/ui/text";
import { Container } from "@glimpz-io/ui/container";
import Image from "next/image";
import { Contact } from "../../../components/app/profile/contact";
import { getClient } from "@glimpz-io/hooks/graphql";
import { gql } from "@apollo/client";
import { Banner } from "../../../components/app/profile/banner";

interface Request {
    params: {
        linkId: string;
    };
}

interface Data {
    link: {
        id: string;
        userId: string;
        expiresAt: number;
        publicProfile: {
            name: string;
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
    const linkId = req.params.linkId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = await getClient(apiUrl);

    const query = gql`
        query GetLink($id: ID!) {
            link(id: $id) {
                id
                userId
                expiresAt
                publicProfile {
                    name
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

    const { data: link } = await client().query<Data>({ query, variables: { id: linkId } });
    const data = link.link;

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
                {data.publicProfile.name}
            </Text>
            <Text type="p" alignment="centre">
                {data.publicProfile.bio}
            </Text>
            <Contact linkId={data.id} userId={data.userId} profile={data.publicProfile.profile} />
        </Container>
    );
}
