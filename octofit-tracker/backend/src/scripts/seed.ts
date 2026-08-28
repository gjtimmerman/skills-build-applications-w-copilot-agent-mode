import mongoose from 'mongoose';

import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamIds = {
      trailBlazers: new mongoose.Types.ObjectId(),
      strengthSquad: new mongoose.Types.ObjectId(),
    };

    const userIds = {
      mona: new mongoose.Types.ObjectId(),
      hubert: new mongoose.Types.ObjectId(),
      grace: new mongoose.Types.ObjectId(),
      ada: new mongoose.Types.ObjectId(),
    };

    await Team.insertMany([
      {
        _id: teamIds.trailBlazers,
        name: 'Trail Blazers',
        description: 'A cardio-focused team logging runs, hikes, and long rides.',
        members: [userIds.mona, userIds.hubert],
        weeklyGoalMinutes: 420,
      },
      {
        _id: teamIds.strengthSquad,
        name: 'Strength Squad',
        description: 'A balanced training group focused on strength and mobility.',
        members: [userIds.grace, userIds.ada],
        weeklyGoalMinutes: 360,
      },
    ]);

    await User.insertMany([
      {
        _id: userIds.mona,
        name: 'Mona Octocat',
        email: 'mona@example.com',
        role: 'athlete',
        teamId: teamIds.trailBlazers,
        totalPoints: 1280,
      },
      {
        _id: userIds.hubert,
        name: 'Hubert Farnsworth',
        email: 'hubert@example.com',
        role: 'coach',
        teamId: teamIds.trailBlazers,
        totalPoints: 1120,
      },
      {
        _id: userIds.grace,
        name: 'Grace Hopper',
        email: 'grace@example.com',
        role: 'athlete',
        teamId: teamIds.strengthSquad,
        totalPoints: 1040,
      },
      {
        _id: userIds.ada,
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        role: 'athlete',
        teamId: teamIds.strengthSquad,
        totalPoints: 980,
      },
    ]);

    await Activity.insertMany([
      {
        userId: userIds.mona,
        type: 'run',
        durationMinutes: 32,
        caloriesBurned: 310,
        activityDate: new Date('2026-08-24T13:30:00Z'),
        notes: 'Tempo run through the neighborhood loop.',
      },
      {
        userId: userIds.hubert,
        type: 'cycle',
        durationMinutes: 48,
        caloriesBurned: 420,
        activityDate: new Date('2026-08-25T15:00:00Z'),
        notes: 'Moderate outdoor ride with two hill repeats.',
      },
      {
        userId: userIds.grace,
        type: 'strength',
        durationMinutes: 40,
        caloriesBurned: 260,
        activityDate: new Date('2026-08-26T11:15:00Z'),
        notes: 'Full-body kettlebell session and core work.',
      },
      {
        userId: userIds.ada,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 150,
        activityDate: new Date('2026-08-27T12:00:00Z'),
        notes: 'Mobility-focused recovery flow.',
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: userIds.mona, rank: 1, points: 1280, weeklyMinutes: 210 },
      { userId: userIds.hubert, rank: 2, points: 1120, weeklyMinutes: 185 },
      { userId: userIds.grace, rank: 3, points: 1040, weeklyMinutes: 165 },
      { userId: userIds.ada, rank: 4, points: 980, weeklyMinutes: 150 },
    ]);

    await Workout.insertMany([
      {
        title: 'Starter Cardio Circuit',
        level: 'beginner',
        durationMinutes: 25,
        focus: 'cardio endurance',
        exercises: ['jumping jacks', 'bodyweight squats', 'mountain climbers', 'cooldown walk'],
      },
      {
        title: 'Trail Runner Strength',
        level: 'intermediate',
        durationMinutes: 40,
        focus: 'lower-body strength',
        exercises: ['walking lunges', 'step-ups', 'single-leg deadlifts', 'plank holds'],
      },
      {
        title: 'Recovery Mobility Flow',
        level: 'beginner',
        durationMinutes: 30,
        focus: 'mobility and recovery',
        exercises: ['cat-cow', 'hip openers', 'hamstring stretch', 'box breathing'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
