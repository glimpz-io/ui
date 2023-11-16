"use client";

import { useContext } from "react";
import { contextLoading } from "./form";

interface Props {
    className: string;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
    placeholder?: string;
    name: string;
    disabled?: boolean;
}

export function Input({ className = "", type, onChange, placeholder, name, disabled = false }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const global = `${className}`;

    return (
        <input
            disabled={isLoading || disabled}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            className={`${!isLoading && !disabled ? "text-white" : "text-neutral-400"} bg-neutral-800 w-full px-6 py-4 outline-none font-light ${global}`}
        />
    );
}
