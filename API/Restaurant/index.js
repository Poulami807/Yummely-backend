//Libraries
import express from 'express';

//DB Model
import {restaurantModel} from '../../database/allModels';

//validation
import { validateRestaurantCity, validateRestaurantSearchString } from '../../Validation/restaurant';
import { validateRestaurantId } from '../../Validation/food';

const Router = express.Router();

/*
Route    /restaurant
Desc     get restaurants at given location
Params   none
Access   Public
Method   GET 
*/

Router.get('/',async (req,res)=>{
    try {
        await validateRestaurantCity(req.query);
        const {city} = req.query;
        const restaurants = await restaurantModel.find({city});

        return res.json({restaurants})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route    /restaurant/:_id
Desc     get individual restaurant details based on id
Params   id
Access   Public
Method   GET 
*/

Router.get('/:_id',async (req,res)=>{
    try {
        await validateRestaurantId(req.params);
        const {_id} = req.params;
        const restaurant = await restaurantModel.findById(_id);
        if(!restaurant){
            return res.status(404).json({error:"Restaurant Not Found"})
        }

        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
/*
Route    /restaurant/search
Desc     get restaurant details based on search string
Params   none
Access   Public
Method   GET 
*/

Router.get('/search',async (req,res)=>{
    try {
        await validateRestaurantSearchString(req.body)
        const {searchString} = req.body;
        const restaurants = await restaurantModel.find({
            name:{$regex:searchString, $options:"i"}, //i->case insensitive
        });
        if(!restaurant){
            return res.status(404).json({error:`No restaurant matched with ${searchString}`})
        }

        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default Router;