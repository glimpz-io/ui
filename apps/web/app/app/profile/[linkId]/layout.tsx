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

    return {
        title: "test",
        description: "test",
        openGraph: {
            title: "test",
            description: "test",
        },
    };
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <div style={{ minWidth: 480 }}>{children}</div>;
}
