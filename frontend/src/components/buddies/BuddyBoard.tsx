import { useEffect, useState, useCallback } from 'react';
import { Plus, RefreshCw, SearchX, Users } from 'lucide-react';
import BuddyCard from './BuddyCard';
import BuddyFiltersBar from './BuddyFilters';
import PublishModal from '../modals/PublishModal';
import { getBuddies } from '../../api/client';
import type { BuddyRequest, BuddyFilters } from '../../types';

export default function BuddyBoard() {
  const [buddies,   setBuddies]   = useState<BuddyRequest[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filters,   setFilters]   = useState<BuddyFilters>({ city: '', gymName: '', goal: '' });

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await getBuddies({ city: filters.city, goal: filters.goal });
      setBuddies(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, [filters.city, filters.goal]);

  useEffect(() => { load(); }, [load]);

  const displayed = filters.gymName
    ? buddies.filter((b) => b.gymName.toLowerCase().includes(filters.gymName.toLowerCase()))
    : buddies;

  const handlePublishClose = (refreshNeeded?: boolean) => {
    setShowModal(false);
    if (refreshNeeded) load();
  };

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--violet-dim)', border: '1px solid var(--border-violet)' }}
          >
            <Users size={18} color="var(--violet)" />
          </div>
          <div>
            <p className="font-black text-base" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {loading
                ? 'Загружаем...'
                : displayed.length > 0
                  ? `${displayed.length} активных запросов`
                  : 'Запросов пока нет'}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Обновляется каждые 15 секунд
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={load}
            disabled={loading}
            className="btn-secondary px-3 py-2.5"
            title="Обновить"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={() => setShowModal(true)} className="btn-violet text-sm px-4 py-2.5">
            <Plus size={15} />
            Опубликовать
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <BuddyFiltersBar filters={filters} onChange={setFilters} />
      </div>

      {/* Error */}
      {error && (
        <div
          className="p-4 rounded-xl mb-6 text-sm font-semibold flex items-center gap-3"
          style={{ background: 'rgba(239,68,68,0.08)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <span>⚠️ {error}</span>
          <button onClick={load} className="underline ml-auto">повторить</button>
        </div>
      )}

      {/* Skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="glass-card p-5"
              style={{ minHeight: 220, animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)' }} />
                <div className="flex-1 flex flex-col gap-2 pt-1">
                  <div className="h-3 rounded-full w-2/3" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  <div className="h-2.5 rounded-full w-1/3" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="h-5 rounded-full w-16" style={{ background: 'rgba(0,255,135,0.06)' }} />
                <div className="h-5 rounded-full w-20" style={{ background: 'rgba(255,255,255,0.04)' }} />
              </div>
              <div className="h-16 rounded-xl mb-4" style={{ background: 'rgba(255,255,255,0.03)' }} />
              <div className="h-8 rounded-lg" style={{ background: 'rgba(34,158,217,0.06)' }} />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && displayed.length === 0 && (
        <div
          className="text-center py-20 rounded-3xl"
          style={{ border: '1px dashed var(--border-hover)', background: 'rgba(255,255,255,0.01)' }}
        >
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'var(--violet-dim)', border: '1px solid var(--border-violet)' }}
          >
            <SearchX size={36} color="var(--violet)" />
          </div>
          <p className="font-black text-xl mb-2" style={{ color: 'var(--text-secondary)', letterSpacing: '-0.03em' }}>
            Запросов не найдено
          </p>
          <p className="text-sm mb-8 max-w-xs mx-auto" style={{ color: 'var(--text-muted)' }}>
            Измени фильтры или будь первым — опубликуй свой запрос!
          </p>
          <button onClick={() => setShowModal(true)} className="btn-violet">
            <Plus size={16} />
            Опубликовать запрос
          </button>
        </div>
      )}

      {/* Cards */}
      {!loading && displayed.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((buddy, i) => (
            <div
              key={buddy.id}
              style={{
                opacity: 0,
                animation: `fade-in 0.4s ease-out ${i * 0.06}s forwards`,
              }}
            >
              <BuddyCard buddy={buddy} onClose={load} />
            </div>
          ))}
        </div>
      )}

      {/* Publish modal */}
      {showModal && <PublishModal onClose={handlePublishClose} />}
    </div>
  );
}
