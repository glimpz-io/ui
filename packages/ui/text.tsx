interface Props {
    children: any;
    className?: string;
    type: "title" | "h2" | "h3" | "p" | "highlight" | "small" | "bold";
    alignment?: "left" | "centre" | "right";
}

export function Text({ children, className, type, alignment }: Props): JSX.Element {
    let textDirection = "text-left";
    if (alignment === "left") textDirection = "text-left";
    if (alignment === "centre") textDirection = "text-center";
    if (alignment === "right") textDirection = "text-right";

    const global = `${textDirection} w-full ${className}`;

    if (type === "title") return <h1 className={"text-8xl text-white font-bold " + global}>{children}</h1>;
    if (type === "highlight")
        return (
            <span
                style={{
                    background: "linear-gradient(to right, orange , yellow)",
                    WebkitBackgroundClip: "text",
                    MozBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                }}
            >
                {children}
            </span>
        );
    if (type === "bold") return <span className={"font-bold " + global}>{children}</span>;
    if (type === "h2") return <h2 className={"text-2xl text-neutral-200 font-semibold w-full " + global}>{children}</h2>;
    if (type === "h3") return <h3 className={"text-xl text-neutral-300 font-medium w-full " + global}>{children}</h3>;
    if (type === "p") return <p className={"text-lg text-neutral-400 font-normal w-full " + global}>{children}</p>;
    if (type === "small") return <p className={"text-md text-neutral-500 font-normal w-full " + global}>{children}</p>;

    throw Error("invalid type");
}
