module.exports = {
    reactStrictMode: true,
    transpilePackages: ["@glimpzio/ui"],
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
                port: "",
                pathname: "/*",
            },
        ],
    },
};
