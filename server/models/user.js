import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Nazwa użytkownika jest wymagana"]
  },
  email: {
    type: String,
    required: [true, "Adres e-mail jest wymagany"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Hasło jest wymagane"]
  },
  unit: {
    type: String,
    enum: {
      values: ['standard', 'imperial', 'metric'],
      message: '{VALUE} - nieprawidłowa wartość'
    },
    default: 'metric'
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location'
  }]
}, {
  timestamps: true
});

UserSchema.methods.checkPassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

UserSchema.pre("save", async function(next){
  if(!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;