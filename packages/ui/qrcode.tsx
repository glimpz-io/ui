import { QRCodeSVG } from "qrcode.react";

interface Props {
    className?: string;
    value: string;
    size: number;
}

export function QRCode({ className = "", value, size }: Props): JSX.Element {
    const global = `${className}`;

    return <QRCodeSVG className={`p-3 rounded-md bg-zinc-50 ${global}`} bgColor="#fafafa" fgColor="#09090b" value={value} size={378} />;
}
