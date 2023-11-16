module.exports = {
    reactStrictMode: true,
    transpilePackages: ["@glimpz-io/ui"],
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
            {
                protocol: "https",
                hostname: "media.licdn.com",
                port: "",
                pathname: "/*",
            },
        ],
        domains: ["media.licdn.com"],
    },
};
