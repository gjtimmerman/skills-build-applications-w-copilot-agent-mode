import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);