"use client";

import { useContext, useEffect, useState } from "react";
import { contextLoading } from "./form";
import Image from "next/image";

interface Props {
    className?: string;
    onUpload: (file: File) => Promise<string>;
    name: string;
    size: number;
    disabled?: boolean;
    defaultValue?: string;
    label?: string;
}

export function ProfileUpload({ className = "", onUpload, name, disabled = false, defaultValue, size, label }: Props): JSX.Element | null {
    const isLoading = useContext(contextLoading);
    const [mounted, setMounted] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(defaultValue ? defaultValue : null);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, [setMounted]);

    const global = `${className}`;

    const inputId = `${name}-input`;

    if (!mounted) return null;

    return (
        <div className="w-full flex flex-col items-center justify-center space-y-4">
            <label htmlFor={inputId}>
                <Image src={value || "https://i.imgur.com/IIgUmnO.png"} alt="Profile picture" width={size} height={size} className={`rounded-full cursor-pointer drop-shadow-md ${global}`} />
            </label>
            {label && (
                <label className="text-neutral-400 text-sm w-full text-center" htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input
                id={inputId}
                disabled={isLoading || disabled}
                type="file"
                onChange={async (e) => {
                    const files = e.target.files;
                    if (files === null) return;

                    const outUrl = await onUpload(Array.from(files)[0]);
                    setValue(outUrl);
                }}
                className="hidden"
                accept=".jpg, .jpeg, .png"
            />
            <input type="hidden" name={name} defaultValue={value ? value : undefined} />
        </div>
    );
}
