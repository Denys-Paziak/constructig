import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './utils/cropImage'; // ця функція дозволяє отримати кропнуте зображення

const ImageCropper = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => setImageSrc(reader.result));
        reader.readAsDataURL(file);
    };

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imageSrc]);

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imageSrc && (
                <div style={{ position: 'relative', width: '100%', height: 400 }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1} // пропорції зображення, можна змінювати
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
            )}
            <button onClick={showCroppedImage}>Crop Image</button>
            {croppedImage && <img src={croppedImage} alt="Cropped" />}
        </div>
    );
};

export default ImageCropper;
