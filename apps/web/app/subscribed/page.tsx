"use client";

import { Container, Text } from "@glimpz-io/ui";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_REFERRAL } from "@glimpz-io/config";

export default function Page(): JSX.Element {
    const searchParams = useSearchParams();
    const [referral, setReferral] = useState<string | null>(null);

    useEffect(() => {
        setReferral(searchParams.get("referral"));
    }, [searchParams, setReferral]);

    useEffect(() => {
        if (referral) localStorage.setItem(LOCAL_STORAGE_REFERRAL, referral);
    }, [referral]);

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                <Text type="highlight">Awesome</Text>, you&apos;re on the wait list!
            </Text>
            <Text type="p" alignment="centre">
                In the meantime, share our mission with your friends to increase your chance of getting early access!
            </Text>
            {referral}
            {/* **** Add some text copy here for a unique code */}
            {/* **** Store the users data in local storage on this screen and continuously redirect them */}
            {/* **** Add the mailing list and deploy, then get the QR code */}
        </Container>
    );
}
