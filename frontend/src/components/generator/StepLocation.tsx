import type { LocationType } from '../../types';
import { LOCATION_LABELS } from '../../types';
import { Dumbbell, TreePine, Wind, Home } from 'lucide-react';

type Props = { value: LocationType | ''; onChange: (v: LocationType) => void; };

const OPTIONS: { type: LocationType; Icon: React.FC<{ size?: number; color?: string; strokeWidth?: number }>; desc: string; color: string }[] = [
  { type: 'gym',     Icon: Dumbbell,  desc: 'Штанги, тренажёры, гантели', color: '#00E676' },
  { type: 'outdoor', Icon: TreePine,  desc: 'Брусья, турники, кольца',    color: '#8B5CF6' },
  { type: 'park',    Icon: Wind,      desc: 'Дорожки, лужайки, кардио',   color: '#06B6D4' },
  { type: 'home',    Icon: Home,      desc: 'Гантели, турник, коврик',     color: '#F59E0B' },
];

export default function StepLocation({ value, onChange }: Props) {
  return (
    <div>
      <p style={{ color: 'var(--fg)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', marginBottom: 4 }}>
        Где тренируешься?
      </p>
      <p style={{ color: 'var(--fg-sub)', fontSize: '0.85rem', marginBottom: 20 }}>
        Программа подберётся под доступное оборудование
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {OPTIONS.map(({ type, Icon, desc, color }) => {
          const active = value === type;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                gap: 10, padding: '16px', borderRadius: 14,
                background: active ? `${color}10` : 'var(--bg-elevated)',
                border: `1.5px solid ${active ? color : 'var(--border)'}`,
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s ease',
                boxShadow: active ? `0 0 20px ${color}20` : 'none',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${color}18`, border: `1px solid ${color}40`,
              }}>
                <Icon size={18} color={color} strokeWidth={2} />
              </div>

              {/* Text */}
              <div>
                <p style={{
                  color: active ? color : 'var(--fg)',
                  fontWeight: 700, fontSize: '0.9rem', marginBottom: 3,
                }}>
                  {LOCATION_LABELS[type]}
                </p>
                <p style={{ color: 'var(--fg-sub)', fontSize: '0.75rem', lineHeight: 1.4 }}>{desc}</p>
              </div>

              {/* Check indicator */}
              <div style={{
                alignSelf: 'flex-end',
                width: 18, height: 18, borderRadius: '50%',
                border: `1.5px solid ${active ? color : 'var(--border-md)'}`,
                background: active ? color : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.15s ease',
              }}>
                {active && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2 4-4" stroke="#05050f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
