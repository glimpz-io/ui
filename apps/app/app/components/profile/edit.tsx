"use client";

import { Button, Container, FormDescription, Form, FormHeading, Input, ProfileUpload } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { DeviceFloppy } from "tabler-icons-react";
import { upsertUser } from "./actions";

interface ProfileProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    profilePicture: string | null;
    profile: {
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    };
}

export function Edit(props: ProfileProps): JSX.Element {
    const analytics = useAnalytics();

    analytics.identify(props.id);

    const fieldFirstName = "firstName";
    const fieldLastName = "lastName";
    const fieldPersonalEmail = "personalEmail";
    const fieldBio = "bio";
    const fieldProfilePicture = "profilePicture";
    const fieldProfileEmail = "profileEmail";
    const fieldProfilePhone = "profilePhone";
    const fieldProfileWebsite = "profileWebsite";
    const fieldProfileLinkedIn = "profileLinkedin";

    return (
        <Form
            direction="vertical"
            size="full"
            pad={false}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
            action={async (formData) => {
                await upsertUser(
                    fieldFirstName,
                    fieldLastName,
                    fieldPersonalEmail,
                    fieldBio,
                    fieldProfilePicture,
                    fieldProfileEmail,
                    fieldProfilePhone,
                    fieldProfileWebsite,
                    fieldProfileLinkedIn,
                    formData
                );
            }}
        >
            <FormHeading>Private Profile</FormHeading>
            <FormDescription>These details will not be displayed publicly on your profile.</FormDescription>
            <Container pad={false} direction="horizontal">
                <Input label="First name" name={fieldFirstName} type="text" placeholder="John" required={true} defaultValue={props.firstName} />
                <Input label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={true} defaultValue={props.lastName} />
            </Container>
            <Input label="Personal email" name={fieldPersonalEmail} type="email" placeholder="johndoe@xyz.com" required={true} defaultValue={props.email} />
            <FormHeading>Public Profile</FormHeading>
            <FormDescription>These details will be displayed publicly on your profile.</FormDescription>
            <ProfileUpload
                onUpload={async (file) => {
                    // **** Add AWS upload here

                    console.log(file);
                    return "helloworld";
                }}
                name={fieldProfilePicture}
                size={250}
                defaultValue={props.profilePicture ? props.profilePicture : undefined}
                label="Profile picture"
            />
            <Input
                label="Bio"
                name={fieldBio}
                type="textarea"
                placeholder="Describe what you do, where you work, what your business offers, and what you're looking for."
                required={true}
                defaultValue={props.bio}
            />
            <Input label="Work email" name={fieldProfileEmail} type="email" placeholder="johndoe@xyz.com" required={false} defaultValue={props.profile.email ? props.profile.email : undefined} />
            <Input label="Work phone" name={fieldProfilePhone} type="tel" placeholder="+01 2345 6789" required={false} defaultValue={props.profile.phone ? props.profile.phone : undefined} />
            <Input label="Website" name={fieldProfileWebsite} type="url" placeholder="https://website.com" required={false} defaultValue={props.profile.website ? props.profile.website : undefined} />
            <Input
                label="LinkedIn"
                name={fieldProfileLinkedIn}
                type="url"
                placeholder="https://www.linkedin.com/in/johndoe"
                required={false}
                defaultValue={props.profile.linkedin ? props.profile.linkedin : undefined}
            />
            <Button
                type="submit"
                color="blue"
                size="large"
                icon={() => <DeviceFloppy />}
                onClick={() => {
                    analytics.track("Save Profile");
                }}
            >
                Save
            </Button>
        </Form>
    );
}
