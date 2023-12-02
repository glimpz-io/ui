"use client";

import { Link, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";

interface BannerProps {
    userId: string;
}

export default function Banner(props: BannerProps): JSX.Element {
    const analytics = useAnalytics();

    return (
        <Text alignment="centre" type="h3">
            🚀 Want to boost your own leads at networking events? Click{" "}
            <Link
                href={`/auth/createAccount/?referral=uidp-${props.userId}`}
                color="lightblue"
                size="small"
                newTab={true}
                onClick={() => {
                    analytics.track && analytics.track("Create Profile Banner Referral", { "User ID": props.userId });
                }}
            >
                here
            </Link>{" "}
            to create your own <Text type="bold">free</Text> Glimpz profile ⭐.
        </Text>
    );
}
