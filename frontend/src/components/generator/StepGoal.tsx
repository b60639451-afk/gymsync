import type { GoalType } from '../../types';
import { GOAL_LABELS } from '../../types';
import { Flame, Layers, Timer } from 'lucide-react';

type Props = { value: GoalType | ''; onChange: (v: GoalType) => void; };

const OPTIONS: {
  type: GoalType;
  Icon: React.FC<{ size?: number; color?: string; strokeWidth?: number }>;
  tag: string;
  desc: string;
  color: string;
}[] = [
  { type: 'mass',      Icon: Layers, tag: '4×5–8 · отдых 2–3 мин',  desc: 'Тяжёлые базовые упражнения с прогрессией нагрузки', color: '#00E676' },
  { type: 'cut',       Icon: Flame,  tag: '3×12–15 · отдых 60 сек', desc: 'Суперсеты и кардио-блоки для сжигания жира',        color: '#F59E0B' },
  { type: 'endurance', Icon: Timer,  tag: '3×15–20 · отдых 30 сек', desc: 'Высокий темп и аэробная база — круговые тренировки', color: '#8B5CF6' },
];

export default function StepGoal({ value, onChange }: Props) {
  return (
    <div>
      <p style={{ color: 'var(--fg)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', marginBottom: 4 }}>
        Какая у тебя цель?
      </p>
      <p style={{ color: 'var(--fg-sub)', fontSize: '0.85rem', marginBottom: 20 }}>
        От цели зависит схема подходов, повторений и отдыха
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {OPTIONS.map(({ type, Icon, tag, desc, color }) => {
          const active = value === type;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px',
                borderRadius: 14, textAlign: 'left', cursor: 'pointer',
                background: active ? `${color}10` : 'var(--bg-elevated)',
                border: `1.5px solid ${active ? color : 'var(--border)'}`,
                transition: 'all 0.15s ease',
                boxShadow: active ? `0 0 20px ${color}20` : 'none',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${color}18`, border: `1px solid ${color}40`,
              }}>
                <Icon size={20} color={color} strokeWidth={2} />
              </div>

              {/* Text block */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const, marginBottom: 3 }}>
                  <span style={{ color: active ? color : 'var(--fg)', fontWeight: 700, fontSize: '0.95rem' }}>
                    {GOAL_LABELS[type]}
                  </span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    padding: '2px 8px', borderRadius: 999,
                    background: `${color}14`, color, border: `1px solid ${color}35`,
                  }}>
                    {tag}
                  </span>
                </div>
                <p style={{ color: 'var(--fg-sub)', fontSize: '0.8rem', lineHeight: 1.45 }}>{desc}</p>
              </div>

              {/* Radio circle */}
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                border: `1.5px solid ${active ? color : 'var(--border-md)'}`,
                background: active ? color : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}>
                {active && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 4-4" stroke="#05050f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
