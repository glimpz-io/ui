"use client";

import { useContext } from "react";
import { IconProps } from "tabler-icons-react";
import { contextLoading } from "./form";

interface Props {
    children: any;
    className?: string;
    onClick?: (e: any) => void;
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    icon?: (props: IconProps) => JSX.Element;
    size: "large";
    disabled?: boolean;
    color: "blue";
}

export function Button({ children, className = "", icon, onClick, type, disabled = false, color }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const IconComponent = icon;

    let length = "px-6 py-4 text-xl font-semibold space-x-8 border-4";

    let outColor: string;
    let loadingColor: string;
    if (color === "blue") {
        outColor = "text-sky-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-500 hover:text-white border-sky-500";
        loadingColor = "bg-gradient-to-r from-sky-500 to-blue-500 text-white border-sky-500";
    } else throw Error("invalid color");

    const global = `${length} ${className}`;

    return (
        <button
            onClick={onClick}
            type={type}
            className={`${!isLoading && !disabled ? outColor : loadingColor} w-full text-center flex items-center justify-center duration-200 transition-colors whitespace-nowrap ${global}`}
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
