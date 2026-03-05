'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
    { imgSrc: '/icons/Discipline (Characteristic Icon).jpg', label: '19 привычек', desc: 'Ежедневный чек-лист дисциплины', color: '#ef4444' },
    { imgSrc: '/icons/Physics (Statistic Icon).jpg', label: 'Тренировки', desc: 'Протокол физической прокачки', color: '#22c55e' },
    { imgSrc: '/icons/Intellect (Characteristic Icon).jpg', label: 'Интеллект', desc: 'Чтение, Deep Work, навыки', color: '#f97316' },
    { imgSrc: '/icons/Resilience (Statistic Icon).jpg', label: 'Устойчивость', desc: 'Медитация, холод, дисциплина', color: '#3b82f6' },
    { imgSrc: '/icons/Charisma (Statistic Icon).jpg', label: 'Харизма', desc: 'Речь, нетворк, влияние', color: '#8b5cf6' },
    { imgSrc: '/icons/Knowledge (Sidebar Icon).jpg', label: 'База знаний', desc: '9 книг + философский кодекс', color: '#eab308' },
];

const PHASES = [
    { num: 1, name: 'Фундамент', months: '1–3', color: '#ef4444', desc: '90 дней без пропуска' },
    { num: 2, name: 'Рост', months: '4–9', color: '#3b82f6', desc: 'Углубление каждого направления' },
    { num: 3, name: 'Трансформация', months: '10–18', color: '#eab308', desc: 'Интеграция и мастерство' },
];

interface WelcomePageProps {
    onStart: (name: string) => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
    const [step, setStep] = useState(0); // 0=hero, 1=features, 2=name input
    const [name, setName] = useState('');

