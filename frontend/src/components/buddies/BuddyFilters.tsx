import { Search, X } from 'lucide-react';
import type { BuddyFilters, GoalType } from '../../types';
import { GOAL_LABELS } from '../../types';

type Props = { filters: BuddyFilters; onChange: (f: BuddyFilters) => void; };

const GOAL_OPTIONS: { value: GoalType | ''; label: string }[] = [
  { value: '',          label: 'Любая цель' },
  { value: 'mass',      label: GOAL_LABELS.mass },
  { value: 'cut',       label: GOAL_LABELS.cut },
  { value: 'endurance', label: GOAL_LABELS.endurance },
];

export default function BuddyFiltersBar({ filters, onChange }: Props) {
  const hasFilters = filters.city || filters.gymName || filters.goal;
  const update = (patch: Partial<BuddyFilters>) => onChange({ ...filters, ...patch });
  const clear  = () => onChange({ city: '', gymName: '', goal: '' });

  return (
    <div
      className="glass-card p-4 flex flex-wrap gap-3 items-center"
      style={{ borderRadius: 16 }}
    >
      {/* City */}
      <div className="relative flex-1 min-w-36">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--text-muted)' }}
        />
        <input
          className="input-field pl-9 text-sm"
          placeholder="Город / Район"
          value={filters.city}
          onChange={(e) => update({ city: e.target.value })}
        />
      </div>

      {/* Gym */}
      <div className="relative flex-1 min-w-36">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--text-muted)' }}
        />
        <input
          className="input-field pl-9 text-sm"
          placeholder="Фитнес-клуб"
          value={filters.gymName}
          onChange={(e) => update({ gymName: e.target.value })}
        />
      </div>

      {/* Goal select */}
      <select
        className="input-field text-sm flex-1 min-w-36"
        value={filters.goal}
        onChange={(e) => update({ goal: e.target.value as GoalType | '' })}
        style={{ cursor: 'pointer' }}
      >
        {GOAL_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value} style={{ background: '#0D1117' }}>
            {label}
          </option>
        ))}
      </select>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clear}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            color: 'var(--text-muted)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
          }}
        >
          <X size={13} />
          Сброс
        </button>
      )}
    </div>
  );
}
