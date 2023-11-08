interface Props {
    children: any;
    type: "h1" | "h2" | "h3" | "p" | "highlight" | "small";
    alignment?: "left" | "centre" | "right";
}

export function Text({ children, type, alignment }: Props): JSX.Element {
    let textDirection = "text-left";
    if (alignment === "left") textDirection = "text-left";
    if (alignment === "centre") textDirection = "text-center";
    if (alignment === "right") textDirection = "text-right";

    const global = `${textDirection} w-full`;

    if (type === "h1") return <h1 className={"text-9xl text-neutral-950 font-bold" + " " + global}>{children}</h1>;
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
    if (type === "h2") return <h2 className={"text-6xl text-neutral-900 font-semibold w-full" + " " + global}>{children}</h2>;
    if (type === "h3") return <h3 className={"text-xl text-neutral-800 font-medium w-full" + " " + global}>{children}</h3>;
    if (type === "p") return <p className={"text-lg text-neutral-700 font-normal w-full" + " " + global}>{children}</p>;
    if (type === "small") return <p className={"text-sm text-neutral-600 font-normal w-full" + " " + global}>{children}</p>;

    throw Error("invalid type");
}
