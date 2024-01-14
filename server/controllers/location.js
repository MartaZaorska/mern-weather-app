import asyncHandler from 'express-async-handler';

import User from '../models/user.js';
import Location from '../models/location.js';

const getLocation = async (data) => {
  const locationExists = await Location.findOne({ lat: data.lat, lon: data.lon });

  if(locationExists){
    return locationExists;
  }

  const location = await Location.create({ ...data });
  return location;
}

const addLocation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(!user){
    res.status(404);
    throw new Error("User not found");
  }

  const location = await getLocation(req.body);

  if(!location){
    res.status(400);
    throw new Error("Invalid location data");
  }

  user.locations = [ ...user.locations, location._id ];

  const savedUser = await user.save();
  const updatedUser = await savedUser.populate("locations");

  res.json({ locations: updatedUser.locations });
});

const deleteLocation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(!user){
    res.status(404);
    throw new Error("User not found");
  }

  user.locations = [ ...user.locations ].filter(location => String(location) !== String(req.params.id));

  const savedUser = await user.save();
  const updatedUser = await savedUser.populate("locations");

  res.json({ locations: updatedUser.locations });
});

export {
  addLocation,
  deleteLocation
};