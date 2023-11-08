import { IconProps } from "tabler-icons-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: (props: IconProps) => JSX.Element;
    size: "large";
}

export function Button({ children, className, icon, onChange, type, form }: Props): JSX.Element {
    let length = "px-6 py-4 text-xl font-semibold space-x-8 border-4";
    const IconComponent = icon;

    const global = `${length} ${className ? className : ""}`;

    return (
        <button
            onChange={onChange}
            type={type}
            form={form}
            className={
                "w-full border-orange-500 text-center text-orange-500 flex items-center justify-center duration-200 transition-colors hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white " +
                global
            }
        >
            <span>{IconComponent && <IconComponent />}</span>
            <span>{children}</span>
        </button>
    );
}
