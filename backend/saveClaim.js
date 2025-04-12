import { connectToDatabase } from './mongodb.js';

export const saveClaim = async (claimData) => {
  try {
    const db = await connectToDatabase();
    const claimsCollection = db.collection('claims'); // Replace with your collection name
    const result = await claimsCollection.insertOne(claimData);
    console.log("Claim saved:", result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error("Error saving claim:", error);
    throw error;
  }
};