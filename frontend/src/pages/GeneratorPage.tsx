import { Zap } from 'lucide-react';
import SplitGenerator from '../components/generator/SplitGenerator';

export default function GeneratorPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8 text-center animate-slide-up">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid var(--border-green)' }}
        >
          <Zap size={11} />
          Генератор сплита
        </div>
        <h1
          className="font-black mb-3"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1.05 }}
        >
          Твоя программа{' '}
          <span className="gradient-text">за 3 шага</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Подберём упражнения под цель, локацию и расписание
        </p>
      </div>

      <SplitGenerator />
    </main>
  );
}
