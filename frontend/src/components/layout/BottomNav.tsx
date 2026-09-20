import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, Users } from 'lucide-react';

const ITEMS = [
  { to: '/',         label: 'Главная',   Icon: Home  },
  { to: '/generate', label: 'Сплит',     Icon: Zap   },
  { to: '/buddies',  label: 'Напарники', Icon: Users },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav md:hidden">
      {ITEMS.map(({ to, label, Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column' as const,
              alignItems: 'center', justifyContent: 'center', gap: 4,
              textDecoration: 'none', padding: '4px 0',
              color: active ? 'var(--green)' : 'var(--fg-muted)',
              transition: 'color 0.15s ease',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: active ? 'var(--green-dim)' : 'transparent',
              transition: 'background 0.15s ease',
            }}>
              <Icon size={19} strokeWidth={active ? 2.5 : 1.8} />
            </div>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.01em' }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
