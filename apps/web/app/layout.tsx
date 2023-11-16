import { META_COLOR, META_DESCRIPTION, META_IMAGE, META_TITLE, META_URL } from "@glimpz-io/config";
import { AnalyticsProvider } from "@glimpz-io/hooks";
import "@glimpz-io/ui/styles.css";
import { GeistSans } from "geist/font";
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL(META_URL),
    title: META_TITLE,
    description: META_DESCRIPTION,
    themeColor: META_COLOR,
    openGraph: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        images: META_IMAGE,
        url: META_URL,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    if (!MIXPANEL_TOKEN) throw Error("missing mixpanel token");

    const FACEBOOK_ID = process.env.NEXT_PUBLIC_FACEBOOK_ID;
    if (!FACEBOOK_ID) throw Error("missing facebook id");

    return (
        <html lang="en" className="bg-gradient-to-r from-neutral-950 to-zinc-950 min-w-fit">
            <AnalyticsProvider mixpanelToken={MIXPANEL_TOKEN} facebookId={FACEBOOK_ID}>
                <body className={GeistSans.className}>{children}</body>
            </AnalyticsProvider>
        </html>
    );
}
