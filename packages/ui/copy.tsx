import { useState } from "react";

interface Props {
    className?: string;
    onClick?: () => void;
    value: string;
}

export function Copy({ className = "", value, onClick }: Props): JSX.Element {
    const [copied, setCopied] = useState<boolean>(false);

    const global = `${className}`;

    return (
        <div className="w-full flex flex-col space-y-4 items-center justify-between">
            <p
                className={`text-center text-neutral-400 hover:text-zinc-400 bg-neutral-800 hover:bg-zinc-800 w-full px-6 py-4 outline-none font-light cursor-pointer border-2 border-neutral-600 hover:border-zinc-600 ${global}`}
                onClick={() => {
                    navigator.clipboard.writeText(value);
                    setCopied(true);
                    onClick && onClick();
                }}
            >
                {value}
            </p>
            {copied && <p className="text-white font-medium">Copied to clipboard 🎉</p>}
        </div>
    );
}
