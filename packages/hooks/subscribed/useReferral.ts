"use client";

import { useEffect } from "react";
import { LOCAL_STORAGE_REFERRAL } from "./useIsReferred";

export function useReferral(referral?: string) {
    useEffect(() => {
        if (referral) localStorage.setItem(LOCAL_STORAGE_REFERRAL, referral);
    }, [referral]);
}
