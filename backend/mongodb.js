import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

let db;

export const connectToDatabase = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db("ClaimWiseAi"); // Replace with your database name
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return db;
};