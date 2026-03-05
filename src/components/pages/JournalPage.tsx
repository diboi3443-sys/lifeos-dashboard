'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage } from '@/lib/storage';

interface JournalEntry {
    id: string;
    date: string;
    type: 'daily' | 'weekly' | 'monthly';
    score: number;
    fields: Record<string, string>;
}

const DAILY_FIELDS = [
    { key: 'done', label: 'Что сделал (главное)', placeholder: 'Топ действий, которые двигали вперёд...', rows: 3 },
    { key: 'fail', label: 'Где сорвался', placeholder: 'Конкретные моменты. Без оправданий.', rows: 2 },
    { key: 'insight', label: 'Что понял / инсайт', placeholder: 'Чему научился?', rows: 2 },
    { key: 'improve', label: 'Что улучшу', placeholder: '1 конкретное изменение...', rows: 2 },
];

const WEEKLY_FIELDS = [
    { key: 'done', label: 'Топ-5 действий недели', placeholder: '1. ...\n2. ...\n3. ...', rows: 4 },
    { key: 'fail', label: 'Где сорвался', placeholder: 'Срывы и причины...', rows: 3 },
    { key: 'insight', label: 'Инсайты недели', placeholder: '1–3 инсайта...', rows: 3 },
    { key: 'improve', label: 'Изменение на следующую неделю', placeholder: '1 конкретное изменение...', rows: 2 },
    { key: 'phrase', label: 'Фраза недели', placeholder: 'Одна фраза, которую берёшь в след. неделю...', rows: 1 },
];

const MONTHLY_FIELDS = [
    { key: 'win', label: 'Главный прорыв месяца', placeholder: 'Самый важный результат...', rows: 2 },
    { key: 'fail', label: 'Главный провал месяца', placeholder: 'Что пошло не так. Причина. Решение.', rows: 2 },
    { key: 'insight', label: 'Что понял про себя', placeholder: 'Инсайт о характере, мышлении...', rows: 2 },
    { key: 'change', label: 'Изменения в системе', placeholder: 'Что меняю в следующем месяце...', rows: 2 },
];

const TYPE_LABELS: Record<string, string> = {
    daily: 'Ежедневная',
    weekly: 'Еженедельная',
    monthly: 'Ежемесячная',
};

const TYPE_COLORS: Record<string, string> = {
    daily: '#3b82f6',
    weekly: '#8b5cf6',
    monthly: '#f59e0b',
};

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-blue-500/50';

export default function JournalPage() {
    const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal_entries', []);
    const [type, setType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [score, setScore] = useState(7);
    const [fields, setFields] = useState<Record<string, string>>({});
    const [filterType, setFilterType] = useState<string>('all');

    const fieldsDef = type === 'daily' ? DAILY_FIELDS : type === 'weekly' ? WEEKLY_FIELDS : MONTHLY_FIELDS;

    const save = () => {
        if (!Object.values(fields).some(v => v.trim())) return;
        const entry: JournalEntry = {
            id: Date.now().toString(),
            date, type, score,
            fields: { ...fields },
        };
        setEntries(prev => [entry, ...prev]);
        setFields({});
        setScore(7);
    };

    const remove = (id: string) => {
        setEntries(prev => prev.filter(e => e.id !== id));
    };

    const filtered = useMemo(() => {
        return entries.filter(e => filterType === 'all' || e.type === filterType);
    }, [entries, filterType]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="text-2xl font-black mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <img src="/icons/Journal (Sidebar Icon).jpg" alt="Journal" className="w-full h-full object-cover transform scale-[1.2]" />
                </div>
                <span className="gradient-text">Журнал</span>
            </h1>

            <div className="grid grid-cols-2 gap-6">
                {/* LEFT: New Entry */}
                <GlassCard>
                    <h3 className="text-lg font-bold mb-4">Новая запись</h3>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="text-xs text-white/40 block mb-1">Дата</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)}
                                className={inputClass} />
                        </div>
                        <div>
                            <label className="text-xs text-white/40 block mb-1">Тип</label>
                            <select value={type} onChange={e => { setType(e.target.value as any); setFields({}); }}
                                className={inputClass}>
                                <option value="daily">Ежедневная</option>
                                <option value="weekly">Еженедельная</option>
                                <option value="monthly">Ежемесячная</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {fieldsDef.map(f => (
                            <div key={f.key}>
                                <label className="text-xs text-white/40 block mb-1">{f.label}</label>
                                <textarea value={fields[f.key] || ''}
                                    onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                                    rows={f.rows} placeholder={f.placeholder}
                                    className={inputClass} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-white/40">Оценка периода</label>
                            <span className="text-xl font-black" style={{
                                color: score >= 8 ? '#22c55e' : score >= 5 ? '#eab308' : '#ef4444'
                            }}>{score}</span>
                        </div>
                        <input type="range" min={1} max={10} value={score}
                            onChange={e => setScore(parseInt(e.target.value))}
                            className="w-full accent-blue-500" />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button onClick={save}
                            className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-white"
                            style={{ background: 'var(--gradient-primary)' }}>
                            Сохранить запись
                        </button>
                        <button onClick={() => setFields({})}
                            className="px-4 py-2.5 rounded-lg text-sm text-white/40 border border-white/10 hover:bg-white/5">
                            Очистить
                        </button>
                    </div>
                </GlassCard>

                {/* RIGHT: History */}
                <GlassCard>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">История записей</h3>
                        <select value={filterType} onChange={e => setFilterType(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60">
                            <option value="all">Все типы</option>
                            <option value="daily">Ежедневные</option>
                            <option value="weekly">Еженедельные</option>
                            <option value="monthly">Ежемесячные</option>
                        </select>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                        {filtered.length === 0 ? (
                            <p className="text-white/20 text-center py-8 text-sm">Нет записей</p>
                        ) : (
                            filtered.map(entry => (
                                <motion.div key={entry.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.02)' }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-0.5 rounded"
                                                style={{
                                                    background: `${TYPE_COLORS[entry.type]}20`,
                                                    color: TYPE_COLORS[entry.type],
                                                }}>
                                                {TYPE_LABELS[entry.type]}
                                            </span>
                                            <span className="text-xs text-white/30">{entry.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold"
                                                style={{
                                                    color: entry.score >= 8 ? '#22c55e' : entry.score >= 5 ? '#eab308' : '#ef4444'
                                                }}>{entry.score}/10</span>
                                            <button onClick={() => remove(entry.id)}
                                                className="p-1 rounded hover:bg-red-500/20 text-white/20 hover:text-red-400 text-xs font-bold transition-colors">
                                                DEL
                                            </button>
                                        </div>
                                    </div>
                                    {Object.entries(entry.fields).filter(([, v]) => v).slice(0, 2).map(([k, v]) => (
                                        <p key={k} className="text-xs text-white/40 truncate">{v}</p>
                                    ))}
                                </motion.div>
                            ))
                        )}
                    </div>
                </GlassCard>
            </div>
        </motion.div>
    );
}
