"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ReferralProps {
    referer?: string;
}

export function Index({ referer }: ReferralProps): null {
    const router = useRouter();

    useEffect(() => {
        if (referer) router.push(decodeURIComponent(referer));
        else router.push("/");
    }, [router]);

    return null;
}
