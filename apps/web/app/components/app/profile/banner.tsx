"use client";

import { Container, Link, Text } from "@glimpz-io/ui";
import { useAnalytics } from "@glimpz-io/hooks";

interface ReferralProps {
    linkId: string;
    userId: string;
}

export function Banner({ linkId, userId }: ReferralProps): JSX.Element {
    const analytics = useAnalytics();

    return (
        <Container direction="vertical" size="full">
            <Text alignment="centre" type="h3">
                🚀 Want to boost your own leads at networking events? Click{" "}
                <Link
                    href="/"
                    color="lightblue"
                    size="small"
                    newTab={true}
                    onClick={() => {
                        analytics.track("Create Profile Banner Referral", { "Link ID": linkId, "User ID": userId });
                    }}
                >
                    here
                </Link>{" "}
                to create your own <Text type="bold">free</Text> Glimpz profile ⭐.
            </Text>
        </Container>
    );
}
