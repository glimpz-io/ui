"use client";

import { useContext } from "react";
import { IconProps } from "tabler-icons-react";
import { contextLoading } from "./form";

// **** THIS NEEDS FIXING

interface Props {
    children: any;
    className?: string;
    onClick?: (e: any) => void;
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    icon?: (props: IconProps) => JSX.Element;
    size: "large" | "small";
    disabled?: boolean;
    color: "blue" | "indigo" | "red";
}

export function Button({ children, className = "", icon, onClick, type, disabled = false, color, size }: Props): JSX.Element {
    const isLoading = useContext(contextLoading);

    const IconComponent = icon;

    let length = size === "large" ? "p-6 text-xl font-semibold space-x-8" : "px-4 py-3 text-lg font-medium space-x-4";

    let outColor: string;
    let loadingColor: string;
    if (color === "blue") {
        outColor = "bg-gradient-to-r text-white from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600";
        loadingColor = "bg-gradient-to-r from-sky-600 to-blue-600 text-white";
    } else if (color === "indigo") {
        outColor = "bg-gradient-to-r text-white from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700";
        loadingColor = "bg-gradient-to-r from-blue-600 to-indigo-700 text-white";
    } else if (color === "red") {
        outColor = "bg-gradient-to-r text-white from-red-500 to-red-600 hover:from-red-600 hover:to-red-700";
        loadingColor = "bg-gradient-to-r from-red-600 to-red-700 text-white";
    } else throw Error("invalid color");

    const global = `${length} ${className}`;

    return (
        <button
            onClick={onClick}
            type={type}
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
