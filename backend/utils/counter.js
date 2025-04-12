import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number
});

const Counter = mongoose.model('Counter', counterSchema);

export const getNextSequenceValue = async (sequenceName) => {
  const result = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return result.sequence_value;
};
