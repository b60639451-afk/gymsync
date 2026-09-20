import { Router, Request, Response } from 'express';
import { generatePlan, GeneratorInput } from '../services/splitGenerator';
import { db } from '../db';
import { workouts } from '../db/schema';

const router = Router();

/**
 * POST /api/workouts/generate
 * Generate a workout plan from user parameters.
 * Body: { locationType, goal, daysPerWeek, selectedDays, preferredTime? }
 * Returns the generated plan + persists it to DB (optional userId).
 */
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const input: GeneratorInput = req.body;

    // Validate required fields
    const { locationType, goal, daysPerWeek, selectedDays } = input;
    if (!locationType || !goal || !daysPerWeek || !selectedDays) {
      return res.status(400).json({ error: 'Missing required fields: locationType, goal, daysPerWeek, selectedDays' });
    }
    if (![2, 3, 4].includes(daysPerWeek)) {
      return res.status(400).json({ error: 'daysPerWeek must be 2, 3, or 4' });
    }
    if (selectedDays.length < daysPerWeek) {
      return res.status(400).json({ error: `selectedDays must have at least ${daysPerWeek} entries` });
    }

    // Run the generator algorithm
    const plan = generatePlan(input);

    // Persist to DB (workoutId returned for buddy-request linking)
    const [saved] = db.insert(workouts).values({
      title:        plan.title,
      targetGoal:   plan.goal,
      locationType: plan.location,
      scheduleDays: JSON.stringify(selectedDays),
      exercises:    JSON.stringify(plan.weeklyPlan),
    }).returning().all();

    return res.json({ plan, workoutId: saved.id });
  } catch (err) {
    console.error('[POST /workouts/generate]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/workouts
 * List recent generated workouts (last 20).
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const list = db.select().from(workouts).limit(20).all();
    return res.json(list);
  } catch (err) {
    console.error('[GET /workouts]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
