import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    isVeg:{type:Boolean,required:true},
    isContainingEgg:{type:Boolean,required:true},
    category:{type:String,required:true},
    photos:{
        type: mongoose.Types.ObjectId,   //relation between food schema and images schema
        ref:"Images",
    },
    price:{type:Number,default:150,required:true},
    addOns:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Foods",
        }
    ],
    restaurant:{
        type:mongoose.Types.ObjectId,
        ref:"Restaurants",
        required:true,
    }

},
{
    timestamps:true,
}
);

export const foodModel = mongoose.model('Foods',foodSchema);
