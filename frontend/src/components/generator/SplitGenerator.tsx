import { useState } from 'react';
import { ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import ProgressBar from './ProgressBar';
import StepLocation from './StepLocation';
import StepGoal from './StepGoal';
import StepSchedule from './StepSchedule';
import WorkoutResult from './WorkoutResult';
import PublishModal from '../modals/PublishModal';
import { generateWorkout } from '../../api/client';
import type { LocationType, GoalType, GeneratedPlan, GeneratorStep } from '../../types';

export default function SplitGenerator() {
  // ─── Form state ─────────────────────────────────────────────────────────────
  const [step, setStep]                 = useState<GeneratorStep>(1);
  const [location, setLocation]         = useState<LocationType | ''>('');
  const [goal, setGoal]                 = useState<GoalType | ''>('');
  const [daysPerWeek, setDaysPerWeek]   = useState<2 | 3 | 4 | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState('');

  // ─── Result state ────────────────────────────────────────────────────────────
  const [plan, setPlan]               = useState<GeneratedPlan | null>(null);
  const [workoutId, setWorkoutId]     = useState<number | null>(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [showPublish, setShowPublish] = useState(false);

  // ─── Day toggle ──────────────────────────────────────────────────────────────
  const handleDayToggle = (d: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(d)) return prev.filter((x) => x !== d);
      if (daysPerWeek && prev.length >= daysPerWeek) return prev;
      return [...prev, d];
    });
  };

  const handleDaysPerWeek = (n: 2 | 3 | 4) => {
    setDaysPerWeek(n);
    setSelectedDays((prev) => prev.slice(0, n));
  };

  // ─── Validation ──────────────────────────────────────────────────────────────
  const canProceed = () => {
    if (step === 1) return location !== '';
    if (step === 2) return goal !== '';
    if (step === 3) return daysPerWeek !== null && selectedDays.length === daysPerWeek;
    return false;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!location || !goal || !daysPerWeek) return;
    setLoading(true); setError('');
    try {
      const result = await generateWorkout({ locationType: location, goal, daysPerWeek, selectedDays, preferredTime });
      setPlan(result.plan);
      setWorkoutId(result.workoutId);
      setStep('result');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка генерации. Попробуй снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1); setLocation(''); setGoal('');
    setDaysPerWeek(null); setSelectedDays([]); setPreferredTime('');
    setPlan(null); setWorkoutId(null); setError('');
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ width: '100%', maxWidth: 640, margin: '0 auto' }}>
      <div
        style={{
          position:      'relative',
          overflow:      'hidden',
          background:    'var(--bg-card)',
          border:        '1px solid var(--border)',
          borderRadius:  24,
          boxShadow:     'var(--shadow-lg), 0 0 0 1px rgba(255,255,255,0.03) inset',
        }}
      >
        {/* Top gradient accent */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: step === 'result'
              ? 'var(--grad-primary)'
              : `linear-gradient(90deg, var(--green) 0%, var(--green) ${((Math.min(step as number, 3) - 1) / 2) * 100}%, rgba(255,255,255,0.08) ${((Math.min(step as number, 3) - 1) / 2) * 100}%)`,
            boxShadow: '0 0 16px rgba(0,230,118,0.4)',
            transition: 'all 0.5s ease',
          }}
        />

        <div style={{ padding: '32px 24px' }}>
          {/* ProgressBar */}
          {step !== 'result' && (
            <div style={{ marginBottom: 32 }}>
              <ProgressBar step={step as number} total={3} />
            </div>
          )}

          {/* Steps */}
          {step === 1 && <StepLocation value={location} onChange={(v) => { setLocation(v); }} />}
          {step === 2 && <StepGoal     value={goal}     onChange={(v) => { setGoal(v); }} />}
          {step === 3 && (
            <StepSchedule
              daysPerWeek={daysPerWeek} selectedDays={selectedDays} preferredTime={preferredTime}
              onDaysPerWeek={handleDaysPerWeek} onDayToggle={handleDayToggle} onTimeChange={setPreferredTime}
            />
          )}
          {step === 'result' && plan && workoutId !== null && (
            <WorkoutResult plan={plan} workoutId={workoutId} onPublish={() => setShowPublish(true)} onReset={handleReset} />
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: 16, padding: 16, borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(239,68,68,0.08)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)',
                fontSize: '0.85rem', fontWeight: 600,
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Navigation */}
          {step !== 'result' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, gap: 12 }}>
              {(step as number) > 1 ? (
                <button
                  onClick={() => setStep((s) => (s as number) - 1 as GeneratorStep)}
                  className="btn-secondary"
                  style={{ padding: '0 20px', height: 44, fontSize: '0.9rem' }}
                >
                  <ChevronLeft size={16} /> Назад
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => canProceed() && setStep((s) => (s as number) + 1 as GeneratorStep)}
                  disabled={!canProceed()}
                  className="btn-primary"
                  style={{
                    marginLeft: 'auto', padding: '0 28px', height: 44,
                    opacity: canProceed() ? 1 : 0.4, cursor: canProceed() ? 'pointer' : 'not-allowed',
                  }}
                >
                  Далее <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="btn-primary"
                  style={{
                    marginLeft: 'auto', padding: '0 28px', height: 44,
                    opacity: canProceed() && !loading ? 1 : 0.4, cursor: canProceed() && !loading ? 'pointer' : 'not-allowed',
                  }}
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Генерируем...</>
                  ) : (
                    <><Sparkles size={16} /> Сгенерировать</>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Publish modal */}
      {showPublish && workoutId !== null && (
        <PublishModal workoutId={workoutId} preferredTime={preferredTime} onClose={() => setShowPublish(false)} />
      )}
    </div>
  );
}
