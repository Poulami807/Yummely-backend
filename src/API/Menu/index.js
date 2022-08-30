//Libraries
import express from 'express';

//DB Model
import {menuModel,imageModel} from '../../database/allModels';

const Router = express.Router();

/*
Route    menu/list/:_id
Desc     get all list of menu based on id
Params   _id
Access   Public
Method   GET 
*/

Router.get('/list/:_id',async (req,res)=>{
    try {
        const {_id} = req.params;
        const menus = await menuModel.findById(_id);

        return res.json({menus})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route    /menu/image/:_id
Desc     get all menu images
Params   _id
Access   Public
Method   GET 
*/

Router.get('/image/:_id',async (req,res)=>{
    try {
        const {_id} = req.params;
        const menus = await imageModel.findById(_id);

        return res.json({menus})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default Router;