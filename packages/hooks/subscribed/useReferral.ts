import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_REFERRAL } from "./useIsReferred";

export function useReferral(store: boolean) {
    const searchParams = useSearchParams();
    const [referral, setReferral] = useState<string | null>(null);

    useEffect(() => {
        setReferral(searchParams.get("referral"));
    }, [searchParams, setReferral]);

    useEffect(() => {
        if (store && referral) localStorage.setItem(LOCAL_STORAGE_REFERRAL, referral);
    }, [referral]);

    return referral;
}
