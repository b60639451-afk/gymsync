/**
 * api/client.ts
 * Thin fetch wrapper around the GymSync REST API.
 * All requests go to /api/* — proxied to localhost:3001 by Vite in dev.
 */

import type {
  GeneratorInput,
  WorkoutGenerateResponse,
  BuddyRequest,
  PublishBuddyInput,
} from '../types';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error ?? 'API Error');
  }
  return res.json() as Promise<T>;
}

// ─── Workouts ────────────────────────────────────────────────────────────────

/** Generate a workout plan from user parameters */
export function generateWorkout(input: GeneratorInput): Promise<WorkoutGenerateResponse> {
  return request<WorkoutGenerateResponse>('/workouts/generate', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

// ─── Buddies ─────────────────────────────────────────────────────────────────

/** Get list of active buddy requests, optionally filtered */
export function getBuddies(filters?: { city?: string; goal?: string }): Promise<BuddyRequest[]> {
  const params = new URLSearchParams({ status: 'active' });
  if (filters?.city) params.set('city', filters.city);
  if (filters?.goal) params.set('goal', filters.goal);
  return request<BuddyRequest[]>(`/buddies?${params.toString()}`);
}

/** Publish a new buddy request */
export function publishBuddy(data: PublishBuddyInput): Promise<{ request: BuddyRequest; user: object }> {
  return request('/buddies', { method: 'POST', body: JSON.stringify(data) });
}

/** Close / deactivate a buddy request */
export function closeBuddy(id: number): Promise<{ success: boolean }> {
  return request(`/buddies/${id}/close`, { method: 'PATCH' });
}
