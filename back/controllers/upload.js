import { uploadFile } from "../util/uploadFile.js";

export const uploadImage = async (req, res) => {
    const image = req.file;
    const url = await uploadFile(image);
    return res.status(200).json({ url });
};
