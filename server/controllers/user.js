import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: '30d'
  });

  res.cookie('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
}

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate("locations");

  if(user && (await user.checkPassword(password))){
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      unit: user.unit,
      locations: user.locations
    });
  }else{
    res.status(401);
    throw new Error("Invalid data");
  }
});

const signUpUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  
  if(userExists){
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username, email, password, unit: 'metric', locations: []
  });

  if(!user){
    res.status(400);
    throw new Error("Invalid user data");
  }
  
  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    unit: user.unit,
    locations: []
  });
});

const signOutUser = (req, res) => {
  res.cookie('auth', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({
    message: 'Sign out successfully'
  });
};

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("locations");
  
  if(!user){
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    unit: user.unit,
    locations: user.locations
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(!user){
    res.status(404);
    throw new Error("User not found");
  }

  const { username, email, unit, password } = req.body;

  user.username = username || user.username;
  user.email = email || user.email;
  user.unit = unit || user.unit;

  if(password){
    user.password = password;
  }

  const savedUser = await user.save();
  const updatedUser = await savedUser.populate("locations");

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    unit: updatedUser.unit,
    locations: updatedUser.locations
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  res.cookie('auth', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(204).json({
    message: 'Deleted account successfully'
  });
});

export {
  signInUser,
  signUpUser,
  signOutUser,
  getUser, 
  updateUser,
  deleteUser
};