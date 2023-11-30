"use client";

import { createContext, useEffect, useState, useTransition } from "react";

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
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, [setMounted]);

    let alignment = direction === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-4";
    let length = size === "full" ? "" : size === "half" ? "lg:w-1/2" : "lg:w-1/3";

    const padding = pad ? "p-6" : "";
    const full = grow ? "w-full" : "";

    const global = `${padding} ${full} ${alignment} ${length} ${className}`;

    return (
        <contextLoading.Provider value={isPending}>
            <form className={"flex mx-auto justify-between items-center " + global} action={(formData) => (action ? startTransition(() => action(formData)) : undefined)}>
                {mounted ? <>{children}</> : null}
            </form>
        </contextLoading.Provider>
    );
}
