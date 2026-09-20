import { Link } from 'react-router-dom';
import { Zap, Users, ArrowRight, Star, Cpu, MapPin } from 'lucide-react';
import LiveFeed from './LiveFeed';

/* ─── Стили констант ──────────────────────────────────────────────────────── */
const S = {
  section:   { width: '100%', maxWidth: 780, margin: '0 auto' },
  cardGrid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 },
  card:      { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 },
  iconBox:   (color: string) => ({
    width: 42, height: 42, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: `${color}18`, border: `1px solid ${color}40`,
    flexShrink: 0,
  }),
  label:    { color: 'var(--fg)', fontWeight: 700, fontSize: '0.9rem', margin: '10px 0 4px' },
  desc:     { color: 'var(--fg-sub)', fontSize: '0.82rem', lineHeight: 1.6 },
  statVal:  { fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '2.4rem', letterSpacing: '-0.04em', lineHeight: 1 },
  statLbl:  { color: 'var(--fg-sub)', fontSize: '0.8rem', fontWeight: 600, marginTop: 4 },
};

const FEATURES = [
  { Icon: Cpu,    label: 'Умный генератор',  desc: 'Программа за 3 клика по цели, локации и расписанию',         color: '#00E676' },
  { Icon: Users,  label: 'Поиск напарника',  desc: 'Находи партнёров по тренировкам в реальном времени',          color: '#8B5CF6' },
  { Icon: MapPin, label: 'Любая локация',    desc: 'Зал, площадка, парк или дом — программа для любого места',   color: '#06B6D4' },
];

export default function HeroSection() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 48px' }}>

      {/* Badge */}
      <div style={{ marginBottom: 28 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 16px', borderRadius: 999,
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.25)', color: 'var(--green)',
        }}>
          <span className="pulse-dot" />
          Бесплатно · Без регистрации
          <Star size={10} fill="currentColor" />
        </span>
      </div>

      {/* Headline */}
      <div style={{ textAlign: 'center', maxWidth: 680, marginBottom: 32 }}>
        <h1 style={{
          fontFamily: '"Outfit", sans-serif', fontWeight: 900,
          fontSize: 'clamp(2.4rem, 6.5vw, 5rem)', letterSpacing: '-0.04em',
          lineHeight: 1, color: 'var(--fg)', margin: '0 0 18px',
        }}>
          Твоя программа{' '}
          <span className="gradient-text">тренировок</span>
          <br />за 3 шага
        </h1>
        <p style={{ color: 'var(--fg-sub)', fontSize: '1rem', lineHeight: 1.65 }}>
          Персональный генератор сплитов + поиск напарника для тренировок
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, justifyContent: 'center', marginBottom: 48 }}>
        <Link to="/generate" className="btn-primary" style={{ height: 48, padding: '0 28px', fontSize: '0.95rem' }}>
          <Zap size={17} />
          Собрать программу
          <ArrowRight size={15} />
        </Link>
        <Link to="/buddies" className="btn-secondary" style={{ height: 48, padding: '0 28px', fontSize: '0.95rem' }}>
          <Users size={17} />
          Найти напарника
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 40, marginBottom: 44, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
        {[
          { v: '50+', l: 'упражнений' },
          { v: '3',   l: 'типа сплита' },
          { v: '∞',   l: 'бесплатно' },
        ].map(({ v, l }) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div className="gradient-text" style={S.statVal}>{v}</div>
            <div style={S.statLbl}>{l}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div style={{ ...S.section, marginBottom: 40 }}>
        <div style={S.cardGrid}>
          {FEATURES.map(({ Icon, label, desc, color }) => (
            <div key={label} style={S.card}>
              <div style={S.iconBox(color)}>
                <Icon size={19} color={color} strokeWidth={2} />
              </div>
              <p style={S.label}>{label}</p>
              <p style={S.desc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live feed */}
      <div style={{ ...S.section, maxWidth: 500 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span className="pulse-dot" />
          <span style={{ color: 'var(--green)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
            Живая лента запросов
          </span>
        </div>
        <LiveFeed />
      </div>
    </main>
  );
}
