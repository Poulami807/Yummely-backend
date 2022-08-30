import googleOAuth from 'passport-google-oauth20';

import { userModel} from '../database/allModels';

const googleStrategy = googleOAuth.Strategy;

export default (passport) => {
      passport.use(
        new googleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:4000/auth/google/redirect"  //after google authentication, user will be redirected to this route
            },
         //  after authenticating by google, these values will be received 
        async (accessToken,refreshToken,profile,done) => {     //done -> first parameter:for google; second parameter:to display to user
            //creating a new user object
            const newUser = {
                fullName:profile.displayName,
                email: profile.emails[0].value,
                profilePic: profile.photos[0].value,
            };
            try {
                //check if user already exists
                const user =  await userModel.findOne({email:newUser.email});
                if (user){
                    //generate token
                    const token = user.generateJwtToken();
                    done(null,{user,token})
                }
                else{
                    //create new user
                    const user =await userModel.create(newUser);

                    //generate token
                    const token = user.generateJwtToken();
                    done(null,{user,token})
                }
            } catch (error) {
                done(error,null)
            }
        }
        )
      );
      passport.serializeUser((userData,done) => done(null,{...userData}));
      passport.deserializeUser((id,done) => done(null,id));
}