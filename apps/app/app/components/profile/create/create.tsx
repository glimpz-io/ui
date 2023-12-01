"use client";

import { Button, Form, FormHeading, FormInput, FormUpload } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { Plus } from "tabler-icons-react";
// import { upsertUserCreate } from "./actions";

export function Create(): JSX.Element {
    const analytics = useAnalytics();

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
                console.log(formData.get(fieldProfilePicture));

                // await upsertUserCreate(
                //     // fieldFirstName,
                //     // fieldLastName,
                //     // fieldPersonalEmail,
                //     // fieldBio,
                //     fieldProfilePicture,
                //     fieldProfilePictureUrl,
                //     // fieldProfileEmail,
                //     // fieldProfilePhone,
                //     // fieldProfileWebsite,
                //     // fieldProfileLinkedIn,
                //     formData
                // );
            }}
        >
            {/* <FormHeading>Private Profile</FormHeading>
            <FormDescription>These details will not be displayed publicly on your profile.</FormDescription>
            <Input label="Personal email" name={fieldPersonalEmail} type="email" placeholder="johndoe@xyz.com" required={true} />
            <FormHeading>Public Profile</FormHeading>
            <FormDescription>These details will be displayed publicly on your profile.</FormDescription>
            <Input label="First name" name={fieldFirstName} type="text" placeholder="John" required={true} />
            <Input label="Last name" name={fieldLastName} type="text" placeholder="Doe" required={true} /> */}
            <FormUpload name={fieldProfilePicture} urlName={fieldProfilePictureUrl} label="Profile photo" accept=".jpg, .jpeg, .png" />
            {/* <Input label="Bio" name={fieldBio} type="textarea" placeholder="Describe what you do, where you work, what your business offers, and what you're looking for." required={true} />
            <Input label="Work email" name={fieldProfileEmail} type="email" placeholder="johndoe@xyz.com" required={false} />
            <Input label="Work phone" name={fieldProfilePhone} type="tel" placeholder="+01 2345 6789" required={false} />
            <Input label="Website" name={fieldProfileWebsite} type="url" placeholder="https://website.com" required={false} />
            <Input label="LinkedIn" name={fieldProfileLinkedIn} type="url" placeholder="https://www.linkedin.com/in/johndoe" required={false} /> */}
            <Button
                type="submit"
                color="blue"
                size="large"
                icon={plusIcon}
                onClick={() => {
                    analytics.track("Create Profile");
                }}
            >
                Create Profile
            </Button>
        </Form>
    );
}
