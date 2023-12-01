"use client";

import { useContext } from "react";
import { contextLoading } from "./form";

interface Props {
    label: string;
    name: string;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    defaultChecked?: boolean;
}

export function FormCheckbox({ label, name, onChange, disabled, defaultChecked }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const checkboxId = `${name}-checkbox`;

    return (
        <div className="flex items-start justify-between w-full space-x-4">
            <label className="text-neutral-400 text-sm w-full" htmlFor={checkboxId}>
                {label}
            </label>
            <input id={checkboxId} type="checkbox" name={name} disabled={isLoading || disabled} onChange={(e) => onChange && onChange(e.target.checked)} defaultChecked={defaultChecked} />
        </div>
    );
}
