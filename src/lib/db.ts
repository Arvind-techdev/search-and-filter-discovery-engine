import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://davearvind002:DaveArvind%40002@cluster0.l61tk8k.mongodb.net/B2B_marketplace";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var mongooseConnection: typeof mongoose | undefined;
}

export const connectDB = async () => {
  if (global.mongooseConnection) return global.mongooseConnection;
  const connection = await mongoose.connect(MONGODB_URI, {
    dbName: "B2B_marketplace",
    bufferCommands: false,
  });

  global.mongooseConnection = connection;
  return connection;
};
