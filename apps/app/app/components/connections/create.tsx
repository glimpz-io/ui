"use client";

import { Button, Container, Copy, Form, Input, Modal, QRCode, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { upsertConnection } from "./actions";

interface CreateProps {
    userId: string;
}

export function Create(props: CreateProps): JSX.Element {
    const analytics = useAnalytics();
    const [showModal, setShowModal] = useState<boolean>(false);

    analytics.identify(props.userId);

    const fieldFirstName = "firstName";
    const fieldLastName = "lastName";
    const fieldNotes = "notes";
    const fieldEmail = "email";
    const fieldPhone = "phone";
    const fieldWebsite = "website";
    const fieldLinkedIn = "linkedin";

    return (
        <>
            <Container direction="horizontal" pad={false}>
                <Text type="h3">New Connection</Text>
                <Container grow={false} pad={false}>
                    <Button
                        onClick={() => {
                            setShowModal(true);
                            analytics.track("New Custom Connection Modal");
                        }}
                        color="blue"
                        icon={() => <Plus />}
                        size="small"
                        type="button"
                    >
                        New
                    </Button>
                </Container>
            </Container>
            <Modal
                title="Create Connection"
                showModal={showModal}
                setShowModal={(show) => {
                    setShowModal(show);
                }}
            >
                <Form
                    direction="vertical"
                    size="full"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
                    action={async (formData) => {
                        await upsertConnection(null, fieldFirstName, fieldLastName, fieldEmail, fieldPhone, fieldWebsite, fieldLinkedIn, fieldNotes, formData);
                        setShowModal(false);
                    }}
                >
                    <Container pad={false} direction="horizontal">
                        <Input label="First name" name={fieldFirstName} type="text" placeholder="John" required={false} />
                        <Input label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={false} />
                    </Container>
                    <Input label="Email" name={fieldEmail} type="email" placeholder="johndoe@xyz.com" required={false} />
                    <Input label="Phone" name={fieldPhone} type="tel" placeholder="+01 2345 6789" required={false} />
                    <Input label="Website" name={fieldWebsite} type="url" placeholder="https://website.com" required={false} />
                    <Input label="LinkedIn" name={fieldLinkedIn} type="url" placeholder="https://www.linkedin.com/in/johndoe" required={false} />
                    <Input
                        label="Notes"
                        name={fieldNotes}
                        type="textarea"
                        placeholder="Put any other relevant information here i.e. employer, job title, if they asked you to follow up..."
                        required={false}
                    />
                    <Button
                        type="submit"
                        color="indigo"
                        size="large"
                        onClick={() => {
                            analytics.track("Create Custom Connection");
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    );
}
