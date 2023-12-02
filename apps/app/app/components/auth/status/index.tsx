"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IndexProps {
    referer?: string;
}

export default function Index(props: IndexProps): null {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            if (props.referer) router.push(decodeURIComponent(props.referer));
        }, 500);
    }, [router]);

    return null;
}
