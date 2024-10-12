// cropImage.ts
export const getCroppedImg = async (imageSrc: string, pixelCrop: any) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Could not get canvas context");
    }

    // Встановлюємо розміри canvas на основі обрізаних пікселів
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Малюємо обрізане зображення на canvas
    ctx.drawImage(
        image,
        pixelCrop.x, // x позиція початку обрізання
        pixelCrop.y, // y позиція початку обрізання
        pixelCrop.width, // ширина обрізаного зображення
        pixelCrop.height, // висота обрізаного зображення
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Повертаємо canvas як Blob
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
            }
            resolve(blob);
        }, "image/jpeg");
    });
};

function createImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
    });
}
