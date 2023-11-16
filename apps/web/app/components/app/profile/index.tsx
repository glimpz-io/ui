"use client";

import { BrandLinkedin, World, Mail, Phone } from "tabler-icons-react";
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
    const phoneIcon = () => <Phone />;
    const emailIcon = () => <Mail />;
    const webIcon = () => <World />;
    const linkedInIcon = () => <BrandLinkedin />;

    // **** Todo add analytics to this page

    return (
        <Container direction="vertical" size="full">
            {profile.email && <Copy icon={emailIcon} value={profile.email} />}
            {profile.phone && <Copy icon={phoneIcon} value={"+" + profile.phone} />}
            {profile.website && (
                <Link color="indigo" size="large" href={profile.website} newTab={true} icon={webIcon}>
                    Website
                </Link>
            )}
            {profile.linkedin && (
                <Link href={profile.linkedin} color="darkblue" icon={linkedInIcon} size="large" newTab={true}>
                    LinkedIn
                </Link>
            )}
        </Container>
    );
}
