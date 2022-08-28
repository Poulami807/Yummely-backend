import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    images: [{
        location: {type:String, required:true}, //images will be stored in AWS S3. location: sw3 public url
    }]
},
{
    timestamps:true,
}
);

export const imageModel = mongoose.model('Images',imageSchema);
