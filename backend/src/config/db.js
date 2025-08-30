// In your connectDB file
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('connectDB called from:', new Error().stack);
    console.log('MONGO_URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;