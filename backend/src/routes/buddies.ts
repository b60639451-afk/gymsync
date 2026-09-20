import { Router, Request, Response } from 'express';
import { db } from '../db';
import { buddyRequests, users, workouts } from '../db/schema';
import { eq, and } from 'drizzle-orm';

const router = Router();

/**
 * GET /api/buddies
 * List active buddy requests with optional filters.
 * Query params: city, gymName, goal, status (default 'active')
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { city, goal, status = 'active' } = req.query as Record<string, string>;

    // Fetch all buddy requests then enrich with user + workout data
    const rows = db.select().from(buddyRequests).all();

    const enriched = rows
      .map((r) => {
        const user    = db.select().from(users).where(eq(users.id, r.userId)).get();
        const workout = r.workoutId
          ? db.select().from(workouts).where(eq(workouts.id, r.workoutId)).get()
          : null;

        return {
          id:            r.id,
          gymName:       r.gymName,
          preferredTime: r.preferredTime,
          comment:       r.comment,
          status:        r.status,
          createdAt:     r.createdAt,
          user: user ? {
            id:             user.id,
            name:           user.name,
            telegramHandle: user.telegramHandle,
            city:           user.city,
            district:       user.district,
          } : null,
          workout: workout ? {
            id:           workout.id,
            title:        workout.title,
            targetGoal:   workout.targetGoal,
            locationType: workout.locationType,
          } : null,
        };
      })
      .filter((r) => {
        // Status filter
        if (r.status !== status) return false;

        // City filter — matches gymName or user's city/district
        if (city) {
          const cityLower = city.toLowerCase();
          const inGym  = r.gymName.toLowerCase().includes(cityLower);
          const inCity = r.user?.city?.toLowerCase().includes(cityLower) ?? false;
          const inDist = r.user?.district?.toLowerCase().includes(cityLower) ?? false;
          if (!inGym && !inCity && !inDist) return false;
        }

        // Goal filter — match linked workout's targetGoal
        if (goal && r.workout?.targetGoal !== goal) return false;

        return true;
      });

    return res.json(enriched);
  } catch (err) {
    console.error('[GET /buddies]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/buddies
 * Publish a new buddy request (creates/upserts user, links workout).
 * Body: { name, telegramHandle, city, district, gymName, preferredTime, comment, workoutId? }
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      name,
      telegramHandle,
      city        = '',
      district    = '',
      gymName     = '',
      preferredTime = '',
      comment     = '',
      workoutId,
    } = req.body;

    if (!name || !telegramHandle) {
      return res.status(400).json({ error: 'name and telegramHandle are required' });
    }

    // Create user record
    const [user] = db.insert(users).values({
      name,
      telegramHandle,
      city,
      district,
    }).returning().all();

    // Create buddy request
    const [request] = db.insert(buddyRequests).values({
      userId:        user.id,
      workoutId:     workoutId ?? null,
      gymName,
      preferredTime,
      comment,
      status:        'active',
    }).returning().all();

    return res.status(201).json({ request, user });
  } catch (err) {
    console.error('[POST /buddies]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PATCH /api/buddies/:id/close
 * Mark a buddy request as closed.
 */
router.patch('/:id/close', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    db.update(buddyRequests)
      .set({ status: 'closed' })
      .where(eq(buddyRequests.id, id))
      .run();

    return res.json({ success: true });
  } catch (err) {
    console.error('[PATCH /buddies/:id/close]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
