import { HttpLink } from "@apollo/client";
import { NextSSRInMemoryCache, NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export function getClient(apiUrl: string) {
    const { getClient } = registerApolloClient(() => {
        return new NextSSRApolloClient({
            cache: new NextSSRInMemoryCache(),
            link: new HttpLink({
                uri: apiUrl,
            }),
        });
    });

    return getClient;
}
