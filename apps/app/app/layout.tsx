import { META_COLOR_APP, META_DESCRIPTION_APP, META_IMAGE_APP, META_TITLE_APP, META_URL_APP, MODAL_PORTAL_ID } from "@glimpzio/config";
import { AnalyticsProvider } from "@glimpzio/hooks";
import "@glimpzio/ui/styles.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Nav } from "./components/nav";

export const metadata: Metadata = {
    metadataBase: new URL(META_URL_APP),
    title: META_TITLE_APP,
    description: META_DESCRIPTION_APP,
    openGraph: {
        title: META_TITLE_APP,
        description: META_DESCRIPTION_APP,
        images: META_IMAGE_APP,
        url: META_URL_APP,
    },
};

export const viewport: Viewport = {
    themeColor: META_COLOR_APP,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    if (!MIXPANEL_TOKEN) throw Error("missing mixpanel token");

    const FACEBOOK_ID = process.env.NEXT_PUBLIC_FACEBOOK_ID;
    if (!FACEBOOK_ID) throw Error("missing facebook id");

    return (
        <html lang="en" className="bg-gradient-to-r from-neutral-950 to-zinc-950 min-w-fit">
            <AnalyticsProvider mixpanelToken={MIXPANEL_TOKEN} facebookId={FACEBOOK_ID}>
                <body className={GeistSans.className}>
                    <div id={MODAL_PORTAL_ID} />
                    <Nav />
                    {children}
                </body>
            </AnalyticsProvider>
        </html>
    );
}
