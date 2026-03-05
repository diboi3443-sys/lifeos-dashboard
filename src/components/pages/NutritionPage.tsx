'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage } from '@/lib/storage';
import {
    PRODUCTS, PRODUCT_CATEGORIES, MEAL_LABELS, MEAL_ICONS,
    GOAL_LABELS, GOAL_COLORS, calcTargets,
    type MealType, type MealEntry, type DayMeals, type NutritionGoal, type Product,
} from '@/data/nutrition_data';

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50';

const MEALS: MealType[] = ['breakfast', 'lunch', 'snack', 'dinner'];

const today = () => new Date().toISOString().split('T')[0];

export default function NutritionPage() {
    // ── Settings ──
    const [weight, setWeight] = useLocalStorage<number>('nut_weight', 75);
    const [goal, setGoal] = useLocalStorage<NutritionGoal>('nut_goal', 'maintain');

    // ── Meals ──
    const [meals, setMeals] = useLocalStorage<DayMeals>(`nut_meals_${today()}`, {
        breakfast: [], lunch: [], snack: [], dinner: [],
    });

    // ── Search ──
    const [activeMeal, setActiveMeal] = useState<MealType | null>(null);
    const [search, setSearch] = useState('');
    const [grams, setGrams] = useState('100');

    const targets = calcTargets(weight, goal);

    // Totals
    const allEntries = [...meals.breakfast, ...meals.lunch, ...meals.snack, ...meals.dinner];
    const totals = useMemo(() => {
        return allEntries.reduce((acc, e) => ({
            cal: acc.cal + e.cal,
            protein: acc.protein + e.protein,
            fat: acc.fat + e.fat,
            carbs: acc.carbs + e.carbs,
        }), { cal: 0, protein: 0, fat: 0, carbs: 0 });
    }, [allEntries]);

    const filteredProducts = useMemo(() => {
        if (!search.trim()) return PRODUCTS.slice(0, 12);
        const q = search.toLowerCase();
        return PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
        );
    }, [search]);

    const addProduct = (product: Product, mealType: MealType) => {
        const g = parseInt(grams) || 100;
        const multiplier = g / 100;
        const entry: MealEntry = {
            id: Date.now().toString(),
            productId: product.id,
            productName: product.name,
            grams: g,
            cal: Math.round(product.cal * multiplier),
            protein: Math.round(product.protein * multiplier * 10) / 10,
            fat: Math.round(product.fat * multiplier * 10) / 10,
            carbs: Math.round(product.carbs * multiplier * 10) / 10,
        };
        setMeals(prev => ({
            ...prev,
            [mealType]: [...prev[mealType], entry],
        }));
        setSearch('');
        setGrams('100');
        setActiveMeal(null);
    };

    const removeEntry = (mealType: MealType, entryId: string) => {
        setMeals(prev => ({
            ...prev,
            [mealType]: prev[mealType].filter(e => e.id !== entryId),
        }));
    };

    // Macro ring helpers
    const macros = [
        { label: 'Белки', value: totals.protein, target: targets.protein, color: '#ef4444', unit: 'г' },
        { label: 'Жиры', value: totals.fat, target: targets.fat, color: '#f59e0b', unit: 'г' },
        { label: 'Углеводы', value: totals.carbs, target: targets.carbs, color: '#3b82f6', unit: 'г' },
    ];

    const calPct = Math.min((totals.cal / targets.calories) * 100, 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="text-2xl">🍽️</span>
                <span className="gradient-text">Питание</span>
            </h1>

            {/* ── Settings Row ── */}
            <GlassCard className="mb-6">
                <div className="flex flex-wrap items-end gap-6">
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Вес (кг)</label>
                        <input
                            type="number" value={weight || ''}
                            onChange={e => setWeight(parseInt(e.target.value) || 0)}
                            className={inputClass + ' w-24'}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Цель</label>
                        <div className="flex gap-2">
                            {(Object.keys(GOAL_LABELS) as NutritionGoal[]).map(g => (
                                <button key={g} onClick={() => setGoal(g)}
                                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                                    style={{
                                        background: goal === g ? `${GOAL_COLORS[g]}20` : 'rgba(255,255,255,0.03)',
                                        color: goal === g ? GOAL_COLORS[g] : 'rgba(255,255,255,0.4)',
                                        border: `1px solid ${goal === g ? `${GOAL_COLORS[g]}40` : 'rgba(255,255,255,0.08)'}`,
                                    }}
                                >
                                    {GOAL_LABELS[g]}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-6 ml-auto">
                        <div className="text-center">
                            <div className="text-xs text-white/30">Калории</div>
                            <div className="text-xl font-bold text-white">{targets.calories}</div>
                        </div>
                        {macros.map(m => (
                            <div key={m.label} className="text-center">
                                <div className="text-xs text-white/30">{m.label}</div>
                                <div className="text-xl font-bold" style={{ color: m.color }}>{m.target}г</div>
                            </div>
                        ))}
                    </div>
                </div>
            </GlassCard>

            {/* ── Progress Hero ── */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {/* Calories ring */}
                <GlassCard className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-28 h-28 mb-3">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="42" fill="none"
                                stroke={totals.cal > targets.calories ? '#ef4444' : '#22c55e'}
                                strokeWidth="8" strokeLinecap="round"
                                strokeDasharray={`${calPct * 2.639} 263.9`}
                                className="transition-all duration-700"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black tabular-nums">{totals.cal}</span>
                            <span className="text-[10px] text-white/30">/ {targets.calories}</span>
                        </div>
                    </div>
                    <span className="text-xs text-white/50 font-semibold">ККАЛ</span>
                </GlassCard>

                {/* Macros */}
                {macros.map(m => {
                    const pct = Math.min((m.value / m.target) * 100, 100);
                    return (
                        <GlassCard key={m.label} className="flex flex-col items-center justify-center py-6">
                            <div className="relative w-28 h-28 mb-3">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="42" fill="none"
                                        stroke={m.color} strokeWidth="8" strokeLinecap="round"
                                        strokeDasharray={`${pct * 2.639} 263.9`}
                                        className="transition-all duration-700"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black tabular-nums" style={{ color: m.color }}>{Math.round(m.value)}</span>
                                    <span className="text-[10px] text-white/30">/ {m.target}г</span>
                                </div>
                            </div>
                            <span className="text-xs font-semibold" style={{ color: m.color }}>{m.label}</span>
                        </GlassCard>
                    );
                })}
            </div>

            {/* ── Meals ── */}
            <div className="grid grid-cols-2 gap-6">
                {MEALS.map(mealType => {
                    const entries = meals[mealType];
                    const mealCal = entries.reduce((s, e) => s + e.cal, 0);
                    const mealProtein = entries.reduce((s, e) => s + e.protein, 0);

                    return (
                        <GlassCard key={mealType}>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold flex items-center gap-2">
                                    <span className="text-base">{MEAL_ICONS[mealType]}</span>
                                    {MEAL_LABELS[mealType]}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-white/40">
                                    <span>{mealCal} ккал</span>
                                    <span className="text-red-400/60">{Math.round(mealProtein)}г Б</span>
                                </div>
                            </div>

                            {/* Entries */}
                            {entries.length > 0 && (
                                <div className="space-y-1 mb-3">
                                    {entries.map(e => (
                                        <div key={e.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02] group">
                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                <span className="text-sm text-white/70 truncate">{e.productName}</span>
                                                <span className="text-xs text-white/20 shrink-0">{e.grams}г</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs tabular-nums text-white/50">{e.cal} ккал</span>
                                                <span className="text-[10px] tabular-nums text-red-400/40">Б{e.protein}</span>
                                                <span className="text-[10px] tabular-nums text-yellow-400/40">Ж{e.fat}</span>
                                                <span className="text-[10px] tabular-nums text-blue-400/40">У{e.carbs}</span>
                                                <button
                                                    onClick={() => removeEntry(mealType, e.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-white/20 hover:text-red-400 text-xs font-bold transition-opacity"
                                                >
                                                    ✖
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add button / search */}
                            {activeMeal === mealType ? (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            value={search} onChange={e => setSearch(e.target.value)}
                                            placeholder="Поиск продукта..."
                                            className={inputClass + ' flex-1'}
                                            autoFocus
                                        />
                                        <input
                                            value={grams} onChange={e => setGrams(e.target.value)}
                                            placeholder="г"
                                            type="number"
                                            className={inputClass + ' w-20'}
                                        />
                                        <button
                                            onClick={() => { setActiveMeal(null); setSearch(''); }}
                                            className="px-3 py-2 rounded-lg bg-white/5 text-white/30 hover:text-white/60 text-xs"
                                        >
                                            ✖
                                        </button>
                                    </div>
                                    <div className="max-h-[200px] overflow-y-auto space-y-1 scrollbar-hide">
                                        {filteredProducts.map(p => (
                                            <button key={p.id}
                                                onClick={() => addProduct(p, mealType)}
                                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-white/30">{p.category}</span>
                                                    <span className="text-sm text-white/70 truncate">{p.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-white/30 shrink-0">
                                                    <span>{p.cal} ккал</span>
                                                    <span className="text-red-400/50">Б{p.protein}</span>
                                                    <span className="text-yellow-400/50">Ж{p.fat}</span>
                                                    <span className="text-blue-400/50">У{p.carbs}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setActiveMeal(mealType)}
                                    className="w-full py-2 rounded-lg border border-dashed border-white/10 text-sm text-white/30 hover:text-white/60 hover:border-white/20 transition-colors"
                                >
                                    + Добавить продукт
                                </button>
                            )}
                        </GlassCard>
                    );
                })}
            </div>
        </motion.div>
    );
}
