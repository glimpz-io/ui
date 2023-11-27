"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ReferralProps {
    referrer?: string;
}

export function Index({ referrer }: ReferralProps): null {
    const router = useRouter();

    useEffect(() => {
        if (referrer) router.push(decodeURIComponent(referrer));
        else router.push("/");
    }, [router]);

    return null;
}
