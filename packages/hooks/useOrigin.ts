"use client";

import { useEffect, useState } from "react";

export function useOrigin() {
    const [origin, setOrigin] = useState<string | null>(null);

    useEffect(() => {
        setOrigin(window.location.origin);
    }, [setOrigin]);

    return origin;
}
