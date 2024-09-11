import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../../services/upload-images/uploadImages";
import Button from "../../UI/button/Button";
import { createItem } from "../../../services/services/services";

const CreateItem = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [siteId, setSiteId] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const onDrop = async (acceptedFiles: any) => {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);

        if (token) {
            try {
                const res = await uploadImage(formData, token);
                setImage(res.url);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!name || !description || !price || !image || !categoryId || !siteId) {
            alert("Please fill all the fields.");
            return;
        }

        const newItem = {
            name,
            description,
            price,
            image,
            categoryId,
            siteId,
        };


        if (token) {
            try {
                const response = await createItem(newItem, token);
                if (response.status === 201) {
                    alert("Item created successfully!");
                    navigate("/items"); // наприклад, перенаправлення до списку товарів
                } else {
                    console.error("Error creating item:", response.message);
                }
            } catch (error) {
                console.error("Error creating item:", error);
            }
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Category ID
                    </label>
                    <input
                        type="text"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Site ID
                    </label>
                    <input
                        type="text"
                        value={siteId}
                        onChange={(e) => setSiteId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <div {...getRootProps()} className="p-4 border border-dashed border-gray-300 rounded-md">
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the image here...</p>
                        ) : (
                            <p>Drag 'n' drop an image here, or click to select one</p>
                        )}
                    </div>
                    {image && (
                        <img
                            src={image}
                            alt="Item preview"
                            className="mt-2 h-48 w-48 object-cover"
                        />
                    )}
                </div>
                <Button handleButtonClick={handleSubmit} />
            </form>
        </div>
    );
};

export default CreateItem;
