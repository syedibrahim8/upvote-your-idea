import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const URI = process.env.DB_URI;
    await mongoose.connect(URI);
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log(error, "Database failed to connect!!");
    process.exit(1);
  }
};

dbConnect();