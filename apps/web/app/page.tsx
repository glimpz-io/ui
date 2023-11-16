import { Text } from "@glimpz-io/ui/text";
import { Container } from "@glimpz-io/ui/container";
import { Index } from "./components";

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
                We&apos;re still <Text type="highlight">building</Text>... care for a sneak <Text type="highlight">peek</Text>?
            </Text>
            <Text type="p" alignment="centre">
                <Text type="bold">Generate more leads and increase your conversions</Text> from in-person networking events with <Text type="bold">Glimpz</Text>, your ultimate partner for professional
                engagements!
            </Text>
            <Text type="p" alignment="centre">
                Ever attended an event with <Text type="bold">too many professionals</Text> to talk to, or wondered if a stranger was in your industry and{" "}
                <Text type="bold">available for collaboration</Text>? Ever had an engaging conversation with a professional but forgot to <Text type="bold">exchange contact details</Text>? Glimpz has
                you covered, making <Text type="bold">in-person lead generation simple</Text>!
            </Text>
            <Text type="h3" alignment="centre">
                <Text type="bold">Join</Text> our wait list! Gain <Text type="bold">exclusive updates</Text> and the opportunity for <Text type="bold">early access</Text>!
            </Text>
            <Index referral={referral} />
        </Container>
    );
}
