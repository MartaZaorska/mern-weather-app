import mongoose from 'mongoose';

const LocationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lon: {
    type: String,
    required: true
  }
});

const Location = mongoose.model("Location", LocationSchema);

export default Location;