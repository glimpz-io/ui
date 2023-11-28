"use client";

import { Button, Container, Copy, Modal, QRCode, Text } from "@glimpzio/ui";
import { useAnalytics } from "@glimpzio/hooks";
import { useState } from "react";
import { Plus } from "tabler-icons-react";

interface InviteProps {}

export function Create(props: InviteProps): JSX.Element {
    const analytics = useAnalytics();
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Container direction="horizontal" pad={false}>
                <Text type="h3">New Connection</Text>
                <Container grow={false} pad={false}>
                    <Button onClick={() => setShowModal(true)} color="blue" icon={() => <Plus />} size="small" type="button">
                        New
                    </Button>
                </Container>
            </Container>
            <Modal
                title="Create Custom Connection"
                showModal={showModal}
                setShowModal={(show) => {
                    setShowModal(show);
                }}
            >
                Test
            </Modal>
        </>
    );
}
