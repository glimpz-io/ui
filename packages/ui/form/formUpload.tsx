"use client";

import { useContext } from "react";
import { contextLoading } from "./form";

interface Props {
    name: string;
    urlName: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    accept?: string;
    defaultUrl?: string;
}

export function FormUpload({ name, label, required = false, disabled = false, accept, urlName, defaultUrl }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const uploadId = `${name}-upload`;

    const outColor = "file:text-white text-neutral-400 file:bg-sky-500 file:hover:bg-sky-600";
    const loadingColor = "file:text-white text-neutral-500 file:bg-sky-600";

    return (
        <div className="flex flex-col items-start justify-between w-full space-y-2">
            {label && (
                <label className="text-neutral-400 text-sm w-full" htmlFor={uploadId}>
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}
            <input
                disabled={isLoading || disabled}
                id={uploadId}
                type="file"
                className={`${!isLoading && !disabled ? outColor : loadingColor} file:border-0 file:px-4 file:py-3 file:mr-4 cursor-pointer file:cursor-pointer file:font-normal w-full`}
                name={name}
                accept={accept}
                required={required}
            />
            <input type="hidden" name={urlName} value={defaultUrl} />;
        </div>
    );
}
