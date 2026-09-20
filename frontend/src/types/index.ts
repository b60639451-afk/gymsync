// ─── Domain types shared between frontend and backend ───────────────────────

export type LocationType = 'gym' | 'outdoor' | 'park' | 'home';
export type GoalType     = 'mass' | 'cut' | 'endurance';

export interface GeneratorInput {
  locationType:  LocationType;
  goal:          GoalType;
  daysPerWeek:   2 | 3 | 4;
  selectedDays:  string[];
  preferredTime?: string;
}

export interface Exercise {
  name:       string;
  sets:       number;
  reps:       string;
  rest:       string;
  tip?:       string;
  equipment?: string;
}

export interface TrainingDay {
  dayLabel:   string;
  dayKey:     string;
  splitName:  string;
  exercises:  Exercise[];
  cardio?:    string;
}

export interface GeneratedPlan {
  title:       string;
  goal:        GoalType;
  location:    LocationType;
  weeklyPlan:  TrainingDay[];
}

export interface WorkoutGenerateResponse {
  plan:       GeneratedPlan;
  workoutId:  number;
}

// ─── Buddy system ────────────────────────────────────────────────────────────

export interface BuddyUser {
  id:             number;
  name:           string;
  telegramHandle: string;
  city:           string;
  district:       string;
}

export interface BuddyWorkoutSummary {
  id:           number;
  title:        string;
  targetGoal:   GoalType;
  locationType: LocationType;
}

export interface BuddyRequest {
  id:            number;
  gymName:       string;
  preferredTime: string;
  comment:       string;
  status:        'active' | 'closed';
  createdAt:     string;
  user:          BuddyUser | null;
  workout:       BuddyWorkoutSummary | null;
}

export interface PublishBuddyInput {
  name:           string;
  telegramHandle: string;
  city?:          string;
  district?:      string;
  gymName?:       string;
  preferredTime?: string;
  comment?:       string;
  workoutId?:     number;
}

// ─── Filter state ────────────────────────────────────────────────────────────

export interface BuddyFilters {
  city:    string;
  gymName: string;
  goal:    GoalType | '';
}

// ─── UI state ────────────────────────────────────────────────────────────────

export type GeneratorStep = 1 | 2 | 3 | 'result';

export const LOCATION_LABELS: Record<LocationType, string> = {
  gym:     'Тренажёрный зал',
  outdoor: 'Воркаут-площадка',
  park:    'Бег / Парк',
  home:    'Дома',
};

export const GOAL_LABELS: Record<GoalType, string> = {
  mass:      'Набор массы / Сила',
  cut:       'Похудение / Рельеф',
  endurance: 'Выносливость / Кардио',
};

export const DAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const DAYS_LONG: Record<string, string> = {
  'Пн': 'Понедельник',
  'Вт': 'Вторник',
  'Ср': 'Среда',
  'Чт': 'Четверг',
  'Пт': 'Пятница',
  'Сб': 'Суббота',
  'Вс': 'Воскресенье',
};
