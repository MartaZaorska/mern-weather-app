import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected: ${db.connection.host}`);
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}

export default connectDatabase;