import express, { json } from 'express';
import cors from 'cors';
import { connect, Schema, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(json());

// Debugging: Check if MONGODB_URI is loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// MongoDB connection setup using a hardcoded URI
const mongoURI = 'mongodb+srv://BotUser:boPwHbl9C2x6cKsL@cluster0.8f5jewx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Claim Schema and Model
const claimSchema = new Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }
});

const Claim = model('Claim', claimSchema);

// Create new claim
app.post('/api/claims', async (req, res) => {
  const { userId, description, imageUrl } = req.body;
  try {
    const newClaim = new Claim({ userId, description, imageUrl });
    const result = await newClaim.save();
    res.status(201).json({ message: 'Claim added', claimId: result._id });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

// Get claims for a user
app.get('/api/claims/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const claims = await Claim.find({ userId });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: 'Database fetch failed' });
  }
});

app.listen(5000, () => console.log('API running on http://localhost:5000'));
