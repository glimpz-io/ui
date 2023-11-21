"use client";

import { useContext } from "react";
import { contextLoading } from "./form";

interface Props {
    className?: string;
    label: string;
    name: string;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    defaultChecked?: boolean;
}

export function Checkbox({ className = "", label, name, onChange, disabled, defaultChecked }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const global = ` ${className}`;

    const checkboxId = `${name}-checkbox`;

    return (
        <div className="flex items-start justify-between w-full space-x-4">
            <label className="text-neutral-400 text-sm w-full" htmlFor={checkboxId}>
                {label}
            </label>
            <input
                id={checkboxId}
                className={" " + global}
                type="checkbox"
                name={name}
                disabled={isLoading || disabled}
                onChange={(e) => onChange && onChange(e.target.checked)}
                defaultChecked={defaultChecked}
            />
        </div>
    );
}
