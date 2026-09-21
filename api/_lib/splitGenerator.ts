// ─── Domain types ────────────────────────────────────────────────────────────

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

// ─── Exercise database ───────────────────────────────────────────────────────

interface ExerciseDef {
  name:       string;
  muscles:    string[];
  equipment:  string[];
  tip?:       string;
  emoji?:     string;
}

const EXERCISE_DB: ExerciseDef[] = [
  { name: 'Жим штанги лёжа',           muscles: ['chest'], equipment: ['barbell'],   tip: 'Сводите лопатки, опускайте штангу к нижней части груди', emoji: '🏋️' },
  { name: 'Жим гантелей лёжа',          muscles: ['chest'], equipment: ['dumbbell'],  tip: 'Разводите локти ~45°, полный диапазон движения', emoji: '💪' },
  { name: 'Жим штанги под углом',       muscles: ['chest'], equipment: ['barbell'],   tip: 'Угол скамьи 30-45°, акцент на верхнюю часть груди', emoji: '🏋️' },
  { name: 'Разводка гантелей лёжа',     muscles: ['chest'], equipment: ['dumbbell'],  tip: 'Лёгкий изгиб в локтях, растяжка в нижней точке', emoji: '💪' },
  { name: 'Отжимания',                  muscles: ['chest','triceps'], equipment: ['bodyweight'], tip: 'Тело — прямая линия, локти ~45° от корпуса', emoji: '🤸' },
  { name: 'Отжимания на брусьях',       muscles: ['chest','triceps'], equipment: ['pull_bar','bodyweight'], tip: 'Наклон вперёд — больше акцент на грудь', emoji: '🤸' },
  { name: 'Пуловер с гантелью',         muscles: ['chest'], equipment: ['dumbbell'],  tip: 'Чуть согнутые локти, растяжка грудной клетки', emoji: '💪' },
  { name: 'Становая тяга',              muscles: ['back','hamstrings'], equipment: ['barbell'], tip: 'Нейтральный позвоночник, тяга через пятки', emoji: '🏋️' },
  { name: 'Тяга штанги в наклоне',      muscles: ['back'], equipment: ['barbell'],   tip: 'Угол торса ~45°, тяните к пупку', emoji: '🏋️' },
  { name: 'Подтягивания',               muscles: ['back','biceps'], equipment: ['pull_bar','bodyweight'], tip: 'Полное разгибание в нижней точке', emoji: '🤸' },
  { name: 'Тяга верхнего блока',        muscles: ['back'], equipment: ['machine'],   tip: 'Тяните лопатки вниз-назад, не раскачивайтесь', emoji: '🔧' },
  { name: 'Тяга гантели в наклоне',     muscles: ['back'], equipment: ['dumbbell'],  tip: 'Опорная рука на скамье, тяните локоть назад', emoji: '💪' },
  { name: 'Горизонтальная тяга блока',  muscles: ['back'], equipment: ['machine'],   tip: 'Сводите лопатки в конечной точке', emoji: '🔧' },
  { name: 'Австралийские подтягивания', muscles: ['back'], equipment: ['pull_bar','bodyweight'], tip: 'Тело прямое, тяните грудь к перекладине', emoji: '🤸' },
  { name: 'Жим штанги стоя (оверхед)', muscles: ['shoulders'], equipment: ['barbell'],  tip: 'Ягодицы и корпус напряжены, не прогибайте спину', emoji: '🏋️' },
  { name: 'Жим гантелей сидя',         muscles: ['shoulders'], equipment: ['dumbbell'], tip: 'Локти чуть впереди линии плеч', emoji: '💪' },
  { name: 'Разводка гантелей стоя',    muscles: ['shoulders'], equipment: ['dumbbell'], tip: 'Лёгкий изгиб в локтях, поднимайте до уровня плеч', emoji: '💪' },
  { name: 'Тяга штанги к подбородку', muscles: ['shoulders','traps'], equipment: ['barbell'], tip: 'Широкий хват, локти выше кистей', emoji: '🏋️' },
  { name: 'Пайк отжимания',           muscles: ['shoulders'], equipment: ['bodyweight'], tip: 'Таз высоко, голова к полу', emoji: '🤸' },
  { name: 'Тяга гантелей перед собой', muscles: ['shoulders'], equipment: ['dumbbell'], tip: 'Контролируемое опускание', emoji: '💪' },
  { name: 'Подъём штанги на бицепс',   muscles: ['biceps'], equipment: ['barbell'],   tip: 'Локти прижаты, не раскачивайтесь', emoji: '🏋️' },
  { name: 'Подъём гантелей на бицепс', muscles: ['biceps'], equipment: ['dumbbell'],  tip: 'Поочерёдно с супинацией запястья', emoji: '💪' },
  { name: 'Молотки с гантелями',       muscles: ['biceps','forearms'], equipment: ['dumbbell'], tip: 'Нейтральный хват, локти неподвижны', emoji: '💪' },
  { name: 'Обратные подтягивания',     muscles: ['biceps'], equipment: ['pull_bar','bodyweight'], tip: 'Хват снизу (супинация)', emoji: '🤸' },
  { name: 'Французский жим лёжа',      muscles: ['triceps'], equipment: ['barbell'],  tip: 'Локти неподвижны, только предплечья', emoji: '🏋️' },
  { name: 'Разгибание на блоке',        muscles: ['triceps'], equipment: ['machine'],  tip: 'Локти прижаты, полное разгибание', emoji: '🔧' },
  { name: 'Жим узким хватом',          muscles: ['triceps'], equipment: ['barbell'],  tip: 'Хват чуть уже ширины плеч', emoji: '🏋️' },
  { name: 'Отжимания от скамьи',       muscles: ['triceps'], equipment: ['bodyweight'], tip: 'Пальцы смотрят вперёд, локти назад', emoji: '🤸' },
  { name: 'Разгибание гантели над головой', muscles: ['triceps'], equipment: ['dumbbell'], tip: 'Держите локоть неподвижным', emoji: '💪' },
  { name: 'Приседания со штангой',     muscles: ['quads','glutes'], equipment: ['barbell'],  tip: 'Колени по линии носков, ниже параллели', emoji: '🏋️' },
  { name: 'Жим ногами в тренажёре',    muscles: ['quads','glutes'], equipment: ['machine'],  tip: 'Стопы на ширине плеч, не блокируйте колени', emoji: '🔧' },
  { name: 'Выпады с гантелями',        muscles: ['quads','glutes'], equipment: ['dumbbell'], tip: 'Шаг широкий, колено над стопой', emoji: '💪' },
  { name: 'Болгарские сплит-приседания', muscles: ['quads','glutes'], equipment: ['dumbbell'], tip: 'Задняя нога на скамье, торс прямо', emoji: '💪' },
  { name: 'Приседания с весом тела',   muscles: ['quads','glutes'], equipment: ['bodyweight'], tip: 'Пятки на полу, грудь вверх', emoji: '🤸' },
  { name: 'Выпады на месте',           muscles: ['quads','glutes'], equipment: ['bodyweight'], tip: 'Колено не заходит за носок', emoji: '🤸' },
  { name: 'Прыжки на ящик / Squat Jump', muscles: ['quads','glutes'], equipment: ['bodyweight'], tip: 'Мягкое приземление на всю стопу', emoji: '🤸' },
  { name: 'Румынская тяга со штангой', muscles: ['hamstrings','glutes'], equipment: ['barbell'], tip: 'Штанга скользит по ногам, спина прямая', emoji: '🏋️' },
  { name: 'Сгибание ног в тренажёре',  muscles: ['hamstrings'], equipment: ['machine'], tip: 'Полное разгибание в нижней точке', emoji: '🔧' },
  { name: 'Ягодичный мостик',          muscles: ['glutes','hamstrings'], equipment: ['bodyweight'], tip: 'Сожмите ягодицы в верхней точке', emoji: '🤸' },
  { name: 'Ягодичный мостик со штангой', muscles: ['glutes'], equipment: ['barbell'],  tip: 'Штанга на тазе, поролоновая подкладка', emoji: '🏋️' },
  { name: 'Гиперэкстензия',            muscles: ['hamstrings','back'], equipment: ['machine'], tip: 'Не переразгибайте поясницу', emoji: '🔧' },
  { name: 'Подъёмы на носки стоя',     muscles: ['calves'], equipment: ['bodyweight','machine'], tip: 'Полный диапазон: пятка вниз — носок вверх', emoji: '🤸' },
  { name: 'Подъёмы на носки в тренажёре', muscles: ['calves'], equipment: ['machine'], tip: 'Медленный темп, 2 сек вверх / 2 сек вниз', emoji: '🔧' },
  { name: 'Планка',                    muscles: ['core'], equipment: ['bodyweight'], tip: 'Тело — прямая линия, дышите равномерно', emoji: '🤸' },
  { name: 'Скручивания',               muscles: ['core'], equipment: ['bodyweight'], tip: 'Поясница прижата к полу', emoji: '🤸' },
  { name: 'Велосипед',                 muscles: ['core'], equipment: ['bodyweight'], tip: 'Медленно, с поворотом корпуса', emoji: '🤸' },
  { name: 'Подъём ног лёжа',           muscles: ['core'], equipment: ['bodyweight'], tip: 'Поясница не отрывается от пола', emoji: '🤸' },
  { name: 'Русский твист',             muscles: ['core'], equipment: ['bodyweight','dumbbell'], tip: 'Ноги подняты, поворот плечами', emoji: '🤸' },
  { name: 'Пресс на блоке',            muscles: ['core'], equipment: ['machine'],   tip: 'Кранч через abs, не тяните руками', emoji: '🔧' },
  { name: 'Бег (умеренный темп)',      muscles: ['cardio'], equipment: ['bodyweight'], tip: '120-140 уд/мин, аэробная зона', emoji: '🏃' },
  { name: 'Прыжки со скакалкой',      muscles: ['cardio'], equipment: ['bodyweight'], tip: 'Лёгкие прыжки, ритмичное дыхание', emoji: '🤸' },
  { name: 'Берпи',                    muscles: ['cardio','full_body'], equipment: ['bodyweight'], tip: 'Взрывное вставание, мягкое приземление', emoji: '🤸' },
  { name: 'Горные альпинисты',        muscles: ['cardio','core'], equipment: ['bodyweight'], tip: 'Быстрый темп, бёдра не поднимайте', emoji: '🤸' },
  { name: 'Прыжки на месте (Jumping Jacks)', muscles: ['cardio'], equipment: ['bodyweight'], tip: 'Разогрев / завершение тренировки', emoji: '🤸' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getEquipment(loc: LocationType): string[] {
  switch (loc) {
    case 'gym':     return ['barbell', 'dumbbell', 'machine', 'bodyweight', 'pull_bar'];
    case 'outdoor': return ['bodyweight', 'pull_bar'];
    case 'park':    return ['bodyweight', 'pull_bar'];
    case 'home':    return ['bodyweight', 'dumbbell'];
    default:        return ['bodyweight'];
  }
}

function pickExercises(muscles: string[], loc: LocationType, count: number, exclude: Set<string> = new Set()): ExerciseDef[] {
  const available = getEquipment(loc);
  const pool = EXERCISE_DB.filter(
    (e) =>
      muscles.some((m) => e.muscles.includes(m)) &&
      e.equipment.some((eq) => available.includes(eq)) &&
      !exclude.has(e.name)
  );
  const shuffled = [...pool].sort(() => 0.5 - 0.3);
  return shuffled.slice(0, count);
}

interface VolumePreset { sets: number; reps: string; rest: string; }

function getVolume(goal: GoalType): VolumePreset {
  switch (goal) {
    case 'mass':      return { sets: 4, reps: '6-8',  rest: '2-3 мин' };
    case 'cut':       return { sets: 3, reps: '12-15', rest: '60 сек' };
    case 'endurance': return { sets: 3, reps: '15-20', rest: '30-45 сек' };
  }
}

type SplitDay = { name: string; muscles: string[] };

function getSplitPattern(days: 2 | 3 | 4): SplitDay[][] {
  switch (days) {
    case 2: return [[
      { name: 'Full Body A', muscles: ['chest', 'back', 'quads', 'core'] },
      { name: 'Full Body B', muscles: ['shoulders', 'hamstrings', 'biceps', 'triceps', 'core'] },
    ]];
    case 3: return [[
      { name: 'Push (Грудь / Плечи / Трицепс)',  muscles: ['chest', 'shoulders', 'triceps'] },
      { name: 'Pull (Спина / Бицепс)',            muscles: ['back', 'biceps'] },
      { name: 'Legs (Ноги / Пресс)',              muscles: ['quads', 'hamstrings', 'calves', 'core'] },
    ]];
    case 4: return [[
      { name: 'Upper A (Грудь / Трицепс)',        muscles: ['chest', 'triceps'] },
      { name: 'Lower A (Квадрицепс / Пресс)',     muscles: ['quads', 'glutes', 'core'] },
      { name: 'Upper B (Спина / Бицепс / Плечи)', muscles: ['back', 'biceps', 'shoulders'] },
      { name: 'Lower B (Бицепс бедра / Икры)',    muscles: ['hamstrings', 'glutes', 'calves'] },
    ]];
  }
}

function getCardioBlock(goal: GoalType, loc: LocationType): string | undefined {
  if (goal === 'mass') return undefined;
  if (goal === 'cut') {
    return loc === 'home'
      ? '10 мин HIIT: Берпи / Горные альпинисты / Jumping Jacks (30 сек работа / 15 сек отдых)'
      : '15 мин умеренного кардио (беговая дорожка / велотренажёр, 130-140 уд/мин)';
  }
  return loc === 'park' || loc === 'outdoor'
    ? '20-30 мин бег в аэробной зоне (120-140 уд/мин)'
    : '20 мин кардио: беговая дорожка или велотренажёр';
}

const DAY_LABELS: Record<string, string> = {
  'Пн': 'Понедельник', 'Вт': 'Вторник', 'Ср': 'Среда',
  'Чт': 'Четверг', 'Пт': 'Пятница', 'Сб': 'Суббота', 'Вс': 'Воскресенье',
};

// ─── Main export ──────────────────────────────────────────────────────────────

export function generatePlan(input: GeneratorInput): GeneratedPlan {
  const { locationType, goal, daysPerWeek, selectedDays } = input;
  const pattern = getSplitPattern(daysPerWeek)[0];
  const usedNames = new Set<string>();

  const weeklyPlan: TrainingDay[] = pattern.map((split, idx) => {
    const dayKey   = selectedDays[idx] ?? `День ${idx + 1}`;
    const dayLabel = DAY_LABELS[dayKey] ?? dayKey;
    const exCount  = daysPerWeek === 2 ? 6 : daysPerWeek === 3 ? 5 : 4;
    const rawExercises = pickExercises(split.muscles, locationType, exCount, usedNames);
    rawExercises.forEach((e) => usedNames.add(e.name));

    let finishers: ExerciseDef[] = [];
    if (!split.muscles.includes('core') && goal !== 'mass') {
      finishers = pickExercises(['core'], locationType, 2, usedNames);
      finishers.forEach((e) => usedNames.add(e.name));
    }

    const exercises: Exercise[] = [...rawExercises, ...finishers].map((e) => {
      const vol = getVolume(goal);
      return { name: e.name, sets: vol.sets, reps: vol.reps, rest: vol.rest, tip: e.tip, equipment: e.emoji };
    });

    const cardio = getCardioBlock(goal, locationType);
    return {
      dayLabel, dayKey, splitName: split.name, exercises,
      cardio: goal !== 'mass' && idx === pattern.length - 1 ? cardio : undefined,
    };
  });

  const goalLabels: Record<GoalType, string> = {
    mass: 'Набор массы / Сила', cut: 'Похудение / Рельеф', endurance: 'Выносливость / Кардио',
  };
  const locLabels: Record<LocationType, string> = {
    gym: 'Тренажёрный зал', outdoor: 'Воркаут-площадка', park: 'Бег / Парк', home: 'Дома',
  };
  const splitLabel = daysPerWeek === 2 ? 'Full Body' : daysPerWeek === 3 ? 'PPL' : 'Upper/Lower';

  return {
    title: `${splitLabel} — ${goalLabels[goal]} (${locLabels[locationType]})`,
    goal,
    location: locationType,
    weeklyPlan,
  };
}
