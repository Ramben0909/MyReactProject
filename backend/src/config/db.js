import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    // List collections to confirm users & wishlists exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📂 Collections in DB:", collections.map(c => c.name));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
