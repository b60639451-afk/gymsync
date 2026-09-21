import type { VercelRequest, VercelResponse } from '@vercel/node';

// Demo data — shown when no real DB is available
const DEMO_BUDDIES = [
  {
    id: 1,
    gymName: 'FitLife Арбат',
    preferredTime: '07:00–09:00',
    comment: 'Нужна страховка на жиме от 90 кг 💪',
    status: 'active',
    createdAt: new Date().toISOString(),
    user: { id: 1, name: 'Алексей М.', telegramHandle: 'alex_m', city: 'Москва', district: 'ЦАО' },
    workout: { id: 1, title: 'PPL — Набор массы', targetGoal: 'mass', locationType: 'gym' },
  },
  {
    id: 2,
    gymName: 'Воркаут на Тверской',
    preferredTime: '18:00–20:00',
    comment: 'Ищу партнёра для уличных тренировок 🤸',
    status: 'active',
    createdAt: new Date().toISOString(),
    user: { id: 2, name: 'Даниил К.', telegramHandle: 'danil_k', city: 'Москва', district: 'ЦАО' },
    workout: { id: 2, title: 'Full Body — Выносливость', targetGoal: 'endurance', locationType: 'outdoor' },
  },
  {
    id: 3,
    gymName: 'Парк Горького',
    preferredTime: '06:30–08:00',
    comment: 'Бегаю 10 км, ищу компанию 🏃',
    status: 'active',
    createdAt: new Date().toISOString(),
    user: { id: 3, name: 'Мария С.', telegramHandle: 'maria_s', city: 'Москва', district: 'ЮАО' },
    workout: { id: 3, title: 'Кардио-план — Рельеф', targetGoal: 'cut', locationType: 'park' },
  },
  {
    id: 4,
    gymName: 'World Class Новослободская',
    preferredTime: '12:00–14:00',
    comment: 'Тренируюсь на массу, нужен напарник на присед 🏋️',
    status: 'active',
    createdAt: new Date().toISOString(),
    user: { id: 4, name: 'Иван Р.', telegramHandle: 'ivan_r', city: 'Москва', district: 'САО' },
    workout: { id: 4, title: 'Upper/Lower — Сила', targetGoal: 'mass', locationType: 'gym' },
  },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET /api/buddies ─────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { city, goal, status = 'active' } = req.query as Record<string, string>;

    let result = DEMO_BUDDIES.filter((b) => b.status === status);

    if (city) {
      const q = city.toLowerCase();
      result = result.filter(
        (b) =>
          b.gymName.toLowerCase().includes(q) ||
          b.user?.city?.toLowerCase().includes(q) ||
          b.user?.district?.toLowerCase().includes(q)
      );
    }
    if (goal) {
      result = result.filter((b) => b.workout?.targetGoal === goal);
    }

    return res.json(result);
  }

  // ── POST /api/buddies ────────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const {
      name, telegramHandle,
      city = '', district = '',
      gymName = '', preferredTime = '',
      comment = '', workoutId,
    } = req.body ?? {};

    if (!name || !telegramHandle) {
      return res.status(400).json({ error: 'name and telegramHandle are required' });
    }

    const user = { id: Date.now(), name, telegramHandle, city, district };
    const request = {
      id: Date.now() + 1,
      userId: user.id,
      workoutId: workoutId ?? null,
      gymName, preferredTime, comment,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    return res.status(201).json({ request, user });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
