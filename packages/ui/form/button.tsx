"use client";

import { useContext } from "react";
import { IconProps } from "tabler-icons-react";
import { contextLoading } from "./form";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: (props: IconProps) => JSX.Element;
    size: "large";
    disabled?: boolean;
    color: "orange";
}

export function Button({ children, className = "", icon, onClick, type, disabled = false, color }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const IconComponent = icon;

    let length = "px-6 py-4 text-xl font-semibold space-x-8 border-4";

    let outColor: string;
    let loadingColor: string;
    if (color === "orange") {
        outColor = "text-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white border-orange-500";
        loadingColor = "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500";
    } else throw Error("invalid color");

    const global = `${length} ${className}`;

    return (
        <button
            onClick={onClick}
            type={type}
            className={`${!isLoading && !disabled ? outColor : loadingColor} w-full text-center flex items-center justify-center duration-200 transition-colors ${global}`}
            disabled={isLoading || disabled}
        >
            <span>{IconComponent && <IconComponent />}</span>
            <span>{children}</span>
        </button>
    );
}
