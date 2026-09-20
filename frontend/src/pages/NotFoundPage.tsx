import { Link } from 'react-router-dom';
import { Home, Dumbbell } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10"
      style={{ paddingTop: '80px', paddingBottom: '120px' }}
    >
      {/* Giant 404 */}
      <p
        className="font-black select-none pointer-events-none"
        style={{
          fontSize:   'clamp(8rem, 30vw, 22rem)',
          lineHeight: 1,
          letterSpacing: '-0.06em',
          background: 'linear-gradient(135deg, rgba(0,255,135,0.08) 0%, rgba(168,85,247,0.06) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
        }}
      >
        404
      </p>

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center -mt-8 mb-6 mx-auto"
        style={{
          background: 'var(--green-dim)',
          border:     '1px solid var(--border-green)',
          boxShadow:  '0 0 40px rgba(0,255,135,0.15)',
        }}
      >
        <Dumbbell size={36} color="var(--green)" />
      </div>

      <h1
        className="font-black text-3xl sm:text-4xl mb-3"
        style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
      >
        Страница не найдена
      </h1>
      <p
        className="text-base mb-8 max-w-xs mx-auto leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        Кажется, ты забрёл не в тот зал 🏋️<br />
        Давай вернёмся на правильную дорогу
      </p>

      <Link to="/" className="btn-primary text-base py-3.5 px-8">
        <Home size={18} />
        На главную
      </Link>
    </main>
  );
}
