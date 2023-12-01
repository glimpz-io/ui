"use client";

import { Form, FormButton, FormHeading, FormInput, FormUpload } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { DeviceFloppy, Plus } from "tabler-icons-react";
import { upsertUser } from "./actions";

interface ProfileProps {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    bio?: string;
    profilePicture?: string | null;
    profile?: {
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    };
}

export function Profile(props: ProfileProps): JSX.Element | null {
    const analytics = useAnalytics();

    if (props.id) analytics.identify(props.id);

    const iconFloppy = () => <DeviceFloppy />;
    const plusIcon = () => <Plus />;

    const fieldFirstName = "firstName";
    const fieldLastName = "lastName";
    const fieldPersonalEmail = "personalEmail";
    const fieldBio = "bio";
    const fieldProfilePicture = "profilePicture";
    const fieldProfilePictureUrl = "profilePictureUrl";
    const fieldProfileEmail = "profileEmail";
    const fieldProfilePhone = "profilePhone";
    const fieldProfileWebsite = "profileWebsite";
    const fieldProfileLinkedIn = "profileLinkedin";

    return (
        <Form
            pad={false}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
            action={async (formData) => {
                await upsertUser(
                    fieldFirstName,
                    fieldLastName,
                    fieldPersonalEmail,
                    fieldBio,
                    fieldProfilePicture,
                    fieldProfilePictureUrl,
                    fieldProfileEmail,
                    fieldProfilePhone,
                    fieldProfileWebsite,
                    fieldProfileLinkedIn,
                    formData
                );
            }}
        >
            <FormHeading title="Private Profile" description="These details will not be displayed publicly on your profile." />
            <FormInput label="Personal email" name={fieldPersonalEmail} type="email" placeholder="johndoe@xyz.com" required={true} defaultValue={props.email} />
            <FormHeading title="Public Profile" description="These details will be displayed publicly on your profile." />
            <FormInput label="First name" name={fieldFirstName} type="text" placeholder="John" required={true} defaultValue={props.firstName} />
            <FormInput label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={true} defaultValue={props.lastName} />
            <FormUpload
                name={fieldProfilePicture}
                urlName={fieldProfilePictureUrl}
                label="Profile photo"
                accept=".jpg, .jpeg, .png"
                defaultUrl={props.profilePicture ? props.profilePicture : undefined}
            />
            <FormInput
                label="Bio"
                name={fieldBio}
                type="textarea"
                placeholder="Describe what you do, where you work, what your business offers, and what you're looking for."
                required={true}
                defaultValue={props.bio}
            />
            <FormInput label="Work email" name={fieldProfileEmail} type="email" placeholder="johndoe@xyz.com" required={false} defaultValue={props.profile?.email ? props.profile.email : undefined} />
            <FormInput label="Work phone" name={fieldProfilePhone} type="tel" placeholder="+01 2345 6789" required={false} defaultValue={props.profile?.phone ? props.profile.phone : undefined} />
            <FormInput
                label="Website"
                name={fieldProfileWebsite}
                type="url"
                placeholder="https://website.com"
                required={false}
                defaultValue={props.profile?.website ? props.profile.website : undefined}
            />
            <FormInput
                label="LinkedIn"
                name={fieldProfileLinkedIn}
                type="url"
                placeholder="https://www.linkedin.com/in/johndoe"
                required={false}
                defaultValue={props.profile?.linkedin ? props.profile.linkedin : undefined}
            />
            {props.id ? (
                <FormButton
                    size="large"
                    icon={iconFloppy}
                    onClick={() => {
                        analytics.track("Save Profile");
                    }}
                >
                    Save
                </FormButton>
            ) : (
                <FormButton
                    size="large"
                    icon={plusIcon}
                    onClick={() => {
                        analytics.track("Create Profile");
                    }}
                >
                    Create Profile
                </FormButton>
            )}
        </Form>
    );
}
