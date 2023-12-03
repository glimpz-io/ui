interface Props {
    children: any;
    className?: string;
    direction?: "horizontal" | "vertical";
    size?: "full" | "half" | "third";
    pad?: boolean;
    grow?: boolean;
}

export function Container({ children, className = "", direction = "horizontal", size = "full", pad = true, grow = true }: Props): JSX.Element {
    let alignment = direction === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-8";
    let length = size === "full" ? "" : size === "half" ? "lg:w-1/2" : "lg:w-1/3";

    const padding = pad ? "p-6" : "";
    const full = grow ? "w-full" : "";

    const global = `${full} ${padding} ${alignment} ${length} ${className}`;

    return <div className={`flex mx-auto justify-between items-center ${global}`}>{children}</div>;
}
