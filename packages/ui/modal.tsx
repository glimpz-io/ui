"use client";

import { X } from "tabler-icons-react";

interface Props {
    children: any;
    className?: string;
    title: string;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export function Modal({ children, className = "", title, showModal, setShowModal }: Props): JSX.Element {
    const global = `${className}`;

    return showModal ? (
        <div className="fixed inset-0 flex justify-center m-6">
            <dialog className={`rounded-md w-full  lg:w-1/2 p-6 space-y-4 bg-zinc-900 flex flex-col items-center justify-between ${global}`}>
                <h3 className="text-xl text-white font-semibold flex items-center justify-between space-x-8 w-full">
                    <span>{title}</span>
                    <button onClick={() => setShowModal(false)}>
                        <X />
                    </button>
                </h3>
                {children}
            </dialog>
        </div>
    ) : (
        <></>
    );
}
