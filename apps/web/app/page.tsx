"use client";

import { Text, Container, Button, Input, Form } from "@glimpz-io/ui";
import { Mail } from "tabler-icons-react";
import { submitEmail } from "./actions";
import { useRouter } from "next/navigation";
import { useIsReferred, useReferral } from "@glimpz-io/hooks";

export default function Page(): JSX.Element {
    const fieldName = "email";
    const mailIcon = () => <Mail />;

    useIsReferred(useRouter());
    const referral = useReferral(false);

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                We&apos;re still <Text type="highlight">building</Text>... care for a sneak <Text type="highlight">peek</Text>?
            </Text>
            <Text type="p" alignment="centre">
                Meeting people in person doesn&apos;t have to be awkward anymore with <Text type="bold">Glimpz</Text>, your new best mate for all face-to-face interactions!
            </Text>
            <Text type="p" alignment="centre">
                Ever wondered if someone was <Text type="bold">single</Text> and been hesitatant to approach them? Ever <Text type="bold">hit it off</Text> with someone at a social event but forgot to
                get their <Text type="bold">number</Text>? <Text type="bold">Glimpz</Text> has got your back, streamlining all these social snags!
            </Text>
            <Text type="h3" alignment="centre">
                <Text type="bold">Jump</Text> on our wait list! Bag <Text type="bold">exclusive updates</Text> and a shot at <Text type="bold">early access</Text>!
            </Text>
            <Form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
                action={async (formData) => {
                    await submitEmail(fieldName, formData, referral ? referral : undefined);
                }}
                direction="vertical"
                size="full"
            >
                <Input type="email" name={fieldName} placeholder="awesomeuser@xyz.com" />
                <Button type="submit" size="large" icon={mailIcon} color="orange">
                    Join Wait List
                </Button>
            </Form>
        </Container>
    );
}
