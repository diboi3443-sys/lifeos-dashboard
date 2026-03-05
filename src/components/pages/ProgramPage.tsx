'use client';

import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage } from '@/lib/storage';
import { PROGRAM_30_DAYS, DayData } from '@/data/30_day_data';

const PHASES = [
    {
        id: 'prep',
        name: 'СТАРТ — 30 ДНЕЙ',
        color: '#a855f7',
        months: [0],
        desc: 'Вводный курс. Знакомство с системой. Подготовка.',
        weeksTotal: 4,
    },
    {
        id: 'p1',
        name: 'ФАЗА 1 — ФУНДАМЕНТ',
        color: '#ef4444',
        months: [1, 2, 3],
        desc: 'Дисциплина. Привычки. Каркас.',
        weeksTotal: 12,
    },
    {
        id: 'p2',
        name: 'ФАЗА 2 — РОСТ',
        color: '#3b82f6',
        months: [4, 5, 6, 7, 8, 9],
        desc: 'Углубление. Мастерство. Результаты.',
        weeksTotal: 24,
    },
    {
        id: 'p3',
        name: 'ФАЗА 3 — ТРАНСФОРМАЦИЯ',
        color: '#eab308',
        months: [10, 11, 12, 13, 14, 15, 16, 17, 18],
        desc: 'Интеграция. Лидерство. Лучшая версия.',
        weeksTotal: 36,
    },
];

