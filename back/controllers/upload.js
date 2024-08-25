import { deleteFile, uploadFile } from "../util/uploadFile.js";

export const uploadImage = async (req, res) => {
  const image = req.file;
  const url = await uploadFile(image);
  return res.status(200).json({ url });
};

export const deleteImage = async (req, res) => {
  const image = req.body.image;
  const url = await deleteFile(image);

  console.log(url);

  return res.status(200).json({ url });
};



export const uploadImageServer = async (image) => {
  const url = await uploadFile(image);
  return res.status(200).json({ url });
};

