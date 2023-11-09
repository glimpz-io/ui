"use client";

import { Text, Container, Button, Input, Form } from "@glimpz-io/ui";
import { Mail } from "tabler-icons-react";
import { submitEmail } from "./actions";
import { useEffect } from "react";
import { LOCAL_STORAGE_REFERRAL } from "@glimpz-io/config";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
    const router = useRouter();

    const fieldName = "email";
    const mailIcon = () => <Mail />;

    useEffect(() => {
        const referral = localStorage.getItem(LOCAL_STORAGE_REFERRAL);

        if (referral) router.push(`/subscribed?referral=${referral}`);
    }, [router]);

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                We&apos;re still <Text type="highlight">building</Text>... care for a sneak <Text type="highlight">peek</Text>?
            </Text>
            <Text type="p" alignment="centre">
                Swipe left on swiping and quit overthinking your opening lines! Introducing <Text type="bold">Glimpz</Text>, your new best mate for all face-to-face interactions!
            </Text>
            <Text type="p" alignment="centre">
                Ever wondered if someone was <Text type="bold">single</Text> and been hesitatant to chat them up? Ever <Text type="bold">hit it off</Text> with someone at a party but forgot to get
                their <Text type="bold">number</Text>? <Text type="bold">Glimpz</Text> has got your back, streamlining all these social snags!
            </Text>
            <Text type="h3" alignment="centre">
                <Text type="bold">Jump</Text> on our wait list! Bag <Text type="bold">exclusive updates</Text> and a shot at <Text type="bold">early access</Text>!
            </Text>
            <Form action={async (formData) => await submitEmail(fieldName, formData)} direction="vertical" size="full">
                <Input type="email" name={fieldName} placeholder="awesomeuser@xyz.com" />
                <Button type="submit" size="large" icon={mailIcon}>
                    Join Wait List
                </Button>
            </Form>
        </Container>
    );
}
