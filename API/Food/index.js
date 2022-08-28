//Libraries
import express from 'express';

//DB Model
import {foodModel} from '../../database/allModels';

//validation
import { validateRestaurantId,validateCategory} from '../../Validation/auth';

const Router = express.Router();

/*
Route           /food/:_id
Des             Get specific food
Params          _id
Access          Public
Method          GET
*/
Router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const foods = await foodModel.findById(_id);
      return res.json({ foods });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/*
Route    food/res/:id
Desc     get all food related to particular restaurant
Params   id
Access   Public
Method   GET 
*/

Router.get('/res/:_id',async (req,res)=>{
    try {
        await validateRestaurantId(req.params);
        const {_id} = req.params;
        const foods = await foodModel.find({restaurant:_id});

        return res.json({foods})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route    /food/cat/:category
Desc     get all food based on category in a restaurant
Params   none
Access   Public
Method   GET 
*/

Router.get('/cat/:category',async (req,res)=>{
    try {
        await validateCategory(req.params);
        const {category} = req.params;
        const foods = await restaurantModel.find({
            category:{$regex:category,$options:"i"}
        });
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default Router;