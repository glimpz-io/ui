import { useEffect, useState } from "react";
import { IconProps } from "tabler-icons-react";

interface Props {
    className?: string;
    onClick?: () => void;
    icon?: (props: IconProps) => JSX.Element;
    value: string;
}

export function Copy({ className = "", value, onClick, icon: IconComponent }: Props): JSX.Element {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (!copied) return;

        setTimeout(() => setCopied(false), 3000);
    }, [copied, setCopied]);

    const global = `${className}`;

    return (
        <div className="w-full flex flex-col space-y-4 items-center justify-between">
            <div className="w-full flex flex-col space-y-2 items-left justify-between">
                <p
                    className={`whitespace-nowrap flex justify-center space-x-8 text-center text-base text-neutral-400 hover:text-zinc-400 bg-neutral-800 hover:bg-zinc-800 w-full px-6 py-4 outline-none font-light cursor-pointer border-2 border-neutral-600 hover:border-zinc-600 transition-colors duration-200 ${global}`}
                    onClick={() => {
                        navigator.clipboard.writeText(value);
                        setCopied(true);
                        onClick && onClick();
                    }}
                >
                    <span>{IconComponent && <IconComponent />}</span>
                    <span>{value}</span>
                </p>
            </div>
            {copied && <p className="text-white font-medium">Copied to clipboard 🎉</p>}
        </div>
    );
}
