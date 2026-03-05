'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage, formatDate, formatDateRu } from '@/lib/storage';

/* ═══ HABITS DATA ═══ */
const HABITS = [
    { id: 'wake', label: 'Подъём 5:00', iconSrc: '/icons/Morning (Diary Icon).jpg' },
    { id: 'cold', label: 'Холодный душ', iconSrc: '/icons/Physical (Sidebar Icon).jpg' },
    { id: 'meditate', label: 'Медитация', iconSrc: '/icons/Resilience (Statistic Icon).jpg', tooltip: '15 минут в тишине. Концентрация на дыхании. Если отвлекся - мягко возвращайся.' },
    { id: 'read', label: 'Чтение', iconSrc: '/icons/Knowledge (Sidebar Icon).jpg' },
    { id: 'workout', label: 'Тренировка', iconSrc: '/icons/Physical (Sidebar Icon).jpg', tooltip: 'Минимум 45 мин интенсивной нагрузки или протокол силы.' },
    { id: 'deepwork', label: 'Deep Work 4ч', iconSrc: '/icons/Intellect (Characteristic Icon).jpg', tooltip: 'Сфокусированная работа без отвлечений и телефона.' },
    { id: 'nosugar', label: 'Без сахара', iconSrc: '/icons/Discipline (Characteristic Icon).jpg' },
    { id: 'water', label: 'Вода 2л', iconSrc: '/icons/Physics (Statistic Icon).jpg' },
    { id: 'walk', label: 'Прогулка', iconSrc: '/icons/Physical (Sidebar Icon).jpg' },
    { id: 'journal', label: 'Журнал вечер', iconSrc: '/icons/Evening (Diary Icon).jpg' },
    { id: 'noporn', label: 'NoFap', iconSrc: '/icons/Discipline (Characteristic Icon).jpg' },
    { id: 'noalcohol', label: 'Без алкоголя', iconSrc: '/icons/Discipline (Characteristic Icon).jpg' },
    { id: 'sleep', label: 'Сон до 22:30', iconSrc: '/icons/Evening (Diary Icon).jpg' },
    { id: 'posture', label: 'Осанка', iconSrc: '/icons/Physical (Sidebar Icon).jpg', tooltip: 'Регулярная проверка на прямую спину, лопатки вместе.' },
    { id: 'gratitude', label: 'Благодарность', iconSrc: '/icons/Charisma (Statistic Icon).jpg' },
    { id: 'skills', label: 'Навык 30 мин', iconSrc: '/icons/Intellect (Characteristic Icon).jpg' },
    { id: 'social', label: 'Соц. контакт', iconSrc: '/icons/Charisma (Statistic Icon).jpg' },
    { id: 'finance', label: 'Расходы', iconSrc: '/icons/Finance (Sidebar Icon).jpg' },
    { id: 'vitamins', label: 'Витамины', iconSrc: '/icons/Physics (Statistic Icon).jpg' },
];

const DIRECTIONS = [
    { key: 'discipline', label: 'Дисциплина', color: '#ef4444', imgSrc: '/icons/Discipline (Characteristic Icon).jpg' },
    { key: 'physical', label: 'Физика', color: '#22c55e', imgSrc: '/icons/Physics (Characteristic Icon).jpg' },
    { key: 'intellect', label: 'Интеллект', color: '#3b82f6', imgSrc: '/icons/Intellect (Characteristic Icon).jpg' },
    { key: 'resilience', label: 'Устойчивость', color: '#0ea5e9', imgSrc: '/icons/Resilience (Characteristic Icon).jpg' },
    { key: 'charisma', label: 'Харизма', color: '#8b5cf6', imgSrc: '/icons/Charisma (Characteristic Icon).jpg' },
];

interface DayData {
    habits: Record<string, boolean>;
    scores: Record<string, number>;
    dayScore: number;
    fail: string;
    insight: string;
    improve: string;
    tasks: string[];
}

