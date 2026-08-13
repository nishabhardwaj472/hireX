import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.db.databaseName);

    const count = await mongoose.connection.db
      .collection("users")
      .countDocuments();

    console.log("Users in database:", count);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDb;