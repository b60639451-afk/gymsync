import { DAYS_SHORT } from '../../types';

type Props = {
  daysPerWeek:   2 | 3 | 4 | null;
  selectedDays:  string[];
  preferredTime: string;
  onDaysPerWeek: (n: 2 | 3 | 4) => void;
  onDayToggle:   (d: string) => void;
  onTimeChange:  (t: string) => void;
};

const TIMES = [
  '06:00–08:00', '08:00–10:00', '10:00–12:00',
  '12:00–14:00', '17:00–19:00', '19:00–21:00', 'В любое время',
];

export default function StepSchedule({
  daysPerWeek, selectedDays, preferredTime,
  onDaysPerWeek, onDayToggle, onTimeChange,
}: Props) {
  return (
    <div className="animate-slide-up">
      <h2 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '1.5rem', marginBottom: 6, color: 'var(--fg)', letterSpacing: '-0.03em' }}>
        Твой график
      </h2>
      <p style={{ fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.5, color: 'var(--fg-sub)' }}>
        Выбери количество тренировок и удобное время
      </p>

      {/* Days per week */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, color: 'var(--fg-muted)', fontFamily: '"Outfit", sans-serif' }}>
          Дней в неделю
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {([2, 3, 4] as const).map((n) => {
            const active = daysPerWeek === n;
            return (
              <button
                key={n}
                onClick={() => onDaysPerWeek(n)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '16px 0', borderRadius: 16, transition: 'all 0.2s ease', cursor: 'pointer',
                  background:  active ? 'var(--green)' : 'var(--bg-elevated)',
                  border:      `1.5px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                  color:       active ? '#05050f' : 'var(--fg-sub)',
                  boxShadow:   active ? '0 0 24px rgba(0,230,118,0.4)' : 'none',
                  transform:   active ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <span style={{ fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: active ? 'rgba(5,5,15,0.7)' : 'var(--fg-muted)' }}>
                  {n === 2 || n === 3 || n === 4 ? 'дня' : 'дней'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day-of-week picker */}
      {daysPerWeek && (
        <div className="animate-slide-down" style={{ marginBottom: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, color: 'var(--fg-muted)', fontFamily: '"Outfit", sans-serif' }}>
            Выбери дни
            <span style={{
              marginLeft: 8, padding: '2px 8px', borderRadius: 999, fontWeight: 700, letterSpacing: 0,
              color: selectedDays.length === daysPerWeek ? 'var(--green)' : 'var(--cyan)',
              background: selectedDays.length === daysPerWeek ? 'var(--green-dim)' : 'var(--cyan-dim)',
              border: `1px solid ${selectedDays.length === daysPerWeek ? 'var(--green-border)' : 'var(--cyan-border)'}`,
            }}>
              {selectedDays.length}/{daysPerWeek}
            </span>
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DAYS_SHORT.map((d) => {
              const isSelected  = selectedDays.includes(d);
              const maxReached  = selectedDays.length >= daysPerWeek && !isSelected;
              return (
                <button
                  key={d}
                  onClick={() => !maxReached && onDayToggle(d)}
                  className={`day-toggle ${isSelected ? 'selected' : ''}`}
                  style={{ opacity: maxReached ? 0.35 : 1, cursor: maxReached ? 'not-allowed' : 'pointer' }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Time preference */}
      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, color: 'var(--fg-muted)', fontFamily: '"Outfit", sans-serif' }}>
          Предпочтительное время
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TIMES.map((t) => {
            const active = preferredTime === t;
            return (
              <button
                key={t}
                onClick={() => onTimeChange(t)}
                style={{
                  padding: '8px 14px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s ease', fontFamily: '"Outfit", sans-serif',
                  background:  active ? 'var(--green-dim)' : 'var(--bg-elevated)',
                  border:      `1.5px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                  color:       active ? 'var(--green)' : 'var(--fg-sub)',
                  boxShadow:   active ? '0 0 16px rgba(0,230,118,0.2)' : 'none',
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
