"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "tabler-icons-react";
import { MODAL_PORTAL_ID } from "@glimpz-io/config";

interface Props {
    children: any;
    className?: string;
    title: string;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export function Modal({ children, className = "", title, showModal, setShowModal }: Props): JSX.Element | null {
    const global = `${className}`;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    const frag = showModal ? (
        <div className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50">
            <div className={`rounded-md w-full lg:w-1/2 p-6 space-y-8 bg-zinc-900 flex flex-col items-center justify-between ${global}`}>
                <h3 className="text-xl text-white font-semibold flex items-center justify-between space-x-8 w-full">
                    <span>{title}</span>
                    <button onClick={() => setShowModal(false)}>
                        <X />
                    </button>
                </h3>
                {children}
            </div>
        </div>
    ) : null;

    return mounted ? createPortal(frag, document.querySelector(`#${MODAL_PORTAL_ID}`) as Element) : null;
}