export default function ProgramPage() {
    // True for 30D track, False for 18M track
    const [is30DayTrack, setIs30DayTrack] = useLocalStorage('program_track_30d', true);

    // 18M Progress
    const [completed18M, setCompleted18M] = useLocalStorage<Record<string, boolean>>('program_weeks', {});
    const totalWeeks18M = 76; // 4 + 12 + 24 + 36
    const done18MCount = Object.values(completed18M).filter(Boolean).length;

    // 30D Progress
    const [completed30D, setCompleted30D] = useLocalStorage<Record<number, boolean>>('program_days_30d', {});
    const totalDays30D = 30;
    const done30DCount = Object.values(completed30D).filter(Boolean).length;

    const toggleWeek18M = (key: string) => {
        setCompleted18M(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleDay30D = (day: number) => {
        setCompleted30D(prev => ({ ...prev, [day]: !prev[day] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <img src="/icons/Program (Sidebar Icon).jpg" alt="Program" className="w-full h-full object-cover transform scale-125" />
                        </div>
                        <span className="gradient-text">Карта Пути</span>
                    </h1>
                    <p className="text-white/40 text-sm">Твой персональный маршрут трансформации шаг за шагом</p>
                </div>

                {/* Track Selector */}
                <div className="flex p-1 rounded-xl bg-white/[0.02] border border-white/[0.05] shrink-0">
                    <button
                        onClick={() => setIs30DayTrack(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${is30DayTrack ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/70'
                            }`}
                    >
                        Старт: 30 Дней
                    </button>
                    <button
                        onClick={() => setIs30DayTrack(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!is30DayTrack ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/70'
                            }`}
                    >
                        LifeOS: 18 Месяцев
                    </button>
                </div>
            </div>

            {/* Overall progress */}
            <GlassCard className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white/50 uppercase tracking-widest">
                        {is30DayTrack ? 'Прогресс спринта' : 'Общий прогресс пути'}
                    </span>
                    <span className="text-sm font-black text-white/90">
                        {is30DayTrack
                            ? `${done30DCount}/${totalDays30D} дней (${Math.round((done30DCount / totalDays30D) * 100)}%)`
                            : `${done18MCount}/${totalWeeks18M} недель (${Math.round((done18MCount / totalWeeks18M) * 100)}%)`
                        }
                    </span>
                </div>
                <div className="progress-bar h-3 bg-white/[0.02]">
                    <motion.div
                        className="progress-bar-fill shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        style={{ background: 'var(--gradient-primary)' }}
                        animate={{ width: `${(is30DayTrack ? (done30DCount / totalDays30D) : (done18MCount / totalWeeks18M)) * 100}%` }}
                        transition={{ duration: 0.8, type: "spring" }}
                    />
                </div>
            </GlassCard>

            <AnimatePresence mode="wait">
                {is30DayTrack ? (
                    <motion.div
                        key="30d"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        {PROGRAM_30_DAYS.map((dayData: DayData) => {
                            const isDone = completed30D[dayData.day];
                            return (
                                <GlassCard
                                    key={dayData.day}
                                    className={`transition-all duration-300 ${isDone ? 'border-green-500/30 bg-green-500/5' : ''}`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => toggleDay30D(dayData.day)}
                                                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${isDone
                                                    ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                                                    : 'bg-white/5 text-white/30 hover:bg-white/10'
                                                    }`}
                                            >
                                                {isDone ? <span className="text-xl">✅</span> : <span className="font-black text-lg">{dayData.day}</span>}
                                            </button>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">День {dayData.day}</div>
                                                <h3 className={`text-xl font-black ${isDone ? 'text-green-400' : 'text-white'}`}>{dayData.title}</h3>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 md:w-1/2">
                                            {dayData.tasks.map((task, i) => (
                                                <div key={i} className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/[0.02]">
                                                    <div className="mt-0.5 shrink-0">
                                                        {task.type === 'video' ? <span className="text-blue-400">⚡</span> :
                                                            task.type === 'action' ? <span className="text-orange-400">🔥</span> :
                                                                <span className="text-purple-400">⏰</span>}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-white/90">{task.title}</div>
                                                        <div className="text-xs text-white/50 leading-relaxed mt-1">{task.description}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </GlassCard>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        key="18m"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative pl-6 space-y-8 pb-8"
                    >
                        {/* Vertical connecting line */}
                        <div className="absolute left-[11px] top-6 bottom-0 w-[3px]" style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.2), rgba(255,255,255,0.02))' }} />

                        {PHASES.map((phase, idx) => {
                            const phaseDone = phase.months.reduce((sum, m) => {
                                return sum + [1, 2, 3, 4].filter(w => completed18M[`${m}-${w}`]).length;
                            }, 0);
                            const isFullyDone = phaseDone === phase.weeksTotal;

                            return (
                                <div key={phase.id} className="relative">
                                    {/* Node Dot */}
                                    <div className="absolute -left-[32px] top-6 w-5 h-5 rounded-full border-[5px] border-[#0a0a0f] z-10 transition-colors"
                                        style={{ background: isFullyDone ? phase.color : 'rgba(255,255,255,0.2)', boxShadow: isFullyDone ? `0 0 15px ${phase.color}` : 'none' }}
                                    />

                                    <GlassCard className={`transition-all duration-300 relative overflow-hidden ${isFullyDone ? 'border-opacity-50' : ''}`} style={{ borderColor: isFullyDone ? phase.color : 'rgba(255,255,255,0.05)' }}>
                                        {isFullyDone && <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, ${phase.color}15, transparent)` }} />}

                                        <div className="relative z-10">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                                <h3 className="font-black text-2xl tracking-tight" style={{ color: phase.color }}>{phase.name}</h3>
                                                <div className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg" style={{ background: `${phase.color}15`, color: phase.color }}>
                                                    {phaseDone}/{phase.weeksTotal} недель
                                                </div>
                                            </div>
                                            <p className="text-sm text-white/50 mb-6 font-medium leading-relaxed max-w-2xl">{phase.desc}</p>

                                            <div className="space-y-4">
                                                {phase.months.map(month => (
                                                    <div key={month} className="flex flex-col md:flex-row md:items-center gap-3">
                                                        <span className="text-xs font-bold uppercase tracking-widest text-white/30 w-24 shrink-0">
                                                            {month === 0 ? 'Старт' : `Месяц ${month}`}
                                                        </span>
                                                        <div className="flex gap-2 flex-1">
                                                            {[1, 2, 3, 4].map(week => {
                                                                const key = `${month}-${week}`;
                                                                const done = completed18M[key] || false;
                                                                return (
                                                                    <button key={week}
                                                                        onClick={() => toggleWeek18M(key)}
                                                                        className="flex-1 h-12 rounded-xl text-sm font-bold transition-all relative overflow-hidden group"
                                                                        style={{
                                                                            background: done
                                                                                ? `${phase.color}25`
                                                                                : 'rgba(255,255,255,0.02)',
                                                                            border: `1px solid ${done ? `${phase.color}50` : 'rgba(255,255,255,0.06)'}`,
                                                                            color: done ? phase.color : 'rgba(255,255,255,0.3)',
                                                                        }}
                                                                    >
                                                                        <span className="relative z-10">{done ? <span className="text-sm">✅</span> : `Н${week}`}</span>
                                                                        {!done && <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
