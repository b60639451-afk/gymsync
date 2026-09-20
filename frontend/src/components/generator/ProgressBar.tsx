const STEP_LABELS = ['Локация', 'Цель', 'График'];

type Props = { step: number; total?: number; };

export default function ProgressBar({ step, total = 3 }: Props) {
  const percent = Math.min(((step - 1) / (total - 1)) * 100, 100);

  return (
    <div style={{ width: '100%' }}>
      {/* Steps row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        {STEP_LABELS.map((label, i) => {
          const idx      = i + 1;
          const isDone   = step > idx;
          const isActive = step === idx;
          const isLast   = i === STEP_LABELS.length - 1;
          
          return (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center',
                flex: isLast ? 'none' : 1,
              }}
            >
              {/* Circle + label */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div className={`step-pill ${isDone ? 'done' : isActive ? 'active' : ''}`}>
                  {isDone ? '✓' : idx}
                </div>
                <span
                  className="hide-mobile"
                  style={{
                    fontSize: '0.75rem', fontWeight: 700,
                    color: isDone || isActive ? 'var(--green)' : 'var(--fg-muted)',
                    transition: 'color 0.3s',
                    letterSpacing: '0.02em',
                  }}
                >
                  {label}
                </span>
              </div>
              
              {/* Connector line */}
              {!isLast && (
                <div
                  style={{
                    flex: 1, height: 2, margin: '0 12px',
                    background: 'var(--border-md)', borderRadius: 999, overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: isDone ? '100%' : '0%',
                      background: 'var(--grad-green)',
                      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                      boxShadow: isDone ? '0 0 8px rgba(0,230,118,0.5)' : 'none',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom track + counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--border-md)', borderRadius: 999, overflow: 'hidden' }}>
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--fg-muted)', flexShrink: 0 }}>
          {Math.min(step, total)}/{total}
        </span>
      </div>
    </div>
  );
}
