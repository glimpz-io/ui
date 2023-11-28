"use client";

import { useEffect, useState } from "react";

export function useMounted() {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, [setMounted]);

    return mounted;
}
