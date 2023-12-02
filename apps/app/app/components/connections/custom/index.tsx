"use client";

import { useAnalytics } from "@glimpzio/hooks";
import { Copy, Link } from "@glimpzio/ui";
import { BrandLinkedin, Mail, Phone, World } from "tabler-icons-react";

interface IndexProps {
    id: string;
    userId: string;
    connectedAt: number;
    firstName: string | null;
    lastName: string | null;
    notes: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    linkedin: string | null;
}

export default function Index(props: IndexProps): JSX.Element {
    const analytics = useAnalytics();

    analytics.identify(props.userId);

    const phoneIcon = () => <Phone />;
    const emailIcon = () => <Mail />;
    const webIcon = () => <World />;
    const linkedInIcon = () => <BrandLinkedin />;

    return (
        <>
            {props.email && (
                <Copy
                    icon={emailIcon}
                    value={props.email}
                    onClick={() => {
                        analytics.track && analytics.track("Copy Custom Connection Email", { "Connection ID": props.id });
                    }}
                />
            )}
            {props.phone && (
                <Copy
                    icon={phoneIcon}
                    value={props.phone}
                    onClick={() => {
                        analytics.track && analytics.track("Copy Custom Connection Phone", { "Connection ID": props.id });
                    }}
                />
            )}
            {props.website && (
                <Link
                    color="indigo"
                    size="large"
                    href={props.website}
                    newTab={true}
                    icon={webIcon}
                    onClick={() => {
                        analytics.track && analytics.track("Goto Custom Connection Website", { "Connection ID": props.id });
                    }}
                >
                    Website
                </Link>
            )}
            {props.linkedin && (
                <Link
                    href={props.linkedin}
                    color="darkblue"
                    icon={linkedInIcon}
                    size="large"
                    newTab={true}
                    onClick={() => {
                        analytics.track && analytics.track("Goto Custom Connection LinkedIn", { "Connection ID": props.id });
                    }}
                >
                    LinkedIn
                </Link>
            )}
        </>
    );
}
