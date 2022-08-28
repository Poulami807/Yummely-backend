import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

//AWS S3 BUCKET Configuration
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});

 //create a promised based s3Upload
 export const s3Upload = (options) =>{
    return new Promise((resolve,reject) => s3Bucket.upload(options,(error,data) =>{
       if(error) return reject(error);
       return resolve(data);
    }))
 };