'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, Trash2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage } from '@/lib/storage';

const CATEGORIES = [
    { id: 'food', emoji: '🍽️', label: 'Еда', color: '#f97316' },
    { id: 'transport', emoji: '🚗', label: 'Транспорт', color: '#3b82f6' },
    { id: 'entertainment', emoji: '🎮', label: 'Развлечения', color: '#8b5cf6' },
    { id: 'health', emoji: '💊', label: 'Здоровье', color: '#22c55e' },
    { id: 'education', emoji: '🎓', label: 'Обучение', color: '#eab308' },
    { id: 'clothes', emoji: '👕', label: 'Одежда', color: '#ec4899' },
    { id: 'subscriptions', emoji: '📱', label: 'Подписки', color: '#06b6d4' },
    { id: 'other', emoji: '📦', label: 'Другое', color: '#6b7280' },
];

interface Budget { income: number; pctSave: number; pctInvest: number; pctFree: number; month: string; }
interface FixedExpense { id: string; name: string; amount: number; }
interface Expense { id: string; desc: string; amount: number; category: string; date: string; }
interface Goal { id: string; name: string; target: number; saved: number; }

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50';
const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

export default function FinancePage() {
    const [budget, setBudget] = useLocalStorage<Budget>('fin_budget', { income: 0, pctSave: 30, pctInvest: 20, pctFree: 50, month: '' });
    const [fixed, setFixed] = useLocalStorage<FixedExpense[]>('fin_fixed', []);
    const [expenses, setExpenses] = useLocalStorage<Expense[]>('fin_expenses', []);
    const [goals, setGoals] = useLocalStorage<Goal[]>('fin_goals', []);

    const [newFixed, setNewFixed] = useState({ name: '', amount: '' });
    const [newExpense, setNewExpense] = useState({ desc: '', amount: '', category: 'food' });
    const [newGoal, setNewGoal] = useState({ name: '', target: '' });
    const [addToGoal, setAddToGoal] = useState<Record<string, string>>({});

    const fixedTotal = fixed.reduce((s, f) => s + f.amount, 0);
    const expensesTotal = expenses.reduce((s, e) => s + e.amount, 0);
    const freeAmount = budget.income * (budget.pctFree / 100);
    const saveAmount = budget.income * (budget.pctSave / 100);
    const investAmount = budget.income * (budget.pctInvest / 100);
    const dailyLimit = budget.income > 0 ? Math.round((freeAmount - fixedTotal) / 30) : 0;
    const todaySpent = expenses
        .filter(e => e.date === new Date().toISOString().split('T')[0])
        .reduce((s, e) => s + e.amount, 0);

    const addFixed = () => {
        if (!newFixed.name || !newFixed.amount) return;
        setFixed(p => [...p, { id: Date.now().toString(), name: newFixed.name, amount: parseInt(newFixed.amount) }]);
        setNewFixed({ name: '', amount: '' });
    };

    const addExpense = () => {
        if (!newExpense.desc || !newExpense.amount) return;
        setExpenses(p => [{ id: Date.now().toString(), desc: newExpense.desc, amount: parseInt(newExpense.amount), category: newExpense.category, date: new Date().toISOString().split('T')[0] }, ...p]);
        setNewExpense({ desc: '', amount: '', category: 'food' });
    };

    const addGoalFn = () => {
        if (!newGoal.name || !newGoal.target) return;
        setGoals(p => [...p, { id: Date.now().toString(), name: newGoal.name, target: parseInt(newGoal.target), saved: 0 }]);
        setNewGoal({ name: '', target: '' });
    };

    const addSavings = (goalId: string) => {
        const amount = parseInt(addToGoal[goalId] || '0');
        if (!amount) return;
        setGoals(p => p.map(g => g.id === goalId ? { ...g, saved: g.saved + amount } : g));
        setAddToGoal(p => ({ ...p, [goalId]: '' }));
    };

    const catStats = useMemo(() => {
        const map: Record<string, number> = {};
        expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount; });
        return map;
    }, [expenses]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="text-2xl font-black mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/30">
                    <Wallet className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="gradient-text">Финансы</span>
            </h1>

            {/* Budget Setup */}
            <GlassCard className="mb-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    📈 Бюджет месяца
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Доход за месяц (₽)</label>
                        <input type="number" value={budget.income || ''}
                            onChange={e => setBudget(p => ({ ...p, income: parseInt(e.target.value) || 0 }))}
                            placeholder="150000" className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Месяц</label>
                        <input type="month" value={budget.month}
                            onChange={e => setBudget(p => ({ ...p, month: e.target.value }))}
                            className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="text-xs text-white/40 flex items-center gap-1 mb-1">💎 Накопления %</label>
                        <input type="number" value={budget.pctSave} min={0} max={100}
                            onChange={e => setBudget(p => ({ ...p, pctSave: parseInt(e.target.value) || 0 }))}
                            className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 flex items-center gap-1 mb-1">📖 Развитие %</label>
                        <input type="number" value={budget.pctInvest} min={0} max={100}
                            onChange={e => setBudget(p => ({ ...p, pctInvest: parseInt(e.target.value) || 0 }))}
                            className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 flex items-center gap-1 mb-1">🎯 На жизнь %</label>
                        <input type="number" value={budget.pctFree} min={0} max={100}
                            onChange={e => setBudget(p => ({ ...p, pctFree: parseInt(e.target.value) || 0 }))}
                            className={inputClass} />
                    </div>
                </div>

                {/* Overview */}
                {budget.income > 0 && (
                    <div className="grid grid-cols-4 gap-3 p-4 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="text-center">
                            <div className="text-xs text-white/30 mb-1">Накопления</div>
                            <div className="text-lg font-bold text-green-400">{fmt(saveAmount)}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-white/30 mb-1">Развитие</div>
                            <div className="text-lg font-bold text-blue-400">{fmt(investAmount)}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-white/30 mb-1">На жизнь</div>
                            <div className="text-lg font-bold text-yellow-400">{fmt(freeAmount)}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-white/30 mb-1">Лимит/день</div>
                            <div className="text-lg font-bold text-white">{fmt(dailyLimit)}</div>
                        </div>
                    </div>
                )}
            </GlassCard>

            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Fixed Expenses */}
                <GlassCard>
                    <h3 className="text-sm font-bold text-white/60 mb-3 flex items-center gap-2">
                        ⚠️ Постоянные расходы
                    </h3>
                    <div className="space-y-2 mb-3">
                        {fixed.map(f => (
                            <div key={f.id} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                                <span className="text-sm text-white/70">{f.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-red-400">{fmt(f.amount)}</span>
                                    <button onClick={() => setFixed(p => p.filter(x => x.id !== f.id))}
                                        className="p-1 rounded hover:bg-red-500/20 text-white/20 hover:text-red-400 text-xs font-bold">
                                        ✖
                                    </button>
                                </div>
                            </div>
                        ))}
                        {fixed.length > 0 && (
                            <div className="flex justify-between p-2 border-t border-white/10 text-sm font-bold">
                                <span className="text-white/50">Итого:</span>
                                <span className="text-red-400">{fmt(fixedTotal)}</span>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_auto] gap-2">
                        <input value={newFixed.name} onChange={e => setNewFixed(p => ({ ...p, name: e.target.value }))} placeholder="Квартира" className={inputClass} />
                        <input value={newFixed.amount} onChange={e => setNewFixed(p => ({ ...p, amount: e.target.value }))} placeholder="45000" className={inputClass} />
                        <button onClick={addFixed} className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors shrink-0">
                            <Plus className="w-5 h-5 text-blue-400" />
                        </button>
                    </div>
                </GlassCard>

                {/* Savings Goals */}
                <GlassCard>
                    <h3 className="text-sm font-bold text-white/60 mb-3 flex items-center gap-2">
                        🎯 Цели накопления
                    </h3>
                    <div className="space-y-3 mb-3">
                        {goals.map(g => (
                            <div key={g.id} className="p-3 rounded-lg border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-white/70 font-medium">{g.name}</span>
                                    <button onClick={() => setGoals(p => p.filter(x => x.id !== g.id))}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors">
                                        <Trash2 className="w-4 h-4 text-white/30 hover:text-red-400" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                                    <span>{fmt(g.saved)} / {fmt(g.target)}</span>
                                    <span>{Math.round((g.saved / g.target) * 100)}%</span>
                                </div>
                                <div className="progress-bar mb-2">
                                    <motion.div className="progress-bar-fill"
                                        style={{ background: g.saved >= g.target ? 'var(--gradient-success)' : 'var(--gradient-primary)' }}
                                        animate={{ width: `${Math.min((g.saved / g.target) * 100, 100)}%` }} />
                                </div>
                                <div className="flex gap-2">
                                    <input type="number" value={addToGoal[g.id] || ''}
                                        onChange={e => setAddToGoal(p => ({ ...p, [g.id]: e.target.value }))}
                                        placeholder="+ сумма" className={inputClass + ' !py-1'} />
                                    <button onClick={() => addSavings(g.id)}
                                        className="px-3 py-1 rounded-lg text-xs text-white" style={{ background: 'var(--gradient-success)' }}>
                                        Внести
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_auto] gap-2">
                        <input value={newGoal.name} onChange={e => setNewGoal(p => ({ ...p, name: e.target.value }))} placeholder="MacBook" className={inputClass} />
                        <input value={newGoal.target} onChange={e => setNewGoal(p => ({ ...p, target: e.target.value }))} placeholder="200000" className={inputClass} />
                        <button onClick={addGoalFn} className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors shrink-0">
                            <Plus className="w-5 h-5 text-blue-400" />
                        </button>
                    </div>
                </GlassCard>
            </div>

            {/* Quick expense + history */}
            <GlassCard>
                <h3 className="text-sm font-bold text-white/60 mb-3 flex items-center gap-2">
                    🧾 Записать расход
                </h3>
                <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 mb-4 items-end">
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Описание</label>
                        <input value={newExpense.desc} onChange={e => setNewExpense(p => ({ ...p, desc: e.target.value }))} placeholder="Кофе" className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Сумма ₽</label>
                        <input value={newExpense.amount} onChange={e => setNewExpense(p => ({ ...p, amount: e.target.value }))} placeholder="350" className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Категория</label>
                        <select value={newExpense.category} onChange={e => setNewExpense(p => ({ ...p, category: e.target.value }))} className={inputClass}>
                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                    </div>
                    <button onClick={addExpense} className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors shrink-0">
                        <Plus className="w-5 h-5 text-blue-400" />
                    </button>
                </div>

                {/* Today summary */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 mb-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <span className="text-sm text-white/40">Сегодня потрачено:</span>
                    <span className="text-lg font-bold" style={{ color: todaySpent > dailyLimit ? '#ef4444' : '#22c55e' }}>
                        {fmt(todaySpent)} <span className="text-xs text-white/30">/ {fmt(dailyLimit)}</span>
                    </span>
                </div>

                {/* Category breakdown */}
                <div className="flex gap-2 flex-wrap mb-4">
                    {CATEGORIES.filter(c => catStats[c.id]).map(c => (
                        <div key={c.id} className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1" style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}>
                            <span>{c.emoji}</span> {c.label}: {fmt(catStats[c.id])}
                        </div>
                    ))}
                </div>

                {/* Expense list */}
                {expenses.length > 0 && (
                    <div className="space-y-1 max-h-[300px] overflow-y-auto">
                        {expenses.slice(0, 30).map(e => {
                            const cat = CATEGORIES.find(c => c.id === e.category) || CATEGORIES[7];
                            return (
                                <div key={e.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <div className="flex items-center gap-2">
                                        <span style={{ color: cat.color }}>{cat.emoji}</span>
                                        <span className="text-sm text-white/70">{e.desc}</span>
                                        <span className="text-xs text-white/20">{e.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-white/60">{fmt(e.amount)}</span>
                                        <button onClick={() => setExpenses(p => p.filter(x => x.id !== e.id))}
                                            className="p-1 rounded hover:bg-red-500/20 text-white/20 hover:text-red-400 text-xs font-bold">
                                            ✖
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </GlassCard>
        </motion.div>
    );
}
