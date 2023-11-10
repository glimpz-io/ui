"use client";

import { createContext, useTransition } from "react";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
    direction: "horizontal" | "vertical";
    size: "full" | "half" | "third";
    action?: (formData: FormData) => void;
}

export const contextLoading = createContext<boolean>(false);

export function Form({ children, className = "", direction, size, action }: Props): JSX.Element {
    const [isPending, startTransition] = useTransition();

    let alignment = direction === "horizontal" ? "flex-row space-x-8 lg:space-x-0 lg:flow-col lg:space-y-8" : "flex-col space-y-8";
    let length = size === "full" ? "w-full" : size === "half" ? "w-full lg:w-1/2" : "w-full lg:w-1/3";

    const global = `${alignment} ${length} ${className}`;

    return (
        <form className={"flex mx-auto justify-between items-center " + global} action={(formData) => action && startTransition(() => action(formData))}>
            <contextLoading.Provider value={isPending}>{children}</contextLoading.Provider>
        </form>
    );
}
