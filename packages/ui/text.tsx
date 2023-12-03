import { AlertTriangle, Check } from "tabler-icons-react";

interface Props {
    children: any;
    className?: string;
    type: "title" | "h2" | "h3" | "p" | "highlight" | "small" | "bold" | "warning" | "success";
    alignment?: "left" | "centre" | "right";
}

export function Text({ children, className, type, alignment = "left" }: Props): JSX.Element {
    let textDirection: string;
    if (alignment === "centre") textDirection = "text-center";
    else if (alignment === "right") textDirection = "text-right";
    else textDirection = "text-left";

    const global = `w-full ${textDirection} ${className}`;

    if (type === "title") return <h1 className={`text-8xl text-white font-bold ${global}`}>{children}</h1>;
    if (type === "highlight")
        return (
            <span
                style={{
                    background: "linear-gradient(to right, #0ea5e9, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    MozBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                }}
            >
                {children}
            </span>
        );
    if (type === "bold") return <span className={`font-bold ${global}`}>{children}</span>;
    if (type === "h2") return <h2 className={`text-2xl text-neutral-200 font-semibold w-full ${global}`}>{children}</h2>;
    if (type === "h3") return <h3 className={`text-xl text-neutral-300 font-medium w-full ${global}`}>{children}</h3>;
    if (type === "p") return <p className={`text-lg text-neutral-400 font-normal w-full ${global}`}>{children}</p>;
    if (type === "small") return <p className={`text-md text-neutral-500 font-normal w-full ${global}`}>{children}</p>;
    if (type === "warning")
        return (
            <div className={"flex justify-between items-start w-full space-x-4 text-yellow-400 text-lg font-normal"}>
                <span>
                    <AlertTriangle />
                </span>
                <span className={`w-full ${global}`}>{children}</span>
            </div>
        );
    if (type === "success")
        return (
            <div className={"flex justify-between items-start w-full space-x-4 text-green-500 text-lg font-normal"}>
                <span>
                    <Check />
                </span>
                <span className={`w-full ${global}`}>{children}</span>
            </div>
        );

    throw Error("invalid type");
}
