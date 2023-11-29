import { META_COLOR_LANDING, META_DESCRIPTION_LANDING, META_IMAGE_LANDING, META_TITLE_LANDING, META_URL_LANDING, MODAL_PORTAL_ID } from "@glimpzio/config";
import { AnalyticsProvider } from "@glimpzio/hooks";
import "@glimpzio/ui/styles.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    metadataBase: new URL(META_URL_LANDING),
    title: META_TITLE_LANDING,
    description: META_DESCRIPTION_LANDING,
    openGraph: {
        title: META_TITLE_LANDING,
        description: META_DESCRIPTION_LANDING,
        images: META_IMAGE_LANDING,
        url: META_URL_LANDING,
    },
};

export const viewport: Viewport = {
    themeColor: META_COLOR_LANDING,
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
                    {children}
                </body>
            </AnalyticsProvider>
        </html>
    );
}
