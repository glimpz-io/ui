import { Container } from "@glimpz-io/ui/container";
import { Link } from "@glimpz-io/ui/link";
import { Text } from "@glimpz-io/ui/text";
import { BASE_URL } from "@glimpz-io/config";
import { BrandFacebook } from "tabler-icons-react";
import { Index } from "../components/subscribed";

interface Request {
    searchParams: {
        referral?: string;
    };
}

export default function Page(req: Request): JSX.Element {
    const referral = req.searchParams.referral;

    const facebookIcon = () => <BrandFacebook />;
    const facebookLink = `https://www.facebook.com/share.php?u=${BASE_URL}`;

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                <Text type="highlight">Thank You</Text>, you&apos;re awesome!
            </Text>
            <Text type="p" alignment="centre">
                You&apos;ve now been added to our wait list! In the meantime, share our mission with <Text type="bold">your friends</Text> to increase your chance of gaining early access!
            </Text>
            <Text type="h3" alignment="centre">
                Share your unique code with your friends! (click to copy)
            </Text>
            <Index referral={referral} />
            <Link href={facebookLink} color="darkblue" icon={facebookIcon} size="large" newTab={true}>
                Share To FaceBook
            </Link>
        </Container>
    );
}
