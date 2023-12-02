"use client";

import { BrandLinkedin, World, Mail, Phone } from "tabler-icons-react";
import { Copy, Link } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";

interface ReferralProps {
    userId: string;
    profile: {
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    };
}

export default function Contact({ userId, profile }: ReferralProps): JSX.Element {
    const analytics = useAnalytics();

    const phoneIcon = () => <Phone />;
    const emailIcon = () => <Mail />;
    const webIcon = () => <World />;
    const linkedInIcon = () => <BrandLinkedin />;

    return (
        <>
            {profile.email && (
                <Copy
                    icon={emailIcon}
                    value={profile.email}
                    onClick={() => {
                        analytics.track && analytics.track("Copy Profile Email", { "User ID": userId });
                    }}
                />
            )}
            {profile.phone && (
                <Copy
                    icon={phoneIcon}
                    value={profile.phone}
                    onClick={() => {
                        analytics.track && analytics.track("Copy Profile Phone", { "User ID": userId });
                    }}
                />
            )}
            {profile.website && (
                <Link
                    color="indigo"
                    size="large"
                    href={profile.website}
                    newTab={true}
                    icon={webIcon}
                    onClick={() => {
                        analytics.track && analytics.track("Goto Profile Website", { "User ID": userId });
                    }}
                >
                    Website
                </Link>
            )}
            {profile.linkedin && (
                <Link
                    href={profile.linkedin}
                    color="darkblue"
                    icon={linkedInIcon}
                    size="large"
                    newTab={true}
                    onClick={() => {
                        analytics.track && analytics.track("Goto Profile LinkedIn", { "User ID": userId });
                    }}
                >
                    LinkedIn
                </Link>
            )}
        </>
    );
}
