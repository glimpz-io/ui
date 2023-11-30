"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadProfilePicture } from "./actions";
import { Button, Container, Form } from "@glimpzio/ui";

interface Props {
    className?: string;
    onChange: (fileUrl: string) => void;
    size: number;
    defaultValue?: string;
}

export function UploadPicture({ className = "", defaultValue, size, onChange }: Props): JSX.Element | null {
    const [value, setValue] = useState<string | null>(defaultValue ? defaultValue : null);
    const [file, setFile] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState<boolean>(false);

    const global = `${className}`;

    const inputId = "profile-picture-input";

    const fieldFile = "file";

    // TODO
    // - Fix the create component like this one, add the form upload to the main action and have it be its own FormComponent (and just use the action and parse it at runtime for the upload),
    // move the image to the server side, deploy
    // ALSO FIX THE PICTURE BEING OVERLAYED OVER THE MODAL ????

    return (
        <Container direction="vertical" pad={false}>
            <label className="text-neutral-400 text-sm w-full text-left" htmlFor={inputId}>
                Profile picture (displayed publicly)
            </label>
            {value && (
                <label htmlFor={inputId}>
                    <Image src={value} alt="Profile picture" width={size} height={size} className={`rounded-full cursor-pointer drop-shadow-md ${global}`} />
                </label>
            )}
            <Form
                pad={false}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises -- server actions
                action={async (formData) => {
                    const url = await uploadProfilePicture(fieldFile, formData);
                    setValue(url);
                    onChange(url);
                    setFile(null);
                    setUploaded(true);
                }}
            >
                <input
                    id={inputId}
                    type="file"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files === null) return;

                        const file = Array.from(files)[0];
                        setFile(file);
                    }}
                    className="text-neutral-400 w-full"
                    name={fieldFile}
                    accept=".jpg, .jpeg, .png"
                />
                <Button color="blue" size="small" type="submit">
                    Upload
                </Button>
            </Form>
        </Container>
    );
}
