import { META_COLOR, META_IMAGE, META_URL } from "@glimpz-io/config";
import "@glimpz-io/ui/styles.css";
import type { Metadata } from "next";

interface Request {
    params: {
        linkId: string;
    };
}

export async function generateMetadata(req: Request): Promise<Metadata> {
    const linkId = req.params.linkId;

    // throw Error("link is either expired or invalid");

    const title = "test";
    const description = "test";
    const url = `${META_URL}/app/profile/${linkId}`;

    return {
        metadataBase: new URL(META_URL),
        title: title,
        description: description,
        themeColor: META_COLOR,
        openGraph: {
            title: title,
            description: description,
            images: META_IMAGE,
            url: url,
        },
    };
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <div style={{ minWidth: 480 }}>{children}</div>;
}
