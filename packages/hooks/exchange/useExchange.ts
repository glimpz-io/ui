"use client";

import { useEffect, useState } from "react";

export function useExchange(userId: string) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const LOCAL_STORAGE_EXCHANGE = `LOCAL_STORAGE_EXCHANGE:${userId}`;

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_EXCHANGE)) {
            setSuccess(true);
        } else setTimeout(() => setShowModal(true), 1000);
    }, [setSuccess]);

    return {
        setShowModal,
        setSuccess: () => {
            setShowModal(false);
            setSuccess(true);

            localStorage.setItem(LOCAL_STORAGE_EXCHANGE, "true");
        },
        success,
        showModal,
    };
}
