"use client";

import { Button, Form, Input, Link, Modal, Text } from "@glimpz-io/ui";
import { useAnalytics } from "@glimpz-io/hooks";
import { useState } from "react";

interface ReferralProps {
    linkId: string;
    userId: string;
    expiresAt: number;
    publicProfile: {
        firstName: string;
    };
}

// **** Now we need to create the save modal...

export function Save(props: ReferralProps): JSX.Element {
    const analytics = useAnalytics();

    const [showModal, setShowModal] = useState<boolean>(true);

    return (
        <>
            <Text type="warning" alignment="centre">
                Your access to {props.publicProfile.firstName}&apos;s profile will expire in {new Date(props.expiresAt).getHours()} hours. Click{" "}
                <Link href="#" onClick={() => setShowModal(true)} color="yellow" size="small">
                    here
                </Link>{" "}
                to connect with them now.
            </Text>
            <Modal title={`Connect With ${props.publicProfile.firstName}`} showModal={showModal} setShowModal={(show) => setShowModal(show)}>
                <Text type="warning">
                    Your access to {props.publicProfile.firstName}&apos;s profile will expire in {new Date(props.expiresAt).getHours()} hours.
                </Text>
                <Text type="p">
                    Enter your email and we&apos;ll send {props.publicProfile.firstName}&apos;s profile to you directly. Your email address will also be sent to {props.publicProfile.firstName} so they
                    can reach out to you.
                </Text>
                <Form direction="vertical" size="full">
                    <Input name="email" type="email" placeholder="awesomeuser@xyz.com" />
                    <Button type="submit" color="indigo" size="large">
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    );
}
