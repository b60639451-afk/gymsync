import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generatePlan } from '../_lib/splitGenerator';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { locationType, goal, daysPerWeek, selectedDays, preferredTime } = req.body ?? {};

    if (!locationType || !goal || !daysPerWeek || !selectedDays) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const plan = generatePlan({ locationType, goal, daysPerWeek, selectedDays, preferredTime });
    const workoutId = Date.now(); // mock ID (no DB on Vercel)

    return res.json({ plan, workoutId });
  } catch (err: unknown) {
    console.error('[POST /api/workouts/generate]', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Internal server error' });
  }
}
