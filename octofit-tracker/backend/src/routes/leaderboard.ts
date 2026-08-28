import { Router } from 'express';

import { LeaderboardEntry } from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('userId', 'name email')
      .sort({ rank: 1 });
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;