import { useContext, useTransition } from "react";
import { contextLoading } from "./form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

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
