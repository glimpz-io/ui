"use client";

import { Container, Copy, Text } from "@glimpz-io/ui";
import { useReferral } from "@glimpz-io/hooks";
import { BASE_URL } from "@glimpz-io/config";

export default function Page(): JSX.Element {
    const referral = useReferral(true);

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                <Text type="highlight">Thank You</Text>! you&apos;re on the wait list!
            </Text>
            <Text type="p" alignment="centre">
                In the meantime, share our mission with your friends to increase your chance of getting early access!
            </Text>
            <Text type="h3" alignment="centre">
                Share your unique code with your friends! (click to copy)
            </Text>
            {referral && <Copy value={`${BASE_URL}?referral=${referral}`} />}
        </Container>
    );
}
