import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //If already connected, return
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  //Connect to MongoDB

  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
