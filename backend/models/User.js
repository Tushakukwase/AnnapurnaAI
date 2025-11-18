import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  height: { type: Number },
  weight: { type: Number },
  activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'] },
  diseases: [{ type: String }],
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
