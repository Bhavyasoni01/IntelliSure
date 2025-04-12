import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  userId: Number,
  type: String,
  amount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export const Claim = mongoose.model('Claim', claimSchema);

app.post('/api/claims', async (req, res) => {
  try {
    const claimData = req.body;
    const claimsCollection = db.collection('claims'); // Replace with your collection name
    const result = await claimsCollection.insertOne(claimData);
    res.status(201).json({ message: 'Claim submitted successfully', claimId: result.insertedId });
  } catch (error) {
    console.error('Error saving claim:', error); // Log the error
    res.status(500).json({ message: 'Failed to submit the claim', error: error.message });
  }
});
