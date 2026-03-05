'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Dumbbell, Brain, Heart, Sparkles, GraduationCap,
    type LucideIcon,
} from 'lucide-react';
import PhotoAvatar from '@/components/PhotoAvatar';

const FEATURES: { icon: LucideIcon; label: string; desc: string; color: string }[] = [
    { icon: Shield, label: '19 привычек', desc: 'Ежедневный чек-лист дисциплины', color: '#ef4444' },
    { icon: Dumbbell, label: 'Тренировки', desc: 'Протокол физической прокачки', color: '#22c55e' },
    { icon: Brain, label: 'Интеллект', desc: 'Чтение, Deep Work, навыки', color: '#f97316' },
    { icon: Heart, label: 'Устойчивость', desc: 'Медитация, холод, дисциплина', color: '#3b82f6' },
    { icon: Sparkles, label: 'Харизма', desc: 'Речь, нетворк, влияние', color: '#8b5cf6' },
    { icon: GraduationCap, label: 'База знаний', desc: '9 книг + философский кодекс', color: '#eab308' },
];

const PHASES = [
    { num: 1, name: 'Фундамент', months: '1-3', color: '#ef4444', desc: '90 дней без пропуска' },
    { num: 2, name: 'Рост', months: '4-9', color: '#3b82f6', desc: 'Углубление каждого направления' },
    { num: 3, name: 'Трансформация', months: '10-18', color: '#eab308', desc: 'Интеграция и мастерство' },
];

interface WelcomePageProps {
    onStart: (name: string) => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');

