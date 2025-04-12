import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Check if MONGODB_URI is loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the .env file');
}

const client = new MongoClient(uri);

let db;
client.connect()
  .then(() => {
    db = client.db('Cluster0'); // Replace with your database name
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// API Endpoint to Save Claim
app.post('/api/claims', async (req, res) => {
  try {
    const claimData = req.body;
    const claimsCollection = db.collection('claims'); // Replace with your collection name
    const result = await claimsCollection.insertOne(claimData);
    res.status(201).json({ message: 'Claim submitted successfully', claimId: result.insertedId });
  } catch (error) {
    console.error('Error saving claim:', error);
    res.status(500).json({ message: 'Failed to submit the claim', error: error.message });
  }
});

// API Endpoint to Fetch Claims by User ID
app.get('/api/claims/:userId', async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from the request params
    const claimsCollection = db.collection('claims');
    const claims = await claimsCollection.find({ userId }).toArray(); // Fetch claims for the user
    res.status(200).json(claims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ message: 'Failed to fetch claims', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});