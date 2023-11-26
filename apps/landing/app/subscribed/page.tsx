import { Container } from "@glimpzio/ui/container";
import { Text } from "@glimpzio/ui/text";
import { Index } from "../components/subscribed";

interface Request {
    searchParams: {
        referral?: string;
    };
}

export default function Page(req: Request): JSX.Element {
    const referral = req.searchParams.referral;

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                <Text type="highlight">Thank You</Text>, you&apos;re awesome!
            </Text>
            <Text type="p" alignment="centre">
                You&apos;ve now been added to our waitlist! 🎉 In the meantime, share our mission with <Text type="bold">your network</Text> for a chance to <Text type="bold">gain early access</Text>!
            </Text>
            <Text type="h3" alignment="centre">
                🚀 Share your unique code with your network! (click to copy)
            </Text>
            <Index referral={referral} />
        </Container>
    );
}
