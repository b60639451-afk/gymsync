import express from 'express';
import cors from 'cors';
import { runMigrations } from './db';
import workoutsRouter from './routes/workouts';
import buddiesRouter from './routes/buddies';

// ─── App setup ────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT ?? 3001;

// Run DB migrations on startup (creates tables if not exist)
runMigrations();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/workouts', workoutsRouter);
app.use('/api/buddies',  buddiesRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🏋️  GymSync API running on http://localhost:${PORT}`);
});

export default app;
