"use client";

import { Container, Text } from "@glimpz-io/ui";
import { useReferral } from "@glimpz-io/hooks";

export default function Page(): JSX.Element {
    const referral = useReferral(true);

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                <Text type="highlight">Awesome</Text>, you&apos;re on the wait list!
            </Text>
            <Text type="p" alignment="centre">
                In the meantime, share our mission with your friends to increase your chance of getting early access!
            </Text>
            {referral}
        </Container>
    );
}
