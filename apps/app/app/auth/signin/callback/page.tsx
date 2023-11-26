"use client";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Request {
    searchParams: {
        code?: string;
        state?: string;
    };
}

export default function Page(req: Request): null {
    const router = useRouter();

    const code = req.searchParams.code;
    if (!code) throw Error("missing code");
    const state = req.searchParams.state;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw Error("missing API url");

    const client = new ApolloClient({
        uri: apiUrl,
        cache: new InMemoryCache(),
        credentials: "include",
    });

    const query = gql`
        query ExchangeCode($code: String!) {
            exchangeAuthCode(code: $code)
        }
    `;

    useEffect(() => {
        client.query({ query, variables: { code: code } }).then((res) => {
            if (state) router.push(decodeURIComponent(state));
            else router.push("/");
        });
    }, [router]);

    return null;
}
