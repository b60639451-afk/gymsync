import { Users } from 'lucide-react';
import BuddyBoard from '../components/buddies/BuddyBoard';

export default function BuddiesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-10 animate-slide-up">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'var(--violet-dim)', color: 'var(--violet)', border: '1px solid var(--border-violet)' }}
        >
          <Users size={11} />
          Поиск напарника
        </div>
        <h1
          className="font-black mb-3"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1.05 }}
        >
          Найди своего{' '}
          <span className="gradient-text-violet">напарника</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Спортсмены из твоего города, которые ищут партнёра для тренировок
        </p>
      </div>

      <BuddyBoard />
    </main>
  );
}
