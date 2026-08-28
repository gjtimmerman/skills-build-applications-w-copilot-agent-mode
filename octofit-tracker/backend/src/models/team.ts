import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Team = model('Team', teamSchema);