//Library
import express from 'express';
import passport from 'passport';

//Models
import {userModel} from '../../database/user/index';

//validation
import { validateSignup,validateSignin } from '../../Validation/auth';

const Router = express.Router();

/*
Route    /auth/signup
Desc     Register a new user
Params   none
Access   Public
Method   POST 
*/
Router.post("/signup", async (req,res)=>{
    try {
        await validateSignup(req.body.credentials); 

        //check if user already exists
        await userModel.findByEmailAndPhone(req.body.credentials);

        //password encryption -> inside pre (before saving to db)
        //save to db
        const newUser = await userModel.create(req.body.credentials);
        
        //generating JWT auth token for session storage

        // const token = jwt.sign({user:{fullName,email}},"MyApp"); //creating token

        const token = newUser.generateJwtToken()

        return res.status(200).json({token,status:"sign up success"});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});
/*
Route    /auth/signin
Desc     Signing in with email and password
Params   none
Access   Public
Method   POST 
*/
Router.post("/signin",async (req,res)=>{
    try {
        await validateSignin(req.body.credentials); 
        const user = await userModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken();
        return res.status(200).json({token,status:"Login success"});

    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route    /auth/google
Desc     Google authentication
Params   none
Access   Public
Method   GET 
*/

//scope specifies the user data we want
Router.get('/google', passport.authenticate("google",{
    scope:[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
}))

/*
Route    /auth/google/redirect
Desc     Google authentication callback route
Params   none
Access   Public
Method   GET 
*/
Router.get('/google/redirect', passport.authenticate("google",{failureRedirect:'/'}),
    (req,res) => {
        // return res.json(
        //     {token: req.session.passport.user.token}
        // )
        return res.redirect(
            `http://localhost:3000/google/${req.session.passport.user.token}`
          );
    }
)
export default Router;