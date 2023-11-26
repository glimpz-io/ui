"use client";

import { Link, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";

interface ReferralProps {
    userId: string;
}

export function Banner({ userId }: ReferralProps): JSX.Element {
    const analytics = useAnalytics();

    const landingBaseUrl = process.env.NEXT_PUBLIC_LANDING_BASE_URL;
    if (!landingBaseUrl) throw Error("missing landing base url");

    return (
        <Text alignment="centre" type="h3">
            🚀 Want to boost your own leads at networking events? Click{" "}
            <Link
                href={`${landingBaseUrl}/?referral=uidp-${userId}`}
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
