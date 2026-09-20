import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Zap, Users } from 'lucide-react';

const NAV_LINKS = [
  { to: '/generate', label: 'Конструктор', Icon: Zap   },
  { to: '/buddies',  label: 'Напарники',   Icon: Users  },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="navbar">
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '100%', padding: '0 18px',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'var(--green)', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(0,230,118,0.45)',
          }}>
            <Dumbbell size={16} color="#05050f" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: '"Outfit", sans-serif', fontWeight: 800,
            fontSize: '1.05rem', letterSpacing: '-0.03em', color: 'var(--fg)',
          }}>
            Gym<span className="gradient-text">Sync</span>
          </span>
        </Link>

        {/* Centre links — desktop only */}
        <div
          className="hide-mobile"
          style={{ display: 'flex', gap: 2, padding: 4, borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}
        >
          {NAV_LINKS.map(({ to, label, Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 9,
                  fontSize: '0.875rem', fontWeight: 700,
                  textDecoration: 'none', transition: 'all 0.15s ease',
                  color:      active ? '#05050f' : 'var(--fg-sub)',
                  background: active ? 'var(--green)' : 'transparent',
                  boxShadow:  active ? '0 0 12px rgba(0,230,118,0.4)' : 'none',
                }}
              >
                <Icon size={14} strokeWidth={2.2} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA — desktop only */}
        <Link
          to="/generate"
          className="btn-primary hide-mobile"
          style={{ height: 36, padding: '0 18px', fontSize: '0.85rem', borderRadius: 10 }}
        >
          <Zap size={14} />
          Создать сплит
        </Link>

        {/* Mobile: just logo, nothing else — BottomNav handles navigation */}
      </div>
    </header>
  );
}
