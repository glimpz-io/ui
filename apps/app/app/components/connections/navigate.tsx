"use client";

import { Button, Container } from "@glimpzio/ui";
import { useTransition } from "react";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import { updatePage } from "./actions";

interface ConnectionsProps {
    page: number;
    pageSize: number;
}

export default function Connections(props: ConnectionsProps): JSX.Element {
    const [isPending, startTransition] = useTransition();

    const backIcon = () => <ArrowLeft />;
    const forwardIcon = () => <ArrowRight />;

    return (
        <Container direction="horizontal" pad={false}>
            <Button
                type="button"
                color="gray"
                size="small"
                icon={backIcon}
                disabled={isPending}
                onClick={() => {
                    startTransition(async () => {
                        await updatePage(props.pageSize, props.page - 1);
                    });
                }}
            >
                Previous
            </Button>
            <Button
                type="button"
                color="gray"
                size="small"
                icon={forwardIcon}
                disabled={isPending}
                onClick={() => {
                    startTransition(async () => {
                        await updatePage(props.pageSize, props.page + 1);
                    });
                }}
            >
                Next
            </Button>
        </Container>
    );
}
