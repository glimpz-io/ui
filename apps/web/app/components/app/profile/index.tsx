"use client";

import { World } from "tabler-icons-react";
import { Mail } from "tabler-icons-react";
import { useRouter } from "next/navigation";
import { useAnalytics, useIsReferred } from "@glimpz-io/hooks";
import { Container, Copy, Link } from "@glimpz-io/ui";

interface ReferralProps {
    profile: {
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    };
}

export function Index({ profile }: ReferralProps): JSX.Element {
    const webIcon = () => <World />;

    return (
        <Container direction="vertical" size="full">
            {profile.email && <Copy value={profile.email} />}
            {profile.phone && <Copy value={"+" + profile.phone} />}
            {profile.website && (
                <Link color="indigo" size="large" href={profile.website} newTab={true} icon={webIcon}>
                    Website
                </Link>
            )}
        </Container>
    );
}
