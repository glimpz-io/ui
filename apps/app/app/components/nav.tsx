"use client";

import { Container, Text } from "@glimpzio/ui";
import Link from "next/link";
import { AddressBook, Logout, Plug, Settings } from "tabler-icons-react";

const links: { [key: string]: () => JSX.Element } = { "/": () => <Plug />, "/connections": () => <AddressBook />, "/settings": () => <Settings />, "/api/auth/signout": () => <Logout /> };

export function Nav(): JSX.Element {
    return (
        <Container direction="horizontal" size="half">
            {Object.entries(links).map((x) => {
                const icon = x[1];

                return (
                    <Link className="text-neutral-500 hover:text-sky-500 transition-colors duration-200" href={x[0]}>
                        {icon()}
                    </Link>
                );
            })}
        </Container>
    );
}
