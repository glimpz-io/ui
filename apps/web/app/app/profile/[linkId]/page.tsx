import { Text } from "@glimpz-io/ui/text";
import { Container } from "@glimpz-io/ui/container";
import Image from "next/image";
import { Index } from "../../../components/app/profile";
import { getClient } from "@glimpz-io/hooks";
import { gql } from "@apollo/client";
import { Link } from "@glimpz-io/ui/link";

interface Request {
    params: {
        linkId: string;
    };
}

export default async function Page(req: Request): Promise<JSX.Element> {
    const linkId = req.params.linkId;

    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = getClient(apiUrl);

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

    const { data: link } = await client().query({ query, variables: { id: linkId } });
    const data = link.link;

    // **** I need to add an inline link option for the links

    return (
        <>
            <Container direction="vertical" size="half">
                <Text alignment="centre" type="h3">
                    Click{" "}
                    <Link href="/" color="indigo" size="large" newTab={true}>
                        here
                    </Link>{" "}
                    to make your own Glimpz profile.
                </Text>
            </Container>
            <Container direction="vertical" size="half">
                <Container direction="vertical" size="full" className="bg-sky-500 rounded-md">
                    {data.publicProfile.profilePicture && <Image src={data.publicProfile.profilePicture} alt="Profile picture." width={250} height={250} className="rounded-full drop-shadow-md" />}
                </Container>
                <Text type="h2" alignment="centre">
                    {data.publicProfile.name}
                </Text>
                <Text type="p" alignment="centre">
                    {data.publicProfile.bio}
                </Text>
                <Index profile={data.publicProfile.profile} />
            </Container>
        </>
    );
}
