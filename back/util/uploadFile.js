import AWS from "aws-sdk";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

function generateUniqueName(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: "us-west-2",
});

const s3 = new AWS.S3();

const bucketName = "constructig";

export const uploadFile = (file) => {
  const params = {
    Bucket: bucketName,
    Key: generateUniqueName(file.originalname),
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(data.Location);
      }
    });
  });
};

export const uploadFiles = (files) => {
  // Використовуємо Promise.all для завантаження всіх файлів
  const uploadPromises = files.map((file) => uploadFile(file));

  return Promise.all(uploadPromises)
    .then((locations) => {
      console.log("All files uploaded successfully:", locations);
      return locations; // Повертаємо масив посилань
    })
    .catch((err) => {
      console.error("Error uploading files:", err);
      throw err;
    });
};


export const deleteFile = (filename) => {
  const params = {
    Bucket: bucketName,
    Key: filename,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error("Error deleting file:", err);
        reject(err);
      } else {
        console.log(`File deleted successfully: ${filename}`);
        resolve(`File deleted successfully: ${filename}`);
      }
    });
  });
};