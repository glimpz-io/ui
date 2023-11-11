import { BASE_URL } from "@glimpz-io/config";
import { AnalyticsProvider } from "@glimpz-io/hooks";
import "@glimpz-io/ui/styles.css";
import { GeistSans } from "geist/font";
import type { Metadata } from "next";

const TITLE = "Join The Wait List - Glimpz";
const DESCRIPTION =
    "Say goodbye to awkward encounters with Glimpz! Streamline your social interactions and never miss a chance to connect. No more overthinking, just genuine face-to-face connections.";
const COLOR = "#f97316";
const IMAGE = "https://i.imgur.com/DVFU6Yg.png";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: TITLE,
    description: DESCRIPTION,
    themeColor: COLOR,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        images: IMAGE,
        url: BASE_URL,
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
