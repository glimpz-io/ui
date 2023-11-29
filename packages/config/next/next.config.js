module.exports = {
    reactStrictMode: true,
    transpilePackages: ["@glimpzio/ui", "@glimpzio/hooks", "@glimpzio/config"],
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
