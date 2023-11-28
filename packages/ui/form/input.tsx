"use client";

import { useContext } from "react";
import { contextLoading } from "./form";

interface Props {
    className?: string;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
    onChange?: (value: string) => void;
    placeholder?: string;
    name: string;
    disabled?: boolean;
    required?: boolean;
    label?: string;
}

export function Input({ className = "", type, onChange, placeholder, name, disabled = false, required, label }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const global = `${className}`;

    const checkboxId = `${name}-checkbox`;

    const style = `${!isLoading && !disabled ? "text-white" : "text-neutral-400"} bg-neutral-800 w-full px-6 py-4 outline-none font-light ${global}`;

    return (
        <div className="flex flex-col items-start justify-between w-full space-y-2">
            {label && (
                <label className="text-neutral-400 text-sm w-full" htmlFor={checkboxId}>
                    {label}
                </label>
            )}
            {type === "textarea" ? (
                <textarea
                    disabled={isLoading || disabled}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    className={style}
                    rows={4}
                />
            ) : (
                <input
                    disabled={isLoading || disabled}
                    type={type}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    className={style}
                />
            )}
        </div>
    );
}
