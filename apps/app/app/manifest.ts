import { BACKGROUND_COLOR, META_COLOR_APP, META_DESCRIPTION_APP, META_TITLE_APP } from "@glimpzio/config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: META_TITLE_APP,
        short_name: META_TITLE_APP,
        description: META_DESCRIPTION_APP,
        start_url: "/",
        display: "standalone",
        background_color: BACKGROUND_COLOR,
        theme_color: META_COLOR_APP,
        icons: [
            {
                src: "/favicon.ico",
                sizes: "48x48",
                type: "image/x-icon",
            },
            {
                src: "/images/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
