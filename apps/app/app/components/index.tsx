"use client";

import { Container, Copy, QRCode, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { useEffect, useState } from "react";

interface InviteProps {
    id: string;
    expiresAt: number;
    publicProfile: {
        firstName: string;
        lastName: string;
    };
}

export function Index(props: InviteProps): JSX.Element {
    const analytics = useAnalytics();
    const [origin, setOrigin] = useState<string | null>(null);

    useEffect(() => {
        setOrigin(window.location.origin);
    }, [setOrigin]);

    if (!origin)
        return (
            <Container direction="vertical" size="half">
                <Text type="small" alignment="centre">
                    Loading...
                </Text>
            </Container>
        );

    const url = `${origin}/profile/${props.id}`;
    const expiry = Math.floor((props.expiresAt - Date.now() / 1000) / (60 * 60));

    return (
        <Container direction="vertical" size="half">
            <Text alignment="centre" type="p">
                By sharing this QR code, those who scan it will have access to your Glimpz profile for the next <Text type="bold">{expiry}</Text> hours.
            </Text>
            <Text alignment="centre" type="title">
                {props.publicProfile.firstName} <Text type="highlight">{props.publicProfile.lastName}</Text>
            </Text>
            <QRCode size={378} value={url} />
            <Text alignment="centre" type="small">
                You can also share your profile digitally using the following link (click to copy).
            </Text>
            <Copy value={url} />
        </Container>
    );
}
