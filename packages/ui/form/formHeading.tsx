"use client";

interface Props {
    title: string;
    description: string;
}

export function FormHeading({ title, description }: Props): JSX.Element {
    return (
        <fieldset className="flex flex-col space-y-4 w-full items-center justify-start">
            <legend className="text-xl text-neutral-300 font-bold w-full">{title}</legend>
            <legend className="text-lg text-neutral-400 font-normal w-full">{description}</legend>
        </fieldset>
    );
}
