"use client";

interface Props {
    children: any;
    className?: string;
}

export function FormDescription({ children, className = "" }: Props): JSX.Element {
    const global = ` ${className}`;

    return <p className={"text-lg text-neutral-400 font-normal w-full " + global}>{children}</p>;
}
