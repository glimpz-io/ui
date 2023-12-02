export function cropToSquare(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const small = Math.min(img.width, img.height);

            canvas.width = small;
            canvas.height = small;

            const startX = (img.width - small) / 2;
            const startY = (img.height - small) / 2;

            ctx!.drawImage(img, startX, startY, small, small, 0, 0, small, small);

            canvas.toBlob((blob) => {
                if (blob) {
                    const croppedFile = new File([blob], file.name, { type: file.type });
                    resolve(croppedFile);
                } else {
                    reject(new Error("failed to create blob from canvas"));
                }
            }, file.type);
        };

        img.onerror = reject;
    });
}

export function resizeSquare(file: File, width: number): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = width;
            canvas.height = width;

            ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, width);

            canvas.toBlob((blob) => {
                if (blob) {
                    const croppedFile = new File([blob], file.name, { type: file.type });
                    resolve(croppedFile);
                } else {
                    reject(new Error("failed to create blob from canvas"));
                }
            }, file.type);
        };

        img.onerror = reject;
    });
}
