import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.auth;

  if(token){
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decoded.userId).select('-password');

      if(!user){
        res.status(401);
        throw new Error("Not authorized");
      }

      req.user = user;
      next();
    }catch(err){
      res.status(401);
      throw new Error("Not authorized");
    }
  }else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

export default authMiddleware;