//for checking whether user has JWT token or not and whether session is valid

import JWTPassport from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config({
    path:require('path').resolve(__dirname,'../.env'),
})

//database model
import { userModel } from '../database/user';

const JWTStrategy = JWTPassport.Strategy;
const extractJWT = JWTPassport.ExtractJwt; //extract jwt from the req header

const options = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "MyApp"
}

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async (jwt__payload,done) => {    //jwt payload -> encrypted data inside jwt token (user id)
             try {
                const doesUserExist = await userModel.findById(jwt__payload.user);
                if(!doesUserExist) return done(null,false);
                return done(null,doesUserExist);
             } catch (error) {
                throw new Error(error)
             }
        })
    )
}