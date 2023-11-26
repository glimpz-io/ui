import { Container } from "@glimpzio/ui/container";

interface Request {}

export default async function Page(req: Request): Promise<JSX.Element> {
    console.log(req);

    return (
        <Container direction="vertical" size="half">
            Hello World
        </Container>
    );
}
