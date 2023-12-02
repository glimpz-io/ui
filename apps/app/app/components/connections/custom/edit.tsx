"use client";

import { Button, Container, Form, FormButton, FormInput, Modal, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { deleteConnection, upsertCustomConnection } from "./actions";
import { DeviceFloppy, Edit as EditIcon, Trash } from "tabler-icons-react";
import { useState, useTransition } from "react";

interface EditProps {
    id: string;
    userId: string;
    connectedAt: number;
    firstName: string | null;
    lastName: string | null;
    notes: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    linkedin: string | null;
}

export default function Edit(props: EditProps): JSX.Element {
    const analytics = useAnalytics();
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [_, startTransition] = useTransition();

    analytics.identify(props.userId);

    const floppyIcon = () => <DeviceFloppy />;
    const editIcon = () => <EditIcon />;
    const trashIcon = () => <Trash />;

    const fieldFirstName = "firstName";
    const fieldLastName = "lastName";
    const fieldNotes = "notes";
    const fieldEmail = "email";
    const fieldPhone = "phone";
    const fieldWebsite = "website";
    const fieldLinkedIn = "linkedin";

    return (
        <>
            <Modal
                title="Edit Contact"
                showModal={showEditModal}
                setShowModal={(show) => {
                    setShowEditModal(show);
                }}
            >
                <Form
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
                    action={async (formData) => {
                        await upsertCustomConnection(props.id, fieldFirstName, fieldLastName, fieldEmail, fieldPhone, fieldWebsite, fieldLinkedIn, fieldNotes, formData);
                        setShowEditModal(false);
                    }}
                >
                    <FormInput label="First name" name={fieldFirstName} type="text" placeholder="John" required={false} defaultValue={props.firstName ? props.firstName : undefined} />
                    <FormInput label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={false} defaultValue={props.lastName ? props.lastName : undefined} />
                    <FormInput label="Email" name={fieldEmail} type="email" placeholder="johndoe@xyz.com" required={false} defaultValue={props.email ? props.email : undefined} />
                    <FormInput label="Phone" name={fieldPhone} type="tel" placeholder="01 2345 6789" required={false} defaultValue={props.phone ? props.phone : undefined} />
                    <FormInput label="Website" name={fieldWebsite} type="url" placeholder="https://website.com" required={false} defaultValue={props.website ? props.website : undefined} />
                    <FormInput
                        label="LinkedIn"
                        name={fieldLinkedIn}
                        type="url"
                        placeholder="https://www.linkedin.com/in/johndoe"
                        required={false}
                        defaultValue={props.linkedin ? props.linkedin : undefined}
                    />
                    <FormInput
                        label="Notes"
                        name={fieldNotes}
                        type="textarea"
                        placeholder="Put any other relevant information here i.e. employer, job title, if they asked you to follow up..."
                        required={false}
                        defaultValue={props.notes ? props.notes : undefined}
                    />
                    <FormButton
                        size="large"
                        icon={floppyIcon}
                        onClick={() => {
                            analytics.track && analytics.track("Save Custom Connection", { "Connection ID": props.id });
                        }}
                    >
                        Save
                    </FormButton>
                </Form>
            </Modal>
            <Modal
                title="Delete Contact"
                showModal={showDeleteModal}
                setShowModal={(show) => {
                    setShowDeleteModal(show);
                }}
            >
                <Text type="warning">This action cannot be undone.</Text>
                <Text type="p">You are about to permanently delete this contact. Are you sure you want to do this?</Text>
                <Button
                    type="submit"
                    color="red"
                    size="small"
                    icon={trashIcon}
                    onClick={() => {
                        analytics.track && analytics.track("Delete Custom Connection", { "Connection ID": props.id });
                        startTransition(() => deleteConnection(props.id));
                    }}
                >
                    Yes, Delete This Contact
                </Button>
            </Modal>
            <Container direction="horizontal" pad={false}>
                <Button
                    type="button"
                    color="gray"
                    size="small"
                    icon={trashIcon}
                    onClick={() => {
                        setShowDeleteModal(true);
                    }}
                >
                    Delete
                </Button>
                <Button
                    type="button"
                    color="blue"
                    size="small"
                    icon={editIcon}
                    onClick={() => {
                        setShowEditModal(true);
                    }}
                >
                    Edit
                </Button>
            </Container>
        </>
    );
}
