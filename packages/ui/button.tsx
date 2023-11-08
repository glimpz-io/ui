import { IconProps } from "tabler-icons-react";

interface Props {
    children?: any;
    icon?: (props: IconProps) => JSX.Element;
    className?: string;
    size: "large";
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export function Button({ children, className, type, icon: IconComponent }: Props): JSX.Element {
    let length = "px-6 py-4 text-xl font-semibold space-x-8 border-4";

    const global = `${length} ${className}`;

    return (
        <button
            className={
                "w-full border-orange-500 text-center text-orange-500 flex items-center justify-center duration-200 transition-colors hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white " +
                global
            }
            type={type}
        >
            {IconComponent && <IconComponent />}
            {children}
        </button>
    );
}
