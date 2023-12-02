export function cropImage(file: File, startX: number, startY: number, cropWidth: number, cropHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = cropWidth;
            canvas.height = cropHeight;

            ctx!.drawImage(img, startX, startY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            canvas.toBlob((blob) => {
                if (blob) {
                    const croppedFile = new File([blob], file.name, { type: file.type });
                    resolve(croppedFile);
                } else {
                    reject(new Error("Failed to create blob from canvas"));
                }
            }, file.type);
        };

        img.onerror = reject;
    });
}
