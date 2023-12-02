"use client";

import { FormCheckbox, Form, FormInput, Link, Modal, Text, FormButton } from "@glimpzio/ui";
import { useAnalytics, useExchange } from "@glimpzio/hooks";
import { submitEmail } from "./actions";

interface SaveProps {
    inviteId: string;
    userId: string;
    expiresAt: number;
    publicProfile: {
        firstName: string;
    };
}

export default function Save(props: SaveProps): JSX.Element {
    const analytics = useAnalytics();
    const { setShowModal, setSuccess, showModal, success } = useExchange(props.userId);

    const fieldEmail = "email";
    const fieldName = "name";
    const fieldSubscribe = "subscribe";

    const remainingHours = Math.ceil((props.expiresAt - Math.floor(Date.now() / 1000)) / (60 * 60));

    return (
        <>
            {success ? (
                <Text type="success" alignment="centre">
                    You exchanged contact details with {props.publicProfile.firstName}! Check your email to find them.
                </Text>
            ) : (
                <Text type="warning" alignment="centre">
                    Your access to {props.publicProfile.firstName}&apos;s profile will expire in {remainingHours} hours. Click{" "}
                    <Link
                        href="#"
                        onClick={() => {
                            analytics.track && analytics.track("Open Connect Modal", { "User ID": props.userId });
                            setShowModal(true);
                        }}
                        color="yellow"
                        size="small"
                    >
                        here
                    </Link>{" "}
                    🌟 to save their details.
                </Text>
            )}
            <Modal
                title={`Connect With ${props.publicProfile.firstName}`}
                showModal={showModal}
                setShowModal={(show) => {
                    setShowModal(show);
                }}
            >
                <Text type="warning">
                    Your access to {props.publicProfile.firstName}&apos;s profile will expire in {remainingHours} hours.
                </Text>
                <Text type="p">
                    Enter your email and we&apos;ll send {props.publicProfile.firstName}&apos;s profile to you directly. Your email address will also be sent to {props.publicProfile.firstName} so they
                    can reach out to you.
                </Text>
                <Form
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
                    action={async (formData) => {
                        await submitEmail(fieldEmail, fieldName, fieldSubscribe, formData, props.inviteId);
                        setSuccess();
                    }}
                    pad={false}
                >
                    <FormInput name={fieldEmail} type="email" placeholder="youremail@xyz.com" required={true} label="Email" />
                    <FormInput name={fieldName} type="text" placeholder="John Doe" required={false} label="Name" />
                    <FormCheckbox label="Keep this box checked to receive additional marketing emails from Glimpz." name={fieldSubscribe} defaultChecked={true} />
                    <FormButton
                        size="large"
                        onClick={() => {
                            analytics.track && analytics.track("Submit Connect Email", { "User ID": props.userId });
                        }}
                    >
                        Submit
                    </FormButton>
                </Form>
            </Modal>
        </>
    );
}
