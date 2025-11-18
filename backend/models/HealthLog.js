import mongoose from 'mongoose';

const healthLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  waterIntake: { type: Number },
  caloriesConsumed: { type: Number },
  sleep: { type: Number },
  steps: { type: Number },
  mood: { type: String }
});

export default mongoose.model('HealthLog', healthLogSchema);
