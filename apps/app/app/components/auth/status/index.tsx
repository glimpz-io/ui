"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ReferralProps {
    referer?: string;
}

export default function Index({ referer }: ReferralProps): null {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            if (referer) router.push(decodeURIComponent(referer));
        }, 500);
    }, [router]);

    return null;
}
