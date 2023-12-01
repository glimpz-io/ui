"use client";

import { Button, Container, Form, FormInput, Modal, Text } from "@glimpzio/ui";
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

    const plusIcon = () => <Plus />;

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
                        icon={plusIcon}
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
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
                    action={async (formData) => {
                        await upsertConnection(null, fieldFirstName, fieldLastName, fieldEmail, fieldPhone, fieldWebsite, fieldLinkedIn, fieldNotes, formData);
                        setShowModal(false);
                    }}
                >
                    <Container pad={false} direction="horizontal">
                        <FormInput label="First name" name={fieldFirstName} type="text" placeholder="John" required={false} />
                        <FormInput label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={false} />
                    </Container>
                    <FormInput label="Email" name={fieldEmail} type="email" placeholder="johndoe@xyz.com" required={false} />
                    <FormInput label="Phone" name={fieldPhone} type="tel" placeholder="+01 2345 6789" required={false} />
                    <FormInput label="Website" name={fieldWebsite} type="url" placeholder="https://website.com" required={false} />
                    <FormInput label="LinkedIn" name={fieldLinkedIn} type="url" placeholder="https://www.linkedin.com/in/johndoe" required={false} />
                    <FormInput
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
