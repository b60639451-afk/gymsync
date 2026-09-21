import { useEffect, useState } from 'react';
import { MapPin, Clock, User, Target } from 'lucide-react';
import type { BuddyRequest } from '../../types';
import { getBuddies } from '../../api/client';

const DEMO_ITEMS: BuddyRequest[] = [
  {
    id: 0, gymName: 'FitLife Арбат', preferredTime: '07:00–09:00',
    comment: 'Нужна страховка на жиме от 90 кг 💪',
    status: 'active', createdAt: new Date().toISOString(),
    user: { id: 0, name: 'Алексей М.', telegramHandle: 'demo', city: 'Москва', district: 'ЦАО' },
    workout: { id: 0, title: 'PPL — Набор массы', targetGoal: 'mass', locationType: 'gym' },
  },
  {
    id: 1, gymName: 'Воркаут на Тверской', preferredTime: '18:00–20:00',
    comment: 'Ищу партнёра для уличных тренировок 🤸',
    status: 'active', createdAt: new Date().toISOString(),
    user: { id: 1, name: 'Даниил К.', telegramHandle: 'demo2', city: 'Москва', district: 'ЦАО' },
    workout: { id: 1, title: 'Full Body — Выносливость', targetGoal: 'endurance', locationType: 'outdoor' },
  },
  {
    id: 2, gymName: 'Парк Горького', preferredTime: '06:30–08:00',
    comment: 'Бегаю 10 км, ищу компанию 🏃',
    status: 'active', createdAt: new Date().toISOString(),
    user: { id: 2, name: 'Мария С.', telegramHandle: 'demo3', city: 'Москва', district: 'ЮАО' },
    workout: { id: 2, title: 'Кардио-план — Рельеф', targetGoal: 'cut', locationType: 'park' },
  },
];

const GOAL_CONFIG: Record<string, { label: string; color: string }> = {
  mass:      { label: 'Масса',        color: 'var(--green)'  },
  cut:       { label: 'Рельеф',       color: 'var(--cyan)'   },
  endurance: { label: 'Выносливость', color: 'var(--violet)' },
};

export default function LiveFeed() {
  const [items, setItems]   = useState<BuddyRequest[]>(DEMO_ITEMS);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBuddies();
        if (data.length > 0) setItems(data);
      } catch { /* fallback to demo */ }
    };
    load();
    const timer = setInterval(load, 15_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [items.length]);

  const item = items[current];
  if (!item) return null;

  const goal     = item.workout?.targetGoal ?? 'mass';
  const goalConf = GOAL_CONFIG[goal];

  return (
    <div key={`${item.id}-${current}`} className="card live-feed-item" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
        }}>
          <User size={20} color="var(--fg-sub)" />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fg)', letterSpacing: '-0.01em' }}>
              {item.user?.name ?? 'Анонимно'}
            </span>
            
            {goalConf && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                background: `${goalConf.color}15`, color: goalConf.color, border: `1px solid ${goalConf.color}35`,
              }}>
                <Target size={10} />
                {goalConf.label}
              </span>
            )}
            
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--green)' }}>
              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
              онлайн
            </span>
          </div>

          {/* Comment */}
          {item.comment && (
            <p style={{
              fontSize: '0.88rem', color: 'var(--fg-sub)', marginBottom: 12,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              «{item.comment}»
            </p>
          )}

          {/* Meta Info Row */}
          <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--fg-muted)', flexWrap: 'wrap' }}>
            {item.gymName && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={12} color="var(--green)" />
                {item.gymName}
              </span>
            )}
            {item.preferredTime && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Clock size={12} color="var(--cyan)" />
                {item.preferredTime}
              </span>
            )}
          </div>
        </div>

        {/* Slide Indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4, flexShrink: 0 }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 4,
                height: i === current ? 16 : 4,
                borderRadius: 4,
                background: i === current ? 'var(--green)' : 'var(--border-md)',
                boxShadow: i === current ? '0 0 8px rgba(0,230,118,0.5)' : 'none',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
