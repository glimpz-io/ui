interface Props {
    children: any;
    className?: string;
    direction: "horizontal" | "vertical";
    size: "full" | "half" | "third";
}

export function Container({ children, className, direction, size }: Props): JSX.Element {
    let alignment = direction === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-4";
    let length = size === "full" ? "w-full" : size === "half" ? "w-1/2" : "w-1/3";

    const global = `${alignment} ${length} ${className}`;

    return <div className={"flex mx-auto p-4 justify-between items-center " + global}>{children}</div>;
}
