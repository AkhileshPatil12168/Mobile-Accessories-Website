const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();

const s3 = new S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
});

let uploadFile = (file, path) => {
    return new Promise(function (resolve, reject) {
        const uploadParams = {
            Bucket: process.env.buketName,
            Key: path + file.originalname,
            Body: file.buffer,
        };

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ error: err });
            }

            return resolve(data.Location);
        });
    });
};

module.exports = uploadFile;
