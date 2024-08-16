
import AWS from 'aws-sdk';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

function generateUniqueName(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'us-west-2'
});

const s3 = new AWS.S3();

const bucketName = 'constructig';

export const uploadFile = (file) => {

    console.log(file)

    const params = {
        Bucket: bucketName,
        Key: generateUniqueName(file.fieldname),
        Body: file.buffer,
        ContentType: file.mimetype,
    };


    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file:', err);
                reject(err);
            } else {
                console.log(`File uploaded successfully. ${data.Location}`);
                resolve(data.Location);
            }
        });
    });
};


