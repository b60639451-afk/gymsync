import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Users, Flame, Clock, RotateCcw, Activity, Play } from 'lucide-react';
import type { GeneratedPlan, TrainingDay, Exercise } from '../../types';

type Props = {
  plan:      GeneratedPlan;
  workoutId: number;
  onPublish: (workoutId: number) => void;
  onReset:   () => void;
};

const GOAL_CONFIG = {
  mass:      { label: 'Набор массы · Сила',    emoji: '💪', color: 'var(--green)',  dim: 'var(--green-dim)'  },
  cut:       { label: 'Рельеф · Похудение',    emoji: '🔥', color: 'var(--cyan)',   dim: 'var(--cyan-dim)'   },
  endurance: { label: 'Выносливость · Кардио', emoji: '🏃', color: 'var(--violet)', dim: 'var(--violet-dim)' },
};

export default function WorkoutResult({ plan, workoutId, onPublish, onReset }: Props) {
  const conf = GOAL_CONFIG[plan.goal];
  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, borderRadius: 24, fontSize: '2rem', marginBottom: 16,
            background: conf.dim, border: `1px solid ${conf.color}30`,
          }}
        >
          {conf.emoji}
        </div>
        <h2 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '1.5rem', marginBottom: 6, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
          {plan.title}
        </h2>
        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: conf.color, marginBottom: 4 }}>
          {conf.label}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--fg-sub)' }}>
          Программа готова — сохрани или найди напарника 🎉
        </p>
      </div>

      {/* Days */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {plan.weeklyPlan.map((day, i) => (
          <DayCard key={day.dayKey} day={day} index={i} goal={plan.goal} />
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => onPublish(workoutId)}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '16px 0', fontSize: '0.95rem' }}
        >
          <Users size={18} />
          Опубликовать · найти напарника
        </button>
        <button
          onClick={() => handlePrint(plan)}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', padding: '16px 0', fontSize: '0.95rem' }}
        >
          <Download size={18} />
          Скачать PDF-памятку
        </button>
        <button
          onClick={onReset}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, color: 'var(--fg-muted)',
            background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
        >
          <RotateCcw size={14} />
          Создать другую программу
        </button>
      </div>
    </div>
  );
}

// ─── DayCard ──────────────────────────────────────────────────────────────────

