'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage } from '@/lib/storage';

interface BodyMeasurement {
    month: string;
    weight: string;
    chest: string;
    waist: string;
    biceps: string;
    pullups: string;
}

interface Workout {
    id: string;
    date: string;
    type: string;
    exercise: string;
    weight: string;
    feel: number;
    note: string;
}

interface StrengthMax {
    exercise: string;
    start: string;
    m6: string;
    m12: string;
    m18: string;
}

const WORKOUT_TYPES = ['Силовая А (Верх)', 'Силовая Б (Низ)', 'Силовая В (Full)', 'Кардио', 'Функциональная', 'Восстановление'];
const STRENGTH_EXERCISES = ['Жим лёжа', 'Присед', 'Становая тяга', 'Подтягивания', 'Жим стоя', 'Тяга штанги'];

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50';

export default function PhysicalPage() {
    const [measurements, setMeasurements] = useLocalStorage<BodyMeasurement[]>('physical_measurements', []);
    const [workouts, setWorkouts] = useLocalStorage<Workout[]>('physical_workouts', []);
    const [strengthMaxes, setStrengthMaxes] = useLocalStorage<StrengthMax[]>('physical_strength',
        STRENGTH_EXERCISES.map(e => ({ exercise: e, start: '', m6: '', m12: '', m18: '' }))
    );

    // New measurement
    const [newMeasure, setNewMeasure] = useState<BodyMeasurement>({ month: '', weight: '', chest: '', waist: '', biceps: '', pullups: '' });

    // New workout
    const [newWorkout, setNewWorkout] = useState({
        date: new Date().toISOString().split('T')[0],
        type: WORKOUT_TYPES[0],
        exercise: '', weight: '', feel: 8, note: '',
    });

    const addMeasurement = () => {
        if (!newMeasure.month) return;
        setMeasurements(prev => [...prev, newMeasure]);
        setNewMeasure({ month: '', weight: '', chest: '', waist: '', biceps: '', pullups: '' });
    };

    const addWorkout = () => {
        if (!newWorkout.exercise) return;
        const w: Workout = { id: Date.now().toString(), ...newWorkout };
        setWorkouts(prev => [w, ...prev]);
        setNewWorkout(prev => ({ ...prev, exercise: '', weight: '', note: '' }));
    };

    const removeWorkout = (id: string) => {
        setWorkouts(prev => prev.filter(w => w.id !== id));
    };

    const updateStrength = (idx: number, field: string, val: string) => {
        setStrengthMaxes(prev => {
            const next = [...prev];
            next[idx] = { ...next[idx], [field]: val };
            return next;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="inline-block align-middle mr-3 w-8 h-8 rounded-lg overflow-hidden border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)] bg-green-950">
                <img src="/icons/Body (Sidebar Icon).jpg" alt="Physical" className="w-full h-full object-cover transform scale-125" />
            </div>
            <span className="gradient-text align-middle">Физика</span>

            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Body Measurements */}
                <GlassCard>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="text-white/50 text-xl">📏</span> Замеры тела
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-white/40 text-xs">
                                    <th className="text-left pb-2">Месяц</th>
                                    <th className="text-left pb-2">Вес</th>
                                    <th className="text-left pb-2">Грудь</th>
                                    <th className="text-left pb-2">Талия</th>
                                    <th className="text-left pb-2">Бицепс</th>
                                    <th className="text-left pb-2">Подтяг.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {measurements.map((m, i) => (
                                    <tr key={i} className="border-t border-white/5">
                                        <td className="py-2 text-white/70">{m.month}</td>
                                        <td className="py-2 text-white/70">{m.weight}</td>
                                        <td className="py-2 text-white/70">{m.chest}</td>
                                        <td className="py-2 text-white/70">{m.waist}</td>
                                        <td className="py-2 text-white/70">{m.biceps}</td>
                                        <td className="py-2 text-white/70">{m.pullups}</td>
                                    </tr>
                                ))}
                                <tr className="border-t border-white/10">
                                    <td className="py-2"><input value={newMeasure.month} onChange={e => setNewMeasure(p => ({ ...p, month: e.target.value }))} placeholder="Мес." className={inputClass + ' !py-1 !px-2'} /></td>
                                    <td className="py-2"><input value={newMeasure.weight} onChange={e => setNewMeasure(p => ({ ...p, weight: e.target.value }))} placeholder="кг" className={inputClass + ' !py-1 !px-2'} /></td>
                                    <td className="py-2"><input value={newMeasure.chest} onChange={e => setNewMeasure(p => ({ ...p, chest: e.target.value }))} placeholder="см" className={inputClass + ' !py-1 !px-2'} /></td>
                                    <td className="py-2"><input value={newMeasure.waist} onChange={e => setNewMeasure(p => ({ ...p, waist: e.target.value }))} placeholder="см" className={inputClass + ' !py-1 !px-2'} /></td>
                                    <td className="py-2"><input value={newMeasure.biceps} onChange={e => setNewMeasure(p => ({ ...p, biceps: e.target.value }))} placeholder="см" className={inputClass + ' !py-1 !px-2'} /></td>
                                    <td className="py-2"><input value={newMeasure.pullups} onChange={e => setNewMeasure(p => ({ ...p, pullups: e.target.value }))} placeholder="#" className={inputClass + ' !py-1 !px-2'} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button onClick={addMeasurement}
                        className="mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ background: 'var(--gradient-primary)' }}>
                        + Добавить замер
                    </button>
                </GlassCard>

                {/* Strength Maxes */}
                <GlassCard>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="text-white/50 text-xl">💪</span> Силовые максимумы
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-white/40 text-xs">
                                    <th className="text-left pb-2">Упражнение</th>
                                    <th className="text-left pb-2">Старт</th>
                                    <th className="text-left pb-2">М6</th>
                                    <th className="text-left pb-2">М12</th>
                                    <th className="text-left pb-2">М18</th>
                                </tr>
                            </thead>
                            <tbody>
                                {strengthMaxes.map((s, i) => (
                                    <tr key={i} className="border-t border-white/5">
                                        <td className="py-2 text-white/70 font-medium">{s.exercise}</td>
                                        <td className="py-2"><input value={s.start} onChange={e => updateStrength(i, 'start', e.target.value)} placeholder="кг" className={inputClass + ' !py-1 !px-2'} /></td>
                                        <td className="py-2"><input value={s.m6} onChange={e => updateStrength(i, 'm6', e.target.value)} placeholder="кг" className={inputClass + ' !py-1 !px-2'} /></td>
                                        <td className="py-2"><input value={s.m12} onChange={e => updateStrength(i, 'm12', e.target.value)} placeholder="кг" className={inputClass + ' !py-1 !px-2'} /></td>
                                        <td className="py-2"><input value={s.m18} onChange={e => updateStrength(i, 'm18', e.target.value)} placeholder="кг" className={inputClass + ' !py-1 !px-2'} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </div>

            {/* Add Workout + Log */}
            <GlassCard>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="text-white/50 text-xl">✍️</span> Добавить тренировку
                </h3>
                <div className="grid grid-cols-6 gap-3 items-end">
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Дата</label>
                        <input type="date" value={newWorkout.date} onChange={e => setNewWorkout(p => ({ ...p, date: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Тип</label>
                        <select value={newWorkout.type} onChange={e => setNewWorkout(p => ({ ...p, type: e.target.value }))} className={inputClass}>
                            {WORKOUT_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Упражнение</label>
                        <input value={newWorkout.exercise} onChange={e => setNewWorkout(p => ({ ...p, exercise: e.target.value }))} placeholder="Жим лёжа 3×5" className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Вес (кг)</label>
                        <input value={newWorkout.weight} onChange={e => setNewWorkout(p => ({ ...p, weight: e.target.value }))} placeholder="80" className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-1">Ощущение</label>
                        <input type="number" min={1} max={10} value={newWorkout.feel} onChange={e => setNewWorkout(p => ({ ...p, feel: parseInt(e.target.value) || 0 }))} className={inputClass} />
                    </div>
                    <button onClick={addWorkout}
                        className="py-2 rounded-lg text-sm font-medium text-white"
                        style={{ background: 'var(--gradient-primary)' }}>
                        <span className="font-bold text-lg mx-auto">+</span>
                    </button>
                </div>
                <div className="mt-2">
                    <input value={newWorkout.note} onChange={e => setNewWorkout(p => ({ ...p, note: e.target.value }))} placeholder="Заметка к тренировке..." className={inputClass} />
                </div>

                {/* Workout log */}
                {workouts.length > 0 && (
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-white/40 text-xs">
                                    <th className="text-left pb-2">Дата</th>
                                    <th className="text-left pb-2">Тип</th>
                                    <th className="text-left pb-2">Упражнение</th>
                                    <th className="text-left pb-2">Вес</th>
                                    <th className="text-left pb-2">Ощущ.</th>
                                    <th className="text-left pb-2">Заметка</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {workouts.slice(0, 20).map(w => (
                                    <tr key={w.id} className="border-t border-white/5">
                                        <td className="py-2 text-white/50">{w.date}</td>
                                        <td className="py-2 text-white/50">{w.type}</td>
                                        <td className="py-2 text-white/70">{w.exercise}</td>
                                        <td className="py-2 text-white/70">{w.weight}кг</td>
                                        <td className="py-2">
                                            <span style={{ color: w.feel >= 8 ? '#22c55e' : w.feel >= 5 ? '#eab308' : '#ef4444' }}>{w.feel}/10</span>
                                        </td>
                                        <td className="py-2 text-white/40 truncate max-w-[150px]">{w.note}</td>
                                        <td className="py-2">
                                            <button onClick={() => removeWorkout(w.id)} className="w-6 h-6 rounded-full overflow-hidden hover:opacity-80 transition-opacity shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                                <img src="/icons/delete_remove_button.jpg" className="w-full h-[200%] object-cover" style={{ objectPosition: 'center' }} alt="Delete" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </GlassCard>
        </motion.div>
    );
}
