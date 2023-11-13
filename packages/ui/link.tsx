import NextLink from "next/link";
import { IconProps } from "tabler-icons-react";

interface Props {
    children: any;
    className?: string;
    icon?: (props: IconProps) => JSX.Element;
    newTab?: boolean;
    onClick?: () => void;
    size: "large";
    href: string;
    color: "lightblue" | "darkblue" | "orangepurple" | "indigo";
}

export function Link({ children, className = "", href, color, icon, newTab = false, onClick }: Props): JSX.Element {
    const IconComponent = icon;

    let length = "px-6 py-4 text-xl font-semibold space-x-8 border-4";

    let outColor: string;
    if (color === "lightblue") outColor = "text-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:text-white border-cyan-500";
    else if (color === "indigo") outColor = "text-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white border-blue-500";
    else if (color === "orangepurple") outColor = "text-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white border-orange-500";
    else if (color === "darkblue") outColor = "text-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700 hover:text-white border-blue-700";
    else throw Error("invalid color");

    const global = `${length} ${outColor} ${className}`;

    const newTabProps = newTab
        ? {
              rel: "noopener noreferrer",
              target: "_blank",
          }
        : {};

    return (
        <NextLink onClick={onClick} className={`w-full text-center flex items-center justify-center duration-200 transition-colors ${global}`} href={href} {...newTabProps}>
            <span>{IconComponent && <IconComponent />}</span>
            <span>{children}</span>
        </NextLink>
    );
}
