import { Text } from "@glimpz-io/ui/text";
import { Container } from "@glimpz-io/ui/container";
import Image from "next/image";
import { Button } from "@glimpz-io/ui/form/button";
import { Copy } from "@glimpz-io/ui/copy";
import { Index } from "../../../components/app/profile";

interface Request {
    params: {
        linkId: string;
    };
}

export default function Page(req: Request): JSX.Element {
    const linkId = req.params.linkId;

    // **** Some graphql data fetching here...

    const data: {
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
    } = {
        id: "83af1360-20f8-437e-a8d2-df65d3e1c0cc",
        userId: "8f5afe5a-f917-4c9a-8ada-ad0b0243e0f2",
        expiresAt: 1700123239,
        publicProfile: {
            name: "Ben Osborn",
            bio: "Software engineer and computer science graduate at the University of Newcastle. Building Glimpz.io, a mobile app making lead generation at in-person networking events easy.",
            profilePicture: null,
            profile: {
                email: "test@xyz.com",
                phone: "61 2 8503 8000",
                website: "https://www.glimpz.io",
                linkedin: "https://www.linkedin.com/in/bengosborn/",
            },
        },
    };

    return (
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
    );
}
