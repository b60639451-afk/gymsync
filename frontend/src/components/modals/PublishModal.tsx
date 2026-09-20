import { useState } from 'react';
import { X, Send, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { publishBuddy } from '../../api/client';

type Props = {
  workoutId?:    number;
  preferredTime?: string;
  onClose: (refreshNeeded?: boolean) => void;
};

export default function PublishModal({ workoutId, preferredTime = '', onClose }: Props) {
  const [name,     setName]     = useState('');
  const [telegram, setTelegram] = useState('');
  const [city,     setCity]     = useState('');
  const [district, setDistrict] = useState('');
  const [gymName,  setGymName]  = useState('');
  const [time,     setTime]     = useState(preferredTime);
  const [comment,  setComment]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !telegram.trim()) {
      setError('Имя и Telegram-юзернейм обязательны');
      return;
    }
    const handle = telegram.startsWith('@') ? telegram.slice(1) : telegram;
    setLoading(true); setError('');
    try {
      const result = await publishBuddy({
        name: name.trim(), telegramHandle: handle,
        city: city.trim(), district: district.trim(),
        gymName: gymName.trim(), preferredTime: time,
        comment: comment.trim(), workoutId,
      });
      try {
        const prev: number[] = JSON.parse(localStorage.getItem('gymsync_my_requests') ?? '[]');
        prev.push((result as { request: { id: number } }).request.id);
        localStorage.setItem('gymsync_my_requests', JSON.stringify(prev));
      } catch { /* ignore */ }
      setSuccess(true);
      setTimeout(() => onClose(true), 2200);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка публикации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: 500, width: '90%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 24, padding: '32px 24px', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '1.25rem', marginBottom: 6, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
              Опубликовать анкету
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--fg-sub)' }}>
              Другие спортсмены смогут написать тебе в Telegram
            </p>
          </div>
          <button
            onClick={() => onClose()}
            style={{
              width: 36, height: 36, borderRadius: 12, flexShrink: 0, marginLeft: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
              color: 'var(--fg-muted)', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.border = '1px solid var(--border-md)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.border = '1px solid var(--border)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Success */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 80, height: 80, borderRadius: 32, marginBottom: 24,
                background: 'var(--green-dim)', border: '1px solid var(--green-border)'
              }}
            >
              <CheckCircle size={40} color="var(--green)" />
            </div>
            <h3 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '1.25rem', marginBottom: 8, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
              Анкета опубликована! 🎉
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--fg-sub)' }}>
              Твой запрос появится в ленте напарников
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Workout notice */}
            {workoutId && (
              <div
                style={{
                  padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: '0.8rem', fontWeight: 700, color: 'var(--green)',
                  background: 'var(--green-dim)', border: '1px solid var(--green-border)',
                }}
              >
                <Sparkles size={16} style={{ flexShrink: 0 }} />
                К анкете будет прикреплена твоя программа тренировок
              </div>
            )}

            {/* Name + Telegram */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, color: 'var(--fg-muted)' }}>Имя *</label>
                <input className="input" placeholder="Алексей" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, color: 'var(--fg-muted)' }}>Telegram *</label>
                <input className="input" placeholder="@username" value={telegram} onChange={(e) => setTelegram(e.target.value)} required />
              </div>
            </div>

            {/* City + District */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, color: 'var(--fg-muted)' }}>Город</label>
                <input className="input" placeholder="Москва" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, color: 'var(--fg-muted)' }}>Район</label>
                <input className="input" placeholder="ЦАО" value={district} onChange={(e) => setDistrict(e.target.value)} />
              </div>
            </div>

            {/* Gym */}
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, color: 'var(--fg-muted)' }}>Зал / Локация</label>
              <input className="input" placeholder="FitLife Арбат, Парк Горького..." value={gymName} onChange={(e) => setGymName(e.target.value)} />
            </div>

            {/* Time */}
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, color: 'var(--fg-muted)' }}>Удобное время</label>
              <input className="input" placeholder="07:00–09:00, вечером..." value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            {/* Comment */}
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, color: 'var(--fg-muted)' }}>Комментарий</label>
              <textarea
                className="input"
                rows={3}
                placeholder="Нужна страховка на жиме, новичок — ищу опытного партнёра..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ resize: 'none', lineHeight: 1.6, height: 'auto', padding: '12px 16px' }}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F87171' }}>⚠️ {error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', height: 48, marginTop: 8, opacity: loading ? 0.7 : 1 }}
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Публикуем...</>
                : <><Send size={16} /> Опубликовать анкету</>
              }
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
