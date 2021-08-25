import { connect } from "mongoose";

/**
 * Connecting to MongoDB
 */
export const connectDb = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to database");
  } catch (err) {
    console.error("Database has errored", err);
    throw err;
  }
};
