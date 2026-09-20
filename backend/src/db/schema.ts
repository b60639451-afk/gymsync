import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ─── Users ───────────────────────────────────────────────────────────────────
export const users = sqliteTable('users', {
  id:              integer('id').primaryKey({ autoIncrement: true }),
  name:            text('name').notNull(),
  telegramHandle:  text('telegram_handle').notNull(),
  city:            text('city').notNull().default(''),
  district:        text('district').notNull().default(''),
  createdAt:       text('created_at').notNull().default(sql`(datetime('now'))`),
});

// ─── Workouts ─────────────────────────────────────────────────────────────────
// exercises and schedule_days are stored as JSON strings
export const workouts = sqliteTable('workouts', {
  id:            integer('id').primaryKey({ autoIncrement: true }),
  userId:        integer('user_id'),
  title:         text('title').notNull(),
  targetGoal:    text('target_goal').notNull(),   // 'mass' | 'cut' | 'endurance'
  locationType:  text('location_type').notNull(), // 'gym' | 'outdoor' | 'park' | 'home'
  scheduleDays:  text('schedule_days').notNull().default('[]'),   // JSON string
  exercises:     text('exercises').notNull().default('[]'),       // JSON string
  createdAt:     text('created_at').notNull().default(sql`(datetime('now'))`),
});

// ─── BuddyRequests ───────────────────────────────────────────────────────────
export const buddyRequests = sqliteTable('buddy_requests', {
  id:            integer('id').primaryKey({ autoIncrement: true }),
  userId:        integer('user_id').notNull(),
  workoutId:     integer('workout_id'),
  gymName:       text('gym_name').notNull().default(''),
  preferredTime: text('preferred_time').notNull().default(''),
  comment:       text('comment').notNull().default(''),
  status:        text('status').notNull().default('active'), // 'active' | 'closed'
  createdAt:     text('created_at').notNull().default(sql`(datetime('now'))`),
});

// ─── Type helpers ────────────────────────────────────────────────────────────
export type User           = typeof users.$inferSelect;
export type NewUser        = typeof users.$inferInsert;
export type Workout        = typeof workouts.$inferSelect;
export type NewWorkout     = typeof workouts.$inferInsert;
export type BuddyRequest   = typeof buddyRequests.$inferSelect;
export type NewBuddyRequest = typeof buddyRequests.$inferInsert;
