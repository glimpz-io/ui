import { Text } from "@glimpzio/ui/text";
import { Container } from "@glimpzio/ui/container";
import { Index } from "../../components/auth/status";

interface Request {
    searchParams: {
        status?: "success" | "error" | "logout";
        referrer?: string;
    };
}

export default async function Page(req: Request): Promise<JSX.Element> {
    const { status, referrer } = req.searchParams;

    return (
        <Container direction="vertical" size="half">
            <Text type="small" alignment="centre">
                {status === "success" ? "Authentication Successful" : status === "error" ? "Authentication Failed" : status === "logout" ? "Logout Successful" : "Unknown Status"}
            </Text>
            <Index referrer={referrer} />
        </Container>
    );
}
