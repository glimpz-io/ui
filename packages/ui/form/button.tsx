"use client";

import { useContext } from "react";
import { IconProps } from "tabler-icons-react";
import { contextLoading } from "./form";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: (props: IconProps) => JSX.Element;
    size: "large";
    disabled?: boolean;
}

export function Button({ children, className, icon, onChange, type, disabled = false }: Props): JSX.Element {
    let length = "px-6 py-4 text-xl font-semibold space-x-8 border-4";
    const IconComponent = icon;

    const isLoading = useContext(contextLoading);

    const global = `${length} ${className ? className : ""}`;

    return (
        <button
            onChange={onChange}
            type={type}
            className={`${
                !isLoading && !disabled
                    ? "text-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
            } border-orange-500 w-full text-center flex items-center justify-center duration-200 transition-colors ${global}`}
            disabled={isLoading || disabled}
        >
            <span>{IconComponent && <IconComponent />}</span>
            <span>{children}</span>
        </button>
    );
}
