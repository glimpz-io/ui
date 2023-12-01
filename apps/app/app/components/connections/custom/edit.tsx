"use client";

import { Container, Form, FormButton, FormInput } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { upsertConnection } from "../actions";
import { DeviceFloppy } from "tabler-icons-react";

interface CustomConnectionProps {
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

export function Edit(props: CustomConnectionProps): JSX.Element {
    const analytics = useAnalytics();

    analytics.identify(props.userId);

    const floppyIcon = () => <DeviceFloppy />;

    const fieldFirstName = "firstName";
    const fieldLastName = "lastName";
    const fieldNotes = "notes";
    const fieldEmail = "email";
    const fieldPhone = "phone";
    const fieldWebsite = "website";
    const fieldLinkedIn = "linkedin";

    return (
        <Form
            pad={false}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
            action={async (formData) => {
                await upsertConnection(props.id, fieldFirstName, fieldLastName, fieldEmail, fieldPhone, fieldWebsite, fieldLinkedIn, fieldNotes, formData);
            }}
        >
            <Container pad={false} direction="horizontal">
                <FormInput label="First name" name={fieldFirstName} type="text" placeholder="John" required={false} defaultValue={props.firstName ? props.firstName : undefined} />
                <FormInput label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={false} defaultValue={props.lastName ? props.lastName : undefined} />
            </Container>
            <FormInput label="Email" name={fieldEmail} type="email" placeholder="johndoe@xyz.com" required={false} defaultValue={props.email ? props.email : undefined} />
            <FormInput label="Phone" name={fieldPhone} type="tel" placeholder="+01 2345 6789" required={false} defaultValue={props.phone ? props.phone : undefined} />
            <FormInput label="Website" name={fieldWebsite} type="url" placeholder="https://website.com" required={false} defaultValue={props.website ? props.website : undefined} />
            <FormInput label="LinkedIn" name={fieldLinkedIn} type="url" placeholder="https://www.linkedin.com/in/johndoe" required={false} defaultValue={props.linkedin ? props.linkedin : undefined} />
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
                    analytics.track("Save Custom Connection", { "Connection Id": props.id });
                }}
            >
                Save
            </FormButton>
        </Form>
    );
}
