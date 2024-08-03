// login, register, getMyProfile, logout

import {user, user, user} from '../models/user.js';
import bcrypt from "bcrypt";
import sendCookie from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';

export const login = async (req, res, next)=>{
    try{
        const {email, password} = req.body;
        const user = await user.findOne({email}).select("+password");
        if(!user) return next(new ErrorHandler("Invalid Email or Password", 400));
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));
        sendCookie(user, res, `Welcome back ${user.name}`, 200);
    }catch(err){
        next(err);
    }
};

export const register = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        let user = await user.findOne({email});
        if(user) return next(new ErrorHandler("User already exists", 400));
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await user.create({name, email, password: hashedPassword});
        sendCookie(user, res, "User Registered Successfully", 201);
    }catch(err){
        next(err);
    }
};

//have used middleware in routes of /me so req has user already captured
export const getMyProfile = (req, res)=>{
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logout = (req, res)=>{
    res.status(200)
       .cookie("token", "",{
        expires: new Date(Date.now()),
       })
       .json({
        success: true,
        user: req.user,
       });
};