const emptyDay = (): DayData => ({
    habits: {},
    scores: { discipline: 5, physical: 5, intellect: 5, resilience: 5, charisma: 5 },
    dayScore: 5,
    fail: '',
    insight: '',
    improve: '',
    tasks: ['', '', ''],
});

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export default function TrackerPage() {
    const [allDays, setAllDays] = useLocalStorage<Record<string, DayData>>('tracker_days', {});
    const [currentDate, setCurrentDate] = useState(new Date());
    const dateKey = formatDate(currentDate);

    const dayData = useMemo(() => allDays[dateKey] || emptyDay(), [allDays, dateKey]);

    const updateDay = (partial: Partial<DayData>) => {
        setAllDays(prev => ({
            ...prev,
            [dateKey]: { ...dayData, ...partial },
        }));
    };

    const toggleHabit = (id: string) => {
        const habits = { ...dayData.habits, [id]: !dayData.habits[id] };
        updateDay({ habits });
    };

    const setDirectionScore = (dir: string, val: number) => {
        const scores = { ...dayData.scores, [dir]: val };
        updateDay({ scores });
    };

    const setTask = (index: number, value: string) => {
        const tasks = [...dayData.tasks];
        tasks[index] = value;
        updateDay({ tasks });
    };

    const changeDate = (delta: number) => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + delta);
        setCurrentDate(d);
    };

    const goToday = () => setCurrentDate(new Date());

    const habitsCompleted = Object.values(dayData.habits).filter(Boolean).length;
    const isToday = formatDate(new Date()) === dateKey;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }}
            exit={{ opacity: 0, y: -20 }}
        >
            {/* Date navigation */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <button onClick={() => changeDate(-1)} className="w-8 h-8 rounded-lg overflow-hidden hover:opacity-80 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    <img src="/icons/arrow_left_right_pair.jpg" className="w-full h-[200%] object-cover" style={{ objectPosition: 'top' }} alt="Left" />
                </button>
                <div className="text-center flex-1">
                    <h2 className="text-xl font-bold">{formatDateRu(currentDate)}</h2>
                    <p className="text-white/30 text-sm">{isToday ? 'Сегодня' : dateKey}</p>
                </div>
                <button onClick={() => changeDate(1)} className="w-8 h-8 rounded-lg overflow-hidden hover:opacity-80 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    <img src="/icons/arrow_left_right_pair.jpg" className="w-full h-[200%] object-cover" style={{ objectPosition: 'bottom' }} alt="Right" />
                </button>
                {!isToday && (
                    <button onClick={goToday}
                        className="px-3 py-1.5 text-xs rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                        Сегодня
                    </button>
                )}
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
                {/* LEFT: Habits */}
                <motion.div variants={itemVariants}>
                    <GlassCard>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">Привычки дня</h3>
                            <span className="text-sm text-white/40">{habitsCompleted}/{HABITS.length}</span>
                        </div>
                        <div className="space-y-1.5">
                            {HABITS.map(h => {
                                const done = dayData.habits[h.id] || false;
                                return (
                                    <button key={h.id}
                                        onClick={() => toggleHabit(h.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                                            ${done ? 'bg-green-500/10 text-green-400' : 'hover:bg-white/5 text-white/60'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${done ? 'bg-green-500/20' : 'bg-white/5'}`}>
                                            <img src={h.iconSrc} alt={h.label} className={`w-5 h-5 rounded object-cover ${done ? 'opacity-100' : 'opacity-70 group-hover:opacity-100 transition-opacity'}`} />
                                        </div>
                                        <div className="flex items-center gap-2 flex-1 relative">
                                            <span className="text-sm">{h.label}</span>
                                            {h.tooltip && (
                                                <div className="group/tooltip ml-auto">
                                                    <span className="text-white/30 hover:text-white/70 cursor-help text-xs" onClick={(e) => e.stopPropagation()}>❓</span>
                                                    <div className="absolute right-0 bottom-full mb-2 w-56 p-3 bg-[#1a1a2e] border border-white/10 rounded-xl text-xs text-white/80 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                                                        {h.tooltip}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        {/* Progress bar */}
                        <div className="mt-4">
                            <div className="progress-bar">
                                <motion.div
                                    className="progress-bar-fill"
                                    style={{ background: 'var(--gradient-success)' }}
                                    animate={{ width: `${(habitsCompleted / HABITS.length) * 100}%` }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                            <p className="text-xs text-white/30 mt-1 text-center">
                                {Math.round((habitsCompleted / HABITS.length) * 100)}% выполнено
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* RIGHT: Итог дня */}
                <motion.div variants={itemVariants} className="space-y-4">
                    {/* Day Score */}
                    <GlassCard>
                        <h3 className="text-lg font-bold mb-4">Итог дня</h3>

                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm text-white/50">Оценка дня</label>
                                <span className="text-2xl font-black" style={{
                                    color: dayData.dayScore >= 8 ? '#22c55e' : dayData.dayScore >= 5 ? '#eab308' : '#ef4444'
                                }}>{dayData.dayScore}</span>
                            </div>
                            <input type="range" min={1} max={10} value={dayData.dayScore}
                                onChange={e => updateDay({ dayScore: parseInt(e.target.value) })}
                                className="w-full accent-blue-500" />
                        </div>

                        {/* Text fields */}
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-white/40 block mb-1">Главный провал дня</label>
                                <textarea value={dayData.fail}
                                    onChange={e => updateDay({ fail: e.target.value })}
                                    rows={2} placeholder="Конкретно. Без самобичевания."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-blue-500/50" />
                            </div>
                            <div>
                                <label className="text-xs text-white/40 block mb-1">Главный инсайт дня</label>
                                <textarea value={dayData.insight}
                                    onChange={e => updateDay({ insight: e.target.value })}
                                    rows={2} placeholder="Что понял сегодня?"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-blue-500/50" />
                            </div>
                            <div>
                                <label className="text-xs text-white/40 block mb-1">Что улучшу завтра</label>
                                <textarea value={dayData.improve}
                                    onChange={e => updateDay({ improve: e.target.value })}
                                    rows={2} placeholder="1 конкретное изменение."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-blue-500/50" />
                            </div>
                        </div>
                    </GlassCard>

                    {/* 3 Tasks */}
                    <GlassCard>
                        <h4 className="text-sm font-semibold text-white/50 mb-3">🎯 3 задачи дня</h4>
                        <div className="space-y-2">
                            {[0, 1, 2].map(i => (
                                <input key={i} type="text"
                                    value={dayData.tasks[i] || ''}
                                    onChange={e => setTask(i, e.target.value)}
                                    placeholder={`Задача ${i + 1}`}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
                            ))}
                        </div>
                    </GlassCard>

                    {/* Direction scores */}
                    <GlassCard>
                        <h4 className="text-sm font-semibold text-white/50 mb-3">📊 Оценка по направлениям</h4>
                        <div className="space-y-3">
                            {DIRECTIONS.map(dir => {
                                const val = dayData.scores[dir.key] || 5;
                                return (
                                    <div key={dir.key}>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.5)] bg-black" style={{ border: `1px solid ${dir.color}50` }}>
                                                    {dir.imgSrc ? (
                                                        <img src={dir.imgSrc} alt={dir.label} className="w-full h-full object-cover transform scale-125" />
                                                    ) : null}
                                                </div>
                                                <span className="text-xs text-white/60">{dir.label}</span>
                                            </div>
                                            <span className="text-sm font-bold" style={{ color: dir.color }}>{val}</span>
                                        </div>
                                        <input type="range" min={1} max={10} value={val}
                                            onChange={e => setDirectionScore(dir.key, parseInt(e.target.value))}
                                            className="w-full"
                                            style={{ accentColor: dir.color }} />
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </motion.div>
    );
}
