//Libraries
import express from 'express';
import multer from 'multer';

//DB Model
import {imageModel} from '../../database/allModels';

//Upload to s3
import { s3Upload } from '../../Utils/AWS/S3';

const Router = express.Router();

//multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage});

/*
Route     /
Des       Get Image details
Params    _id
Access    Public
Method    GET  
*/
Router.get("/:_id", async (req, res) => {
    try {
      const image = await imageModel.findById(req.params._id);
  
      return res.json({ image });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/*
Route    /image
Desc     uploads given image to S3 bucket and saves file link to MongoDB
Params   None
Access   Public
Method   POST 
*/

Router.post('/',upload.array('file',4),async (req,res)=>{
    try {
        const file = req.file;
        //s3 bucket options
        const bucketOptions ={
            Bucket:'poulami',
            Key: file.originalname,   //file name
            Body: file.buffer, //image stored in memory
            ContentType: file.mimetype, //file type
            ACL: "public-read", //access control
        }
       
        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({uploadImage})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});

export default Router;