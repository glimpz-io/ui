"use client";

import { Button, Container, Form, Input, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { DeviceFloppy } from "tabler-icons-react";
import Image from "next/image";

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
                // await upsertConnection(props.id, fieldFirstName, fieldLastName, fieldEmail, fieldPhone, fieldWebsite, fieldLinkedIn, fieldNotes, formData);
            }}
        >
            <Text type="h3">
                <Text type="bold">Private Profile</Text>
            </Text>
            <Text type="p">These details will not be displayed publicly on your profile.</Text>
            <Container pad={false} direction="horizontal">
                <Input label="First name" name={fieldFirstName} type="text" placeholder="John" required={true} value={props.firstName} />
                <Input label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={true} value={props.lastName} />
            </Container>
            <Input label="Personal email" name={fieldPersonalEmail} type="email" placeholder="johndoe@xyz.com" required={true} value={props.email} />

            <Text type="h3">
                <Text type="bold">Public Profile</Text>
            </Text>
            <Text type="p">These details will be displayed publicly on your profile.</Text>
            {/* **** We need to create the profile picture editor here (with the uploads) */}
            {/* **** We also need to store it here somehow... */}

            <Input name={fieldProfilePicture} type="hidden" value={props.profilePicture ? props.profilePicture : undefined} />

            <Image
                src={props.profilePicture || "https://i.imgur.com/H1eyXTn.png"}
                alt="Profile picture."
                width={150}
                height={150}
                className={`rounded-full drop-shadow-md ${props.profilePicture ? "" : "invisible"}`}
            />
            <Input
                label="Bio"
                name={fieldBio}
                type="textarea"
                placeholder="Describe what you do, where you work, what your business offers, and what you're looking for."
                required={true}
                value={props.bio}
            />

            <Input label="Work email" name={fieldProfileEmail} type="email" placeholder="johndoe@xyz.com" required={false} value={props.profile.email ? props.profile.email : undefined} />
            <Input label="Work phone" name={fieldProfilePhone} type="tel" placeholder="+01 2345 6789" required={false} value={props.profile.phone ? props.profile.phone : undefined} />
            <Input label="Website" name={fieldProfileWebsite} type="url" placeholder="https://website.com" required={false} value={props.profile.website ? props.profile.website : undefined} />
            <Input
                label="LinkedIn"
                name={fieldProfileLinkedIn}
                type="url"
                placeholder="https://www.linkedin.com/in/johndoe"
                required={false}
                value={props.profile.linkedin ? props.profile.linkedin : undefined}
            />

            <Button type="submit" color="blue" size="large" icon={() => <DeviceFloppy />}>
                Save
            </Button>
        </Form>
    );
}
