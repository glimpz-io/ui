import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { Create } from "../../components/profile/create/create";

export default function Page(): JSX.Element {
    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="title">
                Create <Text type="highlight">Profile</Text>
            </Text>
            <Create />
        </Container>
    );
}
