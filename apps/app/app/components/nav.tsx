"use client";

import { Container } from "@glimpzio/ui";
import Link from "next/link";
import { AddressBook, Logout, Plug, User } from "tabler-icons-react";

const links: { [key: string]: () => JSX.Element } = { "/": () => <Plug />, "/connections": () => <AddressBook />, "/profile": () => <User />, "/api/auth/signout": () => <Logout /> };

export function Nav(): JSX.Element {
    return (
        <Container direction="horizontal" size="half">
            {Object.entries(links).map((x, i) => {
                const icon = x[1];

                return (
                    <Link key={i} className="text-neutral-500 hover:text-sky-500 transition-colors duration-200" href={x[0]}>
                        {icon()}
                    </Link>
                );
            })}
        </Container>
    );
}
