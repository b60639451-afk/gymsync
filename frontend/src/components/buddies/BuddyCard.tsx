import { useState } from 'react';
import { MapPin, Clock, Target, Send, X, CheckCircle, User } from 'lucide-react';
import type { BuddyRequest, GoalType } from '../../types';
import { GOAL_LABELS, LOCATION_LABELS } from '../../types';
import { closeBuddy } from '../../api/client';

type Props = { buddy: BuddyRequest; onClose?: () => void; };

const GOAL_BADGE: Record<GoalType, { cls: string; color: string }> = {
  mass:      { cls: 'badge-green',  color: 'var(--green)'  },
  cut:       { cls: 'badge-cyan',   color: 'var(--cyan)'   },
  endurance: { cls: 'badge-violet', color: 'var(--violet)' },
};

function getMyRequestIds(): number[] {
  try { return JSON.parse(localStorage.getItem('gymsync_my_requests') ?? '[]'); }
  catch { return []; }
}

export default function BuddyCard({ buddy, onClose }: Props) {
  const { user, workout, gymName, preferredTime, comment, createdAt, id } = buddy;
  const [closed,  setClosed]  = useState(false);
  const [closing, setClosing] = useState(false);

  const goal     = workout?.targetGoal as GoalType | undefined;
  const badge    = goal ? GOAL_BADGE[goal] : null;
  const isOwn    = getMyRequestIds().includes(id);
  const age      = getRelativeTime(createdAt);

  const handleTelegram = () => {
    if (!user?.telegramHandle) return;
    window.open(`https://t.me/${user.telegramHandle.replace('@', '')}`, '_blank', 'noopener');
  };

  const handleClose = async () => {
    if (!confirm('Закрыть свой запрос?')) return;
    setClosing(true);
    try {
      await closeBuddy(id);
      const prev = getMyRequestIds().filter((x) => x !== id);
      localStorage.setItem('gymsync_my_requests', JSON.stringify(prev));
      setClosed(true);
      setTimeout(() => onClose?.(), 700);
    } catch { alert('Не удалось закрыть запрос.'); }
    finally   { setClosing(false); }
  };

  if (closed) {
    return (
      <div className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 180 }}>
        <CheckCircle size={28} color="var(--green)" />
        <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--fg-sub)' }}>Запрос закрыт</p>
      </div>
    );
  }

  return (
    <div
      className="card animate-fade-in"
      style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
        }}>
          <User size={20} color="var(--fg-sub)" />
        </div>

        {/* Name and Online Status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fg)', letterSpacing: '-0.01em' }}>
              {user?.name ?? 'Анонимно'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--green)' }}>
              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
              онлайн
            </span>
          </div>
          {user?.city && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: 4 }}>
              <MapPin size={10} />
              {user.city}{user.district ? `, ${user.district}` : ''}
            </div>
          )}
        </div>

        {/* Age and Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{age}</span>
          {isOwn && (
            <button
              onClick={handleClose}
              disabled={closing}
              title="Закрыть мой запрос"
              style={{
                width: 28, height: 28, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#F87171', cursor: closing ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Badges */}
      {(goal || workout?.locationType) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {goal && badge && (
            <span className={`badge ${badge.cls}`}>
              <Target size={11} />
              {GOAL_LABELS[goal]}
            </span>
          )}
          {workout?.locationType && (
            <span className="badge badge-gray">
              {LOCATION_LABELS[workout.locationType]}
            </span>
          )}
        </div>
      )}

      {/* Workout Card Inner */}
      {workout && (
        <div style={{
          borderRadius: 12, padding: 12,
          background: 'var(--green-dim)', border: '1px solid var(--green-border)',
        }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '0.05em', color: 'var(--green)', marginBottom: 4,
          }}>
            📋 Программа
          </p>
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em' }}>
            {workout.title}
          </p>
        </div>
      )}

      {/* Gym + Time */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {gymName && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--fg-sub)' }}>
            <MapPin size={14} color="var(--green)" />
            {gymName}
          </div>
        )}
        {preferredTime && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--fg-sub)' }}>
            <Clock size={14} color="var(--cyan)" />
            {preferredTime}
          </div>
        )}
      </div>

      {/* Comment */}
      {comment && (
        <p style={{
          fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--fg-sub)',
          borderLeft: '2px solid var(--green-border)', paddingLeft: 12, fontStyle: 'italic',
        }}>
          «{comment}»
        </p>
      )}

      {/* Telegram CTA */}
      {user?.telegramHandle && (
        <button onClick={handleTelegram} className="tg-btn" style={{ width: '100%', marginTop: 'auto' }}>
          <Send size={15} />
          Написать в Telegram
        </button>
      )}
    </div>
  );
}

function getRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min  = Math.floor(diff / 60_000);
  if (min < 2)  return 'только что';
  if (min < 60) return `${min} мин назад`;
  const h = Math.floor(min / 60);
  if (h < 24)   return `${h} ч назад`;
  return `${Math.floor(h / 24)} д назад`;
}
