import { Text, Container } from "@glimpz-io/ui";

export default function Page(): JSX.Element {
    return (
        <Container direction="vertical" size="half">
            <Text type="h1" alignment="centre">
                We're still <Text type="highlight">building</Text>. Care for a <Text type="highlight">peek</Text>?
            </Text>
        </Container>
    );
}
