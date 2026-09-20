import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';

const DB_PATH = process.env.DB_PATH || path.resolve(__dirname, '../../gymsync.db');

// Create or open the SQLite database file
const sqlite = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
sqlite.pragma('journal_mode = WAL');

// Drizzle ORM instance
export const db = drizzle(sqlite, { schema });

// Run initial migrations (create tables if they don't exist)
export function runMigrations(): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      telegram_handle TEXT NOT NULL,
      city        TEXT    NOT NULL DEFAULT '',
      district    TEXT    NOT NULL DEFAULT '',
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS workouts (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id         INTEGER,
      title           TEXT    NOT NULL,
      target_goal     TEXT    NOT NULL,
      location_type   TEXT    NOT NULL,
      schedule_days   TEXT    NOT NULL DEFAULT '[]',
      exercises       TEXT    NOT NULL DEFAULT '[]',
      created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS buddy_requests (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id         INTEGER NOT NULL,
      workout_id      INTEGER,
      gym_name        TEXT    NOT NULL DEFAULT '',
      preferred_time  TEXT    NOT NULL DEFAULT '',
      comment         TEXT    NOT NULL DEFAULT '',
      status          TEXT    NOT NULL DEFAULT 'active',
      created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
  console.log('[DB] Tables ready');
}

export { sqlite };
