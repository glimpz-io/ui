"use client";

import { useContext } from "react";
import { IconProps } from "tabler-icons-react";
import { contextLoading } from "./form";

interface Props {
    children: any;
    onClick?: (e: any) => void;
    icon?: (props: IconProps) => JSX.Element;
    disabled?: boolean;
    size?: "large" | "small";
}

export function FormButton({ children, icon, onClick, disabled = false, size }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const IconComponent = icon;

    let length = size === "large" ? "p-6 text-xl font-semibold space-x-8" : "px-4 py-3 text-lg font-medium space-x-4";

    const outColor = "bg-gradient-to-r text-white from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600";
    const loadingColor = "bg-gradient-to-r from-sky-600 to-blue-600 text-white";

    const global = `${length}`;

    return (
        <button
            onClick={onClick}
            type="submit"
            className={`${!isLoading && !disabled ? outColor : loadingColor} w-full text-center flex items-center justify-center ${global}`}
            disabled={isLoading || disabled}
        >
            {IconComponent && (
                <span>
                    <IconComponent />
                </span>
            )}
            <span>{children}</span>
        </button>
    );
}
