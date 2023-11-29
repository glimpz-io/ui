"use client";

interface Props {
    children: any;
    className?: string;
}

export function FormHeading({ children, className = "" }: Props): JSX.Element {
    const global = ` ${className}`;

    return <h3 className={"text-xl text-neutral-300 font-bold w-full " + global}>{children}</h3>;
}
