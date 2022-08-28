//Libraries
import express from 'express';
import passport from "passport";


//DB Model
import {reviewModel} from '../../database/allModels';

const Router = express.Router();

/*
Route    /review/:resid
Desc     get all reviews based on restaurant id
Params   resid
Access   Public
Method   GET 
*/

Router.get('/:resid',async (req,res)=>{
    try {
        const {resid} = req.params;
        const reviews = await reviewModel.find({restaurant:resid});
        return res.json({reviews})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route           /review/new
Des             Add new food review/rating
Params          none
BODY            review object
Access          Private
Method          POST
*/
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { _id } = req.session.passport.user._doc;
      const { reviewData } = req.body;
  
      await ReviewModel.create({ ...reviewData, user: _id });
  
      return res.json({ review: "Successfully Created Review." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/*
Route    /review/delete/:_id
Desc     Delete a review
Params   _id
Access   Public
Method   DELETE
*/

Router.delete('/delete/:_id',async (req,res)=>{
    try {
        const {_id} = req.params;
        await reviewModel.findByIdAndDelete(_id);
        return res.json({review:"Successfully deleted review"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default Router;