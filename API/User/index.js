//Libraries
import express from 'express';
import passport from "passport";

//DB Model
import {userModel} from '../../database/allModels';

const Router = express.Router();

/*
Route           /
Des             Get authorised user data (signed in user)
Params          null
Access          Private
Method          GET
*/
Router.get("/", passport.authenticate("jwt"), (req, res) => {
    try {
      const { email, fullName, phoneNumber, address } =    //passport will automatically make an API request
        req.session.passport.user._doc;
  
      return res.json({ user: { email, fullName, phoneNumber, address } });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/*
Route    /user/:_id
Desc     get user data
Params   _id
Access   Public
Method   GET 
*/

Router.get('/:_id',async (req,res)=>{
    try {
        const {_id} = req.params;
        const getUser = await userModel.findById(_id);
        if(!getUser){
            return res.status(404).json({error:"User not found!" })
        }
      const { fullName } = getUser;
      return res.json({ user: { fullName } });
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route    /user/update/:_id
Desc     update user data
Params   _id
Body     user data
Access   Public
Method   POST 
*/

Router.put('/update/:_id',async (req,res)=>{
    try {
        const {userId} = req.params;
        const {userData} = req.body
        const updateUser = await orderModel.findByIdAndUpdate({
             userId,
        },{
             $set:userData,
        },{
            new: true
        });

        return res.json({user: updateUser})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default Router;