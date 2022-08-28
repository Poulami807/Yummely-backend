require('dotenv').config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

//configs
import googleAuthConfig from './config/google.config';
import routeConfig from "./config/route.config";

//DB Connection
import connectDB from './database/connection';

//Routes
import Auth from './API/Auth';
import Restaurant from './API/Restaurant';
import Food from './API/Food';
import Menu from './API/Menu';
import Image from './API/Images';
import Order from './API/Orders';
import Review from './API/Reviews';
import User from './API/User';
import Payment from './API/Payment';

//passport configuration
googleAuthConfig(passport)
routeConfig(passport);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(helmet());
app.use(session({ secret: 'food app' }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
    res.json({message: "Setup success"});
});

app.use("/auth",Auth);
app.use("/restaurant",Restaurant);
app.use("/food",Food);
app.use("/menu",Menu);
app.use("/image",Image);
app.use("/order",Order);
app.use("/review",Review);
app.use("/user",User);
app.use("/payment",Payment);

app.listen(4000,()=>{
connectDB()
.then(()=>console.log('server is running'))
.catch(()=>console.log('Server is running but db connection failed'))
}
);