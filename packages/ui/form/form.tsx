"use client";

import { createContext, useTransition } from "react";

interface Props {
    children: any;
    className?: string;
    direction?: "horizontal" | "vertical";
    size?: "full" | "half" | "third";
    action?: (formData: FormData) => void;
    pad?: boolean;
    grow?: boolean;
}

export const contextLoading = createContext<boolean>(false);

export function Form({ children, className = "", direction = "vertical", size = "full", action, pad = true, grow = true }: Props): JSX.Element {
    const [isPending, startTransition] = useTransition();

    let alignment = direction === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-4";
    let length = size === "full" ? "" : size === "half" ? "lg:w-1/2" : "lg:w-1/3";

    const padding = pad ? "p-6" : "";
    const full = grow ? "w-full" : "";

    const global = `${padding} ${full} ${alignment} ${length} ${className}`;

    return (
        <form className={"flex mx-auto justify-between items-center " + global} action={(formData) => action && startTransition(() => action(formData))}>
            <contextLoading.Provider value={isPending}>{children}</contextLoading.Provider>
        </form>
    );
}
