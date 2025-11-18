import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  diseases: [{ type: String }],
  benefits: [{ type: String }],
  ayurvedicProperties: {
    rasa: [{ type: String }],
    guna: [{ type: String }],
    virya: { type: String },
    vipaka: { type: String }
  },
  ingredients: [{ type: String }],
  preparation: { type: String },
  image: { type: String },
  featured: { type: Boolean, default: false }
});

export default mongoose.model('Food', foodSchema);
