"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect } from "react";

export const LOCAL_STORAGE_REFERRAL = "LOCAL_STORAGE_REFERRAL";

export function useIsReferred(router: AppRouterInstance) {
    useEffect(() => {
        const referral = localStorage.getItem(LOCAL_STORAGE_REFERRAL);

        if (referral) router.push(`/subscribed?referral=${referral}`);
    }, [router]);
}
