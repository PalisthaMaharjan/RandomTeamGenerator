

// import mongoose from "mongoose";

// const connectMongoDB = async() =>{
//   try{
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("COnnect to MOngo DB")
//   } catch (error) {
//     console.log(error)
//   }
// }

// export default connectMongoDB;

// dbConnect.js
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds (adjust as needed)
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw the error to prevent the app from continuing
  }
};

export default connectMongoDB;
