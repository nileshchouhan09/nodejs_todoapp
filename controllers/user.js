import e from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password") ;
 
  if (!user) return next(new ErrorHandler("Invalid email or password",404));
   
  const isMatch = await bcrypt.compare(password,user.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "invalid email or password",
    });

    sendCookie(user,res,`Welcome back ${user.name}`,200)
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exist",404));
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error)
  }
};

export const getMyProfile = async (req, res) => {
  
  try {
    res.status(200).json({success:true,user:req.user})
  } catch (error) {
    next(error);
  }
};

export const logout= (req,res)=>{
  res.status(200).cookie("token","",{
    expires:new Date(Date.now()),
    sameSite:process.env.NODE_ENV="Development"?"lax":none,
     secure:process.env.NODE_ENV="Development"?false:true,
  }).json({
    success:true,
    message:"logged out"
  })

}



