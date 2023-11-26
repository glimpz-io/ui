"use client";

import { Link, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";

interface ReferralProps {
    userId: string;
}

export function Banner({ userId }: ReferralProps): JSX.Element {
    const analytics = useAnalytics();

    return (
        <Text alignment="centre" type="h3">
            🚀 Want to boost your own leads at networking events? Click{" "}
            <Link
                href={`/auth/createAccount/?referral=uidp-${userId}`}
                color="lightblue"
                size="small"
                newTab={true}
                onClick={() => {
                    analytics.track("Create Profile Banner Referral", { "User ID": userId });
                }}
            >
                here
            </Link>{" "}
            to create your own <Text type="bold">free</Text> Glimpz profile ⭐.
        </Text>
    );
}