function DayCard({ day, index }: { day: TrainingDay; index: number; goal?: string }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      style={{
        background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16,
        overflow: 'hidden', animation: `fade-in 0.4s ease-out ${index * 0.07}s forwards`,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.05em',
              background: open ? 'var(--green)' : 'var(--green-dim)',
              color: open ? '#05050f' : 'var(--green)',
              border: '1px solid var(--green-border)',
              transition: 'all 0.2s ease',
            }}
          >
            {day.dayKey}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--fg)', letterSpacing: '-0.01em', marginBottom: 2 }}>
              {day.dayLabel}
            </p>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--green)' }}>
              {day.splitName}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span className="hide-mobile" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--fg-muted)' }}>
            {day.exercises.length} упр.
          </span>
          {open
            ? <ChevronUp size={18} color="var(--fg-muted)" />
            : <ChevronDown size={18} color="var(--fg-muted)" />
          }
        </div>
      </button>

      {open && (
        <div className="animate-slide-down" style={{ borderTop: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-md)' }}>
                <th style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green)' }}>Упражнение</th>
                <th className="hide-mobile" style={{ padding: '12px 0', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)' }}>Подходы</th>
                <th className="hide-mobile" style={{ padding: '12px 0', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)' }}>Повторения</th>
                <th style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green)' }}>Отдых</th>
              </tr>
            </thead>
            <tbody>
              {day.exercises.map((ex, i) => (
                <ExerciseRow key={i} exercise={ex} index={i} />
              ))}
            </tbody>
          </table>

          {day.cardio && (
            <div
              style={{
                margin: '12px 20px 20px', padding: 16, borderRadius: 12,
                display: 'flex', alignItems: 'flex-start', gap: 12,
                background: 'var(--cyan-dim)', border: '1px solid var(--cyan-border)',
              }}
            >
              <Activity size={18} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cyan)', marginBottom: 4 }}>
                  Кардио-блок
                </p>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--fg-sub)' }}>
                  {day.cardio}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ExerciseRow ──────────────────────────────────────────────────────────────

function ExerciseRow({ exercise, index }: { exercise: Exercise; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setExpanded((e) => !e)}
        style={{
          borderBottom: '1px solid var(--border)', cursor: 'pointer',
          animation: `fade-in 0.3s ease-out ${index * 0.04}s forwards`,
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <td style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ flexShrink: 0, fontSize: '1.2rem' }}>{exercise.equipment}</span>
            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--fg)' }}>
              {exercise.name}
            </span>
            <ChevronDown
              size={14}
              color="var(--fg-muted)"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 'auto' }}
            />
          </div>
        </td>
        <td className="hide-mobile" style={{ padding: '16px 0', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--green)' }}>
          {exercise.sets}×
        </td>
        <td className="hide-mobile" style={{ padding: '16px 0', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--cyan)' }}>
          {exercise.reps}
        </td>
        <td style={{ padding: '16px 20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--fg-muted)' }}>
            <Clock size={12} style={{ flexShrink: 0 }} />
            {exercise.rest}
          </span>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={4} style={{ padding: 0, borderBottom: '1px solid var(--border)' }}>
            <div className="animate-slide-down">
              <div
                style={{
                  display: 'flex', flexDirection: 'column', gap: 12,
                  margin: '0 16px 16px', padding: 16, borderRadius: 12,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border-md)',
                }}
              >
                {/* Tip */}
                {exercise.tip && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Flame size={16} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--fg-sub)' }}>
                      <strong style={{ color: 'var(--green)', fontWeight: 700 }}>Техника: </strong>
                      {exercise.tip}
                    </p>
                  </div>
                )}
                
                {/* YouTube Link */}
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' правильная техника выполнения')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', gap: 8,
                    padding: '8px 16px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700,
                    textDecoration: 'none', transition: 'all 0.2s ease',
                    background: 'rgba(255,0,0,0.1)', color: '#ff4e4e', border: '1px solid rgba(255,0,0,0.2)',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,0,0,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,0,0,0.3)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,0,0,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,0,0,0.2)'; }}
                >
                  <Play size={16} />
                  Смотреть видео на YouTube
                </a>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Print helper ─────────────────────────────────────────────────────────────

function handlePrint(plan: GeneratedPlan) {
  const html = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <title>${plan.title}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #111; padding: 24px; }
        h1 { font-size: 1.4rem; margin-bottom: 4px; }
        h2 { font-size: 1rem; color: #00C47A; margin: 20px 0 6px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        th { background: #f0fdf4; color: #065F46; font-size: 0.75rem; text-align: left; padding: 6px 10px; }
        td { border-bottom: 1px solid #e5e7eb; padding: 8px 10px; font-size: 0.8rem; }
        .tip { color: #6B7280; font-size: 0.75rem; font-style: italic; }
        .cardio { margin-top: 8px; color: #0891B2; font-size: 0.8rem; }
      </style>
    </head>
    <body>
      <h1>${plan.title}</h1>
      <p style="color:#6B7280;font-size:0.85rem">Создано с GymSync</p>
      ${plan.weeklyPlan.map((day) => `
        <h2>${day.dayLabel} — ${day.splitName}</h2>
        <table>
          <thead><tr><th>Упражнение</th><th>Подходы</th><th>Повторения</th><th>Отдых</th></tr></thead>
          <tbody>
            ${day.exercises.map((ex) => `
              <tr>
                <td>${ex.name}${ex.tip ? `<br/><span class="tip">${ex.tip}</span>` : ''}</td>
                <td>${ex.sets}×</td><td>${ex.reps}</td><td>${ex.rest}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${day.cardio ? `<p class="cardio">🏃 Кардио: ${day.cardio}</p>` : ''}
      `).join('')}
    </body>
    </html>
  `;
  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); w.print(); }
}
