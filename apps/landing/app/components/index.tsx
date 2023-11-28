"use client";

import { Mail } from "tabler-icons-react";
import { submitEmail } from "./actions";
import { useRouter } from "next/navigation";
import { useAnalytics, useIsReferred } from "@glimpzio/hooks";
import { Button, Form, Input } from "@glimpzio/ui";

interface ReferralProps {
    referral?: string;
}

export function Index({ referral }: ReferralProps): JSX.Element {
    useIsReferred(useRouter());
    const analytics = useAnalytics();

    const fieldName = "email";
    const mailIcon = () => <Mail />;

    return (
        <Form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
            action={async (formData) => {
                await submitEmail(fieldName, formData, referral);
            }}
            direction="vertical"
            size="full"
        >
            <Input type="email" name={fieldName} placeholder="youremail@xyz.com" required={true} />
            <Button
                type="submit"
                size="large"
                icon={mailIcon}
                color="blue"
                onClick={() => {
                    analytics.track("Email Signup", { "Signup Type": referral ? "Referral" : "Direct", Referer: referral });
                }}
            >
                Join Waitlist
            </Button>
        </Form>
    );
}
