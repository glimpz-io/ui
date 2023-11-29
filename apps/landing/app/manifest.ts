import { BACKGROUND_COLOR, META_COLOR_LANDING, META_DESCRIPTION_LANDING, META_TITLE_LANDING } from "@glimpzio/config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: META_TITLE_LANDING,
        short_name: META_TITLE_LANDING,
        description: META_DESCRIPTION_LANDING,
        start_url: "/",
        display: "standalone",
        background_color: BACKGROUND_COLOR,
        theme_color: META_COLOR_LANDING,
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