    const handleStart = () => {
        onStart(name.trim() || 'Воин');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(139,92,246,0.08) 0%, transparent 50%), #0a0a0f',
            }}
        >
            <AnimatePresence mode="wait">
                {/* ═══ Step 0: Hero ═══ */}
                {step === 0 && (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-lg"
                    >
                        {/* Logo */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="mb-8"
                        >
                            <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl font-black"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: '0 0 60px rgba(59,130,246,0.15)',
                                }}
                            >
                                <span className="bg-gradient-to-br from-orange-400 to-red-500 bg-clip-text text-transparent">18</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl font-black mb-3"
                        >
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                                LifeOS
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/40 text-lg mb-2"
                        >
                            18 месяцев. 5 направлений.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-white/60 text-xl font-semibold mb-10"
                        >
                            Полная перезагрузка жизни.
                        </motion.p>

                        {/* Phases preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex gap-3 mb-10 justify-center"
                        >
                            {PHASES.map((phase) => (
                                <div key={phase.num}
                                    className="px-4 py-3 rounded-xl text-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${phase.color}15, ${phase.color}05)`,
                                        border: `1px solid ${phase.color}25`,
                                    }}
                                >
                                    <div className="text-xs text-white/30 mb-1">Фаза {phase.num}</div>
                                    <div className="text-sm font-bold" style={{ color: phase.color }}>{phase.name}</div>
                                    <div className="text-[10px] text-white/20 mt-0.5">Мес. {phase.months}</div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setStep(1)}
                            className="px-8 py-4 rounded-2xl text-white font-bold text-lg cursor-pointer flex items-center gap-3 mx-auto"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 4px 30px rgba(59,130,246,0.25)',
                            }}
                        >
                            ✨ Узнать больше ▶
                        </motion.button>
                    </motion.div>
                )}

                {/* ═══ Step 1: Features ═══ */}
                {step === 1 && (
                    <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl w-full"
                    >
                        <h2 className="text-2xl font-black text-center mb-2">
                            Что тебя ждёт
                        </h2>
                        <p className="text-white/40 text-center mb-8">
                            5 направлений трансформации за 548 дней
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {FEATURES.map((f, i) => (
                                <motion.div
                                    key={f.label}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 rounded-xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${f.color}08, ${f.color}03)`,
                                        border: `1px solid ${f.color}15`,
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <img src={f.imgSrc} alt={f.label} className="w-5 h-5 rounded object-cover shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />
                                        <span className="font-bold text-sm">{f.label}</span>
                                    </div>
                                    <p className="text-xs text-white/30 ml-8">{f.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setStep(0)}
                                className="px-6 py-3 rounded-xl text-white/50 text-sm cursor-pointer hover:text-white/70 transition"
                                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                Назад
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setStep(2)}
                                className="px-8 py-3 rounded-xl text-white font-bold cursor-pointer flex items-center gap-2"
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 4px 30px rgba(59,130,246,0.2)',
                                }}
                            >
                                🔥 Готов начать ▶
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Step 2: Name ═══ */}
                {step === 2 && (
                    <motion.div
                        key="name"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md w-full text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="flex justify-center mb-6 text-white text-opacity-90"
                        >
                            <img src="/icons/3D Daily Mission Icon.jpg" alt="Start" className="w-[80px] h-[80px] object-cover rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
                        </motion.div>

                        <h2 className="text-2xl font-black mb-2">Как тебя зовут?</h2>
                        <p className="text-white/40 text-sm mb-8">
                            Твоё имя будет на дашборде и в системе прогресса
                        </p>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введи имя..."
                            autoFocus
                            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-center text-lg font-semibold placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition mb-6"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') setStep(3);
                            }}
                        />

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-3 rounded-xl text-white/50 text-sm cursor-pointer hover:text-white/70 transition"
                                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                Назад
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(59,130,246,0.2)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setStep(3)}
                                className="px-10 py-4 rounded-2xl text-white font-black text-lg cursor-pointer flex items-center gap-3"
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    boxShadow: '0 4px 30px rgba(59,130,246,0.2)',
                                }}
                            >
                                Продолжить ▶
                            </motion.button>
                        </div>

                        <p className="text-white/15 text-xs mt-6">
                            Шаг 1 из 2
                        </p>
                    </motion.div>
                )}

                {/* ═══ Step 3: Core Goals ═══ */}
                {step === 3 && (
                    <motion.div
                        key="start"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl w-full"
                    >
                        <h2 className="text-2xl font-black mb-2 text-center">Твои главные ориентиры</h2>
                        <p className="text-white/40 text-sm mb-6 text-center">
                            Определи 3 главные цели. Они будут на твоем радаре каждый день.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="block text-sm font-semibold text-c-emerald mb-1">1. Что вы хотите иметь?</label>
                                <textarea id="goal-have" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-c-emerald/40 focus:ring-1 focus:ring-c-emerald/20 transition resize-none h-20" placeholder="Материальные цели, доходы, окружение..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-c-sky mb-1">2. Кем вы хотите быть?</label>
                                <textarea id="goal-be" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-c-sky/40 focus:ring-1 focus:ring-c-sky/20 transition resize-none h-20" placeholder="Личностные качества, статус, кем ты себя видишь..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-c-rose mb-1">3. Чем бы хотели заниматься?</label>
                                <textarea id="goal-do" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-c-rose/40 focus:ring-1 focus:ring-c-rose/20 transition resize-none h-20" placeholder="Твоя деятельность, миссия, масштаб..."></textarea>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-3 rounded-xl text-white/50 text-sm cursor-pointer hover:text-white/70 transition"
                                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                Назад
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(249,115,22,0.3)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const wantToHave = (document.getElementById('goal-have') as HTMLTextAreaElement)?.value || '';
                                    const wantToBe = (document.getElementById('goal-be') as HTMLTextAreaElement)?.value || '';
                                    const wantToDo = (document.getElementById('goal-do') as HTMLTextAreaElement)?.value || '';
                                    window.localStorage.setItem('core_goals', JSON.stringify({ wantToHave, wantToBe, wantToDo }));
                                    handleStart();
                                }}
                                className="px-10 py-4 rounded-2xl text-white font-black text-lg cursor-pointer flex items-center gap-3"
                                style={{
                                    background: 'linear-gradient(135deg, #ef4444, #f97316)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    boxShadow: '0 4px 30px rgba(249,115,22,0.3)',
                                }}
                            >
                                ⚔️ Начать путь
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
