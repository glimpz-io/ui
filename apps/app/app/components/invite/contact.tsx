"use client";

import { BrandLinkedin, World, Mail, Phone } from "tabler-icons-react";
import { Copy, Link } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";

interface ContactProps {
    userId: string;
    profile: {
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    };
}

export default function Contact(props: ContactProps): JSX.Element {
    const analytics = useAnalytics();

    const phoneIcon = () => <Phone />;
    const emailIcon = () => <Mail />;
    const webIcon = () => <World />;
    const linkedInIcon = () => <BrandLinkedin />;

    return (
        <>
            {props.profile.email && (
                <Copy
                    icon={emailIcon}
                    value={props.profile.email}
                    onClick={() => {
                        analytics.track && analytics.track("Copy Profile Email", { "User ID": props.userId });
                    }}
                />
            )}
            {props.profile.phone && (
                <Copy
                    icon={phoneIcon}
                    value={props.profile.phone}
                    onClick={() => {
                        analytics.track && analytics.track("Copy Profile Phone", { "User ID": props.userId });
                    }}
                />
            )}
            {props.profile.website && (
                <Link
                    color="indigo"
                    size="large"
                    href={props.profile.website}
                    newTab={true}
                    icon={webIcon}
                    onClick={() => {
                        analytics.track && analytics.track("Goto Profile Website", { "User ID": props.userId });
                    }}
                >
                    Website
                </Link>
            )}
            {props.profile.linkedin && (
                <Link
                    href={props.profile.linkedin}
                    color="darkblue"
                    icon={linkedInIcon}
                    size="large"
                    newTab={true}
                    onClick={() => {
                        analytics.track && analytics.track("Goto Profile LinkedIn", { "User ID": props.userId });
                    }}
                >
                    LinkedIn
                </Link>
            )}
        </>
    );
}
