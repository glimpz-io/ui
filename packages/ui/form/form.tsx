"use client";

import { createContext, useTransition } from "react";

interface Props {
    children: any;
    action?: (formData: FormData) => void;
    pad?: boolean;
    grow?: boolean;
}

export const contextLoading = createContext<boolean>(false);

export function Form({ children, action, pad = true, grow = true }: Props): JSX.Element {
    const [isPending, startTransition] = useTransition();

    const padding = pad ? "p-6" : "";
    const full = grow ? "w-full" : "";

    const global = `${padding} ${full}`;

    return (
        <contextLoading.Provider value={isPending}>
            <form className={"flex flex-col space-y-4 mx-auto justify-between items-center " + global} action={(formData) => (action ? startTransition(() => action(formData)) : undefined)}>
                {children}
            </form>
        </contextLoading.Provider>
    );
}