    const handleStart = () => {
        onStart(name.trim() || 'Воин');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6"
            style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(139,92,246,0.05) 0%, transparent 50%), var(--background)',
            }}
        >
            <AnimatePresence mode="wait">
                {/* Step 0: Hero */}
                {step === 0 && (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-md w-full px-2"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="mb-6 sm:mb-8"
                        >
                            <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl font-black border border-border sm:w-24 sm:h-24 sm:text-4xl"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
                                }}
                            >
                                <span className="bg-gradient-to-br from-c-amber to-c-rose bg-clip-text text-transparent">18</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-black mb-2 sm:text-4xl"
                        >
                            <span className="bg-gradient-to-r from-primary via-c-violet to-c-amber bg-clip-text text-transparent">
                                LifeOS
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-muted-foreground/60 text-base mb-1 sm:text-lg"
                        >
                            18 месяцев. 5 направлений.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-muted-foreground text-lg font-semibold mb-8 sm:text-xl sm:mb-10"
                        >
                            Полная перезагрузка жизни.
                        </motion.p>

                        {/* Phases */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex gap-2 mb-8 justify-center sm:gap-3 sm:mb-10"
                        >
                            {PHASES.map((phase) => (
                                <div key={phase.num}
                                    className="px-3 py-2.5 rounded-xl text-center border border-border flex-1 max-w-[120px] sm:px-4 sm:py-3"
                                    style={{
                                        background: `linear-gradient(135deg, ${phase.color}08, ${phase.color}03)`,
                                        borderColor: `${phase.color}15`,
                                    }}
                                >
                                    <div className="text-[9px] text-muted-foreground/50 mb-0.5 sm:text-[10px]">Фаза {phase.num}</div>
                                    <div className="text-xs font-bold sm:text-sm" style={{ color: phase.color }}>{phase.name}</div>
                                    <div className="text-[9px] text-muted-foreground/30 mt-0.5 sm:text-[10px]">Мес. {phase.months}</div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setStep(1)}
                            className="px-6 py-3.5 rounded-2xl text-primary-foreground font-bold text-base cursor-pointer flex items-center gap-2.5 mx-auto border border-primary/20 sm:px-8 sm:py-4 sm:text-lg sm:gap-3"
                            style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                boxShadow: '0 4px 24px rgba(99,102,241,0.25)',
                            }}
                        >
                            Узнать больше
                        </motion.button>
                    </motion.div>
                )}

                {/* Step 1: Features */}
                {step === 1 && (
                    <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl w-full px-2"
                    >
                        <h2 className="text-xl font-black text-center mb-1 text-foreground sm:text-2xl">
                            Что тебя ждёт
                        </h2>
                        <p className="text-muted-foreground/60 text-center mb-6 text-sm sm:mb-8">
                            5 направлений трансформации за 548 дней
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 mb-6 sm:gap-3 sm:mb-8">
                            {FEATURES.map((f, i) => {
                                const Icon = f.icon;
                                return (
                                    <motion.div
                                        key={f.label}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-3.5 rounded-xl border border-border sm:p-4"
                                        style={{
                                            background: `linear-gradient(135deg, ${f.color}08, ${f.color}03)`,
                                            borderColor: `${f.color}15`,
                                        }}
                                    >
                                        <div className="flex items-center gap-2.5 mb-1.5 sm:gap-3">
                                            <div
                                                className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 sm:h-10 sm:w-10"
                                                style={{ background: `${f.color}15` }}
                                            >
                                                <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" style={{ color: f.color }} />
                                            </div>
                                            <span className="font-bold text-xs text-foreground sm:text-sm">{f.label}</span>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/60 ml-[46px] sm:text-xs sm:ml-[52px]">{f.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="flex gap-2.5 justify-center sm:gap-3">
                            <button
                                onClick={() => setStep(0)}
                                className="px-5 py-2.5 rounded-xl text-muted-foreground text-sm cursor-pointer hover:text-foreground transition border border-border sm:px-6 sm:py-3"
                            >
                                Назад
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setStep(2)}
                                className="px-6 py-2.5 rounded-xl text-primary-foreground font-bold cursor-pointer flex items-center gap-2 border border-primary/20 sm:px-8 sm:py-3"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                    boxShadow: '0 4px 24px rgba(99,102,241,0.2)',
                                }}
                            >
                                Готов начать
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Name + Photo */}
                {step === 2 && (
                    <motion.div
                        key="name"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md w-full text-center px-2"
                    >
                        {/* Photo upload */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="flex justify-center mb-5 sm:mb-6"
                        >
                            <PhotoAvatar size={120} editable />
                        </motion.div>

                        <h2 className="text-xl font-black mb-1 text-foreground sm:text-2xl">Как тебя зовут?</h2>
                        <p className="text-muted-foreground/60 text-xs mb-5 sm:text-sm sm:mb-6">
                            Загрузи фото и введи имя для дашборда
                        </p>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введи имя..."
                            autoFocus
                            className="w-full px-5 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-center text-base font-semibold placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition mb-5 sm:px-6 sm:py-4 sm:text-lg sm:mb-6"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') setStep(3);
                            }}
                        />

                        <div className="flex gap-2.5 justify-center sm:gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="px-5 py-2.5 rounded-xl text-muted-foreground text-sm cursor-pointer hover:text-foreground transition border border-border sm:px-6 sm:py-3"
                            >
                                Назад
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setStep(3)}
                                className="px-6 py-2.5 rounded-xl text-primary-foreground font-bold cursor-pointer flex items-center gap-2 border border-primary/20 sm:px-8 sm:py-3 sm:text-lg"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                    boxShadow: '0 4px 24px rgba(99,102,241,0.2)',
                                }}
                            >
                                Продолжить
                            </motion.button>
                        </div>

                        <p className="text-muted-foreground/25 text-[10px] mt-5 sm:text-xs sm:mt-6">
                            Шаг 1 из 2
                        </p>
                    </motion.div>
                )}

                {/* Step 3: Core Goals */}
                {step === 3 && (
                    <motion.div
                        key="start"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl w-full px-2"
                    >
                        <h2 className="text-xl font-black mb-1 text-center text-foreground sm:text-2xl">Твои главные ориентиры</h2>
                        <p className="text-muted-foreground/60 text-xs mb-5 text-center sm:text-sm sm:mb-6">
                            Определи 3 главные цели. Они будут на твоём радаре каждый день.
                        </p>

                        <div className="flex flex-col gap-3 mb-6 sm:gap-4 sm:mb-8">
                            <div>
                                <label className="block text-xs font-semibold text-c-emerald mb-1 sm:text-sm">1. Что вы хотите иметь?</label>
                                <textarea
                                    id="goal-have"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-xs placeholder:text-muted-foreground/30 focus:outline-none focus:border-c-emerald/40 focus:ring-1 focus:ring-c-emerald/10 transition resize-none h-16 sm:px-4 sm:py-3 sm:text-sm sm:h-20"
                                    placeholder="Материальные цели, доходы, окружение..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-c-sky mb-1 sm:text-sm">2. Кем вы хотите быть?</label>
                                <textarea
                                    id="goal-be"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-xs placeholder:text-muted-foreground/30 focus:outline-none focus:border-c-sky/40 focus:ring-1 focus:ring-c-sky/10 transition resize-none h-16 sm:px-4 sm:py-3 sm:text-sm sm:h-20"
                                    placeholder="Личностные качества, статус..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-c-rose mb-1 sm:text-sm">3. Чем бы хотели заниматься?</label>
                                <textarea
                                    id="goal-do"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-xs placeholder:text-muted-foreground/30 focus:outline-none focus:border-c-rose/40 focus:ring-1 focus:ring-c-rose/10 transition resize-none h-16 sm:px-4 sm:py-3 sm:text-sm sm:h-20"
                                    placeholder="Твоя деятельность, миссия, масштаб..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-2.5 justify-center sm:gap-3">
                            <button
                                onClick={() => setStep(2)}
                                className="px-5 py-2.5 rounded-xl text-muted-foreground text-sm cursor-pointer hover:text-foreground transition border border-border sm:px-6 sm:py-3"
                            >
                                Назад
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                    const wantToHave = (document.getElementById('goal-have') as HTMLTextAreaElement)?.value || '';
                                    const wantToBe = (document.getElementById('goal-be') as HTMLTextAreaElement)?.value || '';
                                    const wantToDo = (document.getElementById('goal-do') as HTMLTextAreaElement)?.value || '';
                                    window.localStorage.setItem('core_goals', JSON.stringify({ wantToHave, wantToBe, wantToDo }));
                                    handleStart();
                                }}
                                className="px-6 py-2.5 rounded-xl text-primary-foreground font-black cursor-pointer flex items-center gap-2 border border-c-rose/20 sm:px-8 sm:py-3 sm:text-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #ef4444, #f97316)',
                                    boxShadow: '0 4px 24px rgba(239,68,68,0.25)',
                                }}
                            >
                                Начать путь
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
