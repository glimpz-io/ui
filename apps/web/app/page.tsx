import { Text, Container, Button } from "@glimpz-io/ui";
import { Mail } from "tabler-icons-react";

export default function Page(): JSX.Element {
    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                We're still <Text type="highlight">building</Text>... care for a sneak <Text type="highlight">peek</Text>?
            </Text>
            <Text type="p" alignment="centre">
                Swipe left on swiping and quit overthinking your opening lines! Introducing <Text type="bold">Glimpz</Text>, your new best mate for all face-to-face interactions!
            </Text>
            <Text type="p" alignment="centre">
                Ever wondered if someone was <Text type="bold">single</Text> and been hesitatant to chat them up? Ever <Text type="bold">hit it off</Text> with someone at a party but forgot to get
                their <Text type="bold">number</Text>? <Text type="bold">Glimpz</Text> has got your back, streamlining all these social snags!
            </Text>
            <Text type="h3" alignment="centre">
                <Text type="bold">Jump</Text> on our wait list! Bag <Text type="bold">exclusive updates</Text> and the shot at <Text type="bold">early access</Text>!
            </Text>
            <Button type="button" size="large" icon={() => <Mail />}>
                Join Wait List
            </Button>
        </Container>
    );
}
