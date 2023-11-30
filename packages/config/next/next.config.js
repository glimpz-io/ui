module.exports = {
    reactStrictMode: true,
    transpilePackages: ["@glimpzio/ui", "@glimpzio/hooks", "@glimpzio/config"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d2p7w26hblzvud.cloudfront.net",
                port: "",
                pathname: "/*",
            },
        ],
    },
};
