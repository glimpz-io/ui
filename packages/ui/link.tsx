import NextLink from "next/link";
import { IconProps } from "tabler-icons-react";

interface Props {
    children: any;
    className?: string;
    icon?: (props: IconProps) => JSX.Element;
    newTab?: boolean;
    onClick?: () => void;
    size: "large" | "small";
    href: string;
    color: "lightblue" | "darkblue" | "indigo";
}

export function Link({ children, className = "", href, color, icon, newTab = false, onClick, size }: Props): JSX.Element {
    const IconComponent = icon;

    let length: string;
    if (size === "large") length = "px-6 py-6 text-xl font-semibold space-x-8";
    else length = "space-x-2 font-semibold";

    let outColor: string;
    if (color === "lightblue") {
        if (size === "large") outColor = "text-white bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600";
        else outColor = "text-sky-400 hover:text-sky-500";
    } else if (color === "indigo") {
        if (size === "large") outColor = "text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700";
        else outColor = "text-indigo-600 hover:text-indigo-700";
    } else if (color === "darkblue") {
        if (size === "large") outColor = "text-white bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-800 hover:to-cyan-800";
        else outColor = "text-blue-700 hover:text-blue-800";
    } else throw Error("invalid color");

    let block;
    if (size === "large") block = "w-full text-center flex items-center justify-center duration-200 transition-colors whitespace-nowrap";
    else block = "inline-flex items-center justify-between";

    const global = `${block} ${length} ${outColor} ${className}`;

    const newTabProps = newTab
        ? {
              rel: "noopener noreferrer",
              target: "_blank",
          }
        : {};

    return (
        <NextLink onClick={onClick} className={global} href={href} {...newTabProps}>
            {IconComponent && size !== "small" && (
                <span>
                    <IconComponent />
                </span>
            )}
            <span>{children}</span>
        </NextLink>
    );
}
