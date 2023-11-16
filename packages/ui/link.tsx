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
    color: "lightblue" | "darkblue" | "orangepurple" | "indigo";
}

export function Link({ children, className = "", href, color, icon, newTab = false, onClick, size }: Props): JSX.Element {
    const IconComponent = icon;

    let length: string;
    if (size === "large") length = "px-6 py-4 text-xl font-semibold space-x-8 border-4";
    else length = "space-x-2 font-semibold";

    let outColor: string;
    if (color === "lightblue") {
        if (size === "large") outColor = "text-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:text-white border-cyan-500";
        else outColor = "text-sky-400 hover:text-sky-500";
    } else if (color === "indigo") {
        if (size === "large") outColor = "text-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white border-blue-500";
        else outColor = "text-indigo-500 hover:text-indigo-600";
    } else if (color === "orangepurple") {
        if (size === "large") outColor = "text-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white border-orange-500";
        else outColor = "text-orange-500 hover:text-purple-600";
    } else if (color === "darkblue") {
        if (size === "large") outColor = "text-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700 hover:text-white border-blue-700";
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
