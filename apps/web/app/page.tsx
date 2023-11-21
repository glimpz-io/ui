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
                <Text type="bold">Turbocharge your lead generation and sales conversions</Text> at networking events with <Text type="bold">Glimpz</Text>, your new partner for professional
                engagements!
            </Text>
            <Text type="p" alignment="centre">
                Glimpz makes it easy to <Text type="bold">connect and follow up</Text> with relevant professionals at in-person networking events, whether that be a potential{" "}
                <Text type="bold">business partner</Text>, <Text type="bold">client</Text>, or <Text type="bold">key industry player</Text>. Say goodbye to annoying business cards with a digital
                approach to <Text type="bold">share your details</Text> and <Text type="bold">connect with professionals you meet</Text>.
            </Text>
            <Text type="h3" alignment="centre">
                So what are you waiting for? <Text type="bold">Join</Text> our waitlist to be notified when the product <Text type="bold">goes public</Text>, and the opportunity to{" "}
                <Text type="bold">try it early</Text>!
            </Text>
            <Index referral={referral} />
        </Container>
    );
}
