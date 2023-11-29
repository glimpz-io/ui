"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ReferralProps {
    status?: "success" | "logout";
    referer?: string;
}

export function Index({ status, referer }: ReferralProps): null {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            if (referer) router.push(decodeURIComponent(referer));
            else if (status === "logout") router.push("/api/auth/signin");
            else router.push("/");
        }, 500);
    }, [router]);

    return null;
}
