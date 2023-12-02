import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import dynamic from "next/dynamic";

const Index = dynamic(() => import("../../components/auth/status"), { ssr: false });

interface Request {
    searchParams: {
        status?: "success" | "logout";
        referer?: string;
    };
}

export default function Page(req: Request): JSX.Element {
    const { status, referer } = req.searchParams;

    let message: string;
    if (status === "success") message = "Authentication successful.";
    else if (status === "logout") message = "Logout successful.";
    else throw Error("invalid status");

    return (
        <Container direction="vertical" size="half">
            <Text type="small" alignment="centre">
                {message}
            </Text>
            <Index referer={referer} />
        </Container>
    );
}
