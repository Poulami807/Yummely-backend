//Libraries
import express from 'express';
import passport, { session } from 'passport'

//DB Model
import {orderModel} from '../../database/allModels';

const Router = express.Router();

/*
Route    /order/:_id
Desc     get all orders based on id
Params   _id
Access   Public
Method   GET 
*/

Router.get('/:_id',passport.authenticate("jwt",{session:false}),async (req,res)=>{
    try {
        const {_id} = req.params;
        const orders = await orderModel.findOne({user:_id});
        if(!orders){
            return res.status(404).json({error:"User not found!" })
        }
        return res.json({orders})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route    /order/new
Desc     Add new order
Params   _id
Access   Public
Method   POST 
*/

Router.post('/new/:_id',passport.authenticate("jwt",{session:false}),async (req,res)=>{
    try {
        const {_id} = req.params;
        const {orderDetails} = req.body
        const addNewOrder = await orderModel.findByIdAndUpdate({
             user: _id,
        },{
             $push:{orderDetails},
        },{
            new: true
        })
        return res.json({order:addNewOrder})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default Router;