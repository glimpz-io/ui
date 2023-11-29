"use client";

import { Container, Copy, QRCode, Text } from "@glimpzio/ui";
import { useAnalytics, useOrigin } from "@glimpzio/hooks";
import { useEffect, useState } from "react";
import { INVITE_ID_COOKIE } from "@glimpzio/config";

interface InviteProps {
    id: string;
    userId: string;
    expiresAt: number;
    publicProfile: {
        firstName: string;
        lastName: string;
    };
}

function getExpiry(expiresAt: number) {
    return Math.floor((expiresAt - Date.now() / 1000) / (60 * 60));
}

export function Index(props: InviteProps): JSX.Element {
    const analytics = useAnalytics();
    const origin = useOrigin();
    const [expiry, setExpiry] = useState<number>(getExpiry(props.expiresAt));

    analytics.identify(props.userId);

    useEffect(() => {
        const interval = setInterval(() => {
            setExpiry(getExpiry(props.expiresAt));
        }, 30 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [props.expiresAt]);

    useEffect(() => {
        document.cookie = `${INVITE_ID_COOKIE}=${props.id};max-age=${(props.expiresAt - Math.floor(Date.now() / 1000)) / 2};`;
    }, [props.id, props.expiresAt]);

    if (!origin)
        return (
            <Container direction="vertical" size="half">
                <Text type="small" alignment="centre">
                    Loading...
                </Text>
            </Container>
        );

    const url = `${origin}/invite/${props.id}`;

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
            <Copy
                value={url}
                onClick={() => {
                    analytics.track("Copy Profile Code");
                }}
            />
        </Container>
    );
}
