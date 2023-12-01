"use client";

import { createContext, useEffect, useState, useTransition } from "react";

interface Props {
    children: any;
    className?: string;
    action?: (formData: FormData) => void;
    pad?: boolean;
    grow?: boolean;
}

export const contextLoading = createContext<boolean>(false);

export function Form({ children, className = "", action, pad = true, grow = true }: Props): JSX.Element {
    const [isPending, startTransition] = useTransition();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, [setMounted]);

    const padding = pad ? "p-6" : "";
    const full = grow ? "w-full" : "";

    const global = `${padding} ${full} ${className}`;

    return (
        <contextLoading.Provider value={isPending}>
            <form className={"flex flex-col space-y-4 mx-auto justify-between items-center " + global} action={(formData) => (action ? startTransition(() => action(formData)) : undefined)}>
                {mounted ? <>{children}</> : null}
            </form>
        </contextLoading.Provider>
    );
}
