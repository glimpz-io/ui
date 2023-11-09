import { useState } from "react";

interface Props {
    className?: string;
    value: string;
    alignment?: "left" | "centre" | "right";
}

export function Copy({ className, value, alignment }: Props): JSX.Element {
    const [copied, setCopied] = useState<boolean>(false);

    let textDirection = "text-left";
    if (alignment === "left") textDirection = "text-left";
    if (alignment === "centre") textDirection = "text-center";
    if (alignment === "right") textDirection = "text-right";

    const global = `${textDirection} ${className}`;

    return (
        <div className="w-full flex flex-col space-y-4 items-center justify-between">
            <a
                href="#"
                className={`text-center text-neutral-400 hover:text-zinc-400 bg-neutral-800 hover:bg-zinc-800 w-full px-6 py-4 outline-none font-light cursor-pointer ${global}`}
                onClick={() => {
                    navigator.clipboard.writeText(value);
                    setCopied(true);
                }}
            >
                {value}
            </a>
            {copied && <p className="text-white font-medium">Copied to clipboard 🎉</p>}
        </div>
    );
}
