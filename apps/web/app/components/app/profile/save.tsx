"use client";

import { Button, Checkbox, Form, Input, Link, Modal, Text } from "@glimpz-io/ui";
import { useAnalytics } from "@glimpz-io/hooks";
import { useEffect, useState } from "react";
import { submitEmail } from "./actions";

interface ReferralProps {
    inviteId: string;
    userId: string;
    expiresAt: number;
    publicProfile: {
        firstName: string;
    };
}

export function Save(props: ReferralProps): JSX.Element {
    const analytics = useAnalytics();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setShowModal(true), 3000);
    }, [setShowModal]);

    const fieldNameEmail = "email";
    const fieldNameSubscribe = "subscribe";

    const remainingHours = new Date(props.expiresAt - Math.floor(Date.now() / 1000)).getHours();

    return (
        <>
            <Text type="warning" alignment="centre">
                Your access to {props.publicProfile.firstName}&apos;s profile will expire in {remainingHours} hours. Click{" "}
                <Link
                    href="#"
                    onClick={() => {
                        setShowModal(true);
                        analytics.track("Open Connect Modal", { "User ID": props.userId });
                    }}
                    color="yellow"
                    size="small"
                >
                    here
                </Link>{" "}
                to connect with them now.
            </Text>
            <Modal title={`Connect With ${props.publicProfile.firstName}`} showModal={showModal} setShowModal={(show) => setShowModal(show)}>
                <Text type="warning">
                    Your access to {props.publicProfile.firstName}&apos;s profile will expire in {remainingHours} hours.
                </Text>
                <Text type="p">
                    Enter your email and we&apos;ll send {props.publicProfile.firstName}&apos;s profile to you directly. Your email address will also be sent to {props.publicProfile.firstName} so they
                    can reach out to you.
                </Text>
                <Form
                    direction="vertical"
                    size="full"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
                    action={async (formData) => {
                        await submitEmail(fieldNameEmail, fieldNameSubscribe, formData, props.inviteId);
                        setShowModal(false);
                    }}
                >
                    <Input name={fieldNameEmail} type="email" placeholder="youremail@xyz.com" required={true} />
                    <Checkbox label="Keep this box checked to receive additional marketing emails from Glimpz." name={fieldNameSubscribe} defaultChecked={true} />
                    <Button
                        type="submit"
                        color="indigo"
                        size="large"
                        onClick={() => {
                            analytics.track("Submit Connect Email", { "User ID": props.userId });
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    );
}
