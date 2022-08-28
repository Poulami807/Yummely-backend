import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    fullName: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String},
    address: [{details:{type:String},for:{type:String}}],  //array of objects
    phoneNumber:[{type:Number}],  //array for multiple phone no.s
},
{
    timestamps:true,
}
);

//statistics and methods
userSchema.methods.generateJwtToken = function(){
    return jwt.sign({user:this._id.toString()},"MyApp");
}
//login authentication
userSchema.statics.findByEmailAndPassword = async ({password,email}) => {
  const user = await userModel.findOne({email});
  if (!user) throw new Error("User Does not exists!!");
  // if user exists compare password
  const doesPwdMatch = await bcrypt.compare(password, user.password)
  if (!doesPwdMatch) throw new Error('Password does not match');

  return user;
} 

//sign up authentication
userSchema.statics.findByEmailAndPhone = async ({email, phoneNumber}) => {
    //check if user already exists
    const checkUserByEmail = await userModel.findOne({email}); //{email:email}
    const checkUserByPhone = await userModel.findOne({phoneNumber});
    if(checkUserByEmail || checkUserByPhone){
        throw new Error("User Already exists!");
    }
    return false;
}

//before saving to db, this function will be executed
//arrow function cannot be used for pre
//normal mongoose process will be carried out after next function is completed
//async await not required since we are using callbacks
userSchema.pre("save", function (next){
    const user = this  //data passed inside create

    //check if password is modified (whether user has entered password)
    if(!user.isModified("password")) return next(); //if password not entered carry on with next process
    bcrypt.genSalt(8,(error,salt)=>{
        if(error) return next(error);

        //hash password
        bcrypt.hash(user.password,salt,(error,hash)=>{
            if(error) return next(error);
             //assigning hashed password
             user.password = hash;
             return next() //return to normal mongoose workflow
        })
    })
    
})

export const userModel = mongoose.model('Users',userSchema);
