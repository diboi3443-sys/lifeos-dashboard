'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Дашборд', imgSrc: '/icons/dashboard_sidebar_icon.jpg' },
    { id: 'tracker', label: 'Трекер', imgSrc: '/icons/tracker_sidebar_icon.jpg' },
    { id: 'journal', label: 'Журнал', imgSrc: '/icons/journal_sidebar_icon.jpg' },
    { id: 'physical', label: 'Физика', imgSrc: '/icons/physical_sidebar_icon.jpg' },
    { id: 'knowledge', label: 'База знаний', imgSrc: '/icons/knowledge_sidebar_icon.jpg' },
    { id: 'notes', label: 'Заметки', imgSrc: '/icons/notes_sidebar_icon.jpg' },
    { id: 'program', label: 'Программа', imgSrc: '/icons/program_sidebar_icon.jpg' },
    { id: 'projects', label: 'Проекты', imgSrc: '/icons/projects_sidebar_icon.jpg' },
    { id: 'finance', label: 'Финансы', imgSrc: '/icons/finance_sidebar_icon.jpg' },
    { id: 'nutrition', label: 'Питание', imgSrc: '/icons/physical_sidebar_icon.jpg' },
];

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
    streak: number;
    level: number;
    xp: number;
    maxXp: number;
}

export default function Sidebar({ activePage, onNavigate, streak, level, xp, maxXp }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    // Animation variants for staggering children
    const navContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    };

    const navItemVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 },
    };

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 h-screen z-50 flex flex-col"
            style={{
                background: 'linear-gradient(180deg, rgba(18,18,26,0.98) 0%, rgba(10,10,15,0.98) 100%)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
            }}
        >
            {/* Logo */}
            <div className="flex items-center justify-between px-5 h-16">
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <img src="/logo.png" alt="LifeOS Logo" className="w-8 h-8 rounded-lg object-cover" />
                            <span className="font-bold text-sm tracking-wider uppercase">LifeOS</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
                        <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </motion.div>
                </button>
            </div>

            {/* Streak badge */}
            <div className="px-3 mb-4">
                <div
                    className="rounded-xl p-3 flex items-center gap-3"
                    style={{
                        background: streak > 0
                            ? 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(239,68,68,0.1))'
                            : 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                        {streak > 0
                            ? <img src="/icons/3d_streak_icon.jpg" alt="Streak" className="w-5 h-5 object-cover rounded shadow" />
                            : <div className="w-5 h-5 rounded bg-white/10" />}
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="text-xs text-white/50">STREAK</div>
                                <div className="font-black text-lg leading-none">{streak} дней</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation */}
            <motion.nav
                className="flex-1 px-3 space-y-1"
                variants={navContainerVariants}
                initial="hidden"
                animate="show"
            >
                {NAV_ITEMS.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <motion.button
                            variants={navItemVariants}
                            whileHover={{ scale: 1.02, x: collapsed ? 0 : 4 }}
                            whileTap={{ scale: 0.98 }}
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-colors duration-200 group relative
                ${isActive
                                    ? 'text-white'
                                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                                }
              `}
                            style={isActive ? {
                                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))',
                                border: '1px solid rgba(59,130,246,0.2)',
                                boxShadow: '0 0 20px rgba(59,130,246,0.1)'
                            } : { border: '1px solid transparent' }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                    style={{ background: 'var(--gradient-primary)' }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {item.imgSrc ? (
                                <div className={`w-5 h-5 rounded-md overflow-hidden flex-shrink-0 border border-white/10 shadow-[0_0_10px_rgba(0,150,255,0.2)] ${isActive ? 'ring-1 ring-blue-500/50' : ''}`}>
                                    <img src={item.imgSrc} alt={item.label} className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50 grayscale'}`} />
                                </div>
                            ) : (
                                <span className={`text-lg ${isActive ? 'text-blue-400' : ''}`}>⭐</span>
                            )}
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </motion.nav>

            {/* Level & XP */}
            <div className="px-3 pb-4">
                <div
                    className="rounded-xl p-3"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <AnimatePresence>
                            {!collapsed ? (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-white/50"
                                >
                                    УРОВЕНЬ {level}
                                </motion.span>
                            ) : (
                                <span className="text-xs font-bold text-center w-full">{level}</span>
                            )}
                        </AnimatePresence>
                        {!collapsed && (
                            <span className="text-xs text-white/30">{xp}/{maxXp} XP</span>
                        )}
                    </div>
                    <div className="progress-bar">
                        <motion.div
                            className="progress-bar-fill"
                            style={{ background: 'var(--gradient-primary)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp / maxXp) * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Settings */}
                {!collapsed && (
                    <div className="flex flex-col gap-1 w-full mt-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/50 hover:bg-white/[0.03] transition-colors group">
                            <img src="/icons/new_settings_gear.jpg" alt="Settings" className="w-5 h-5 rounded object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm">Настройки</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500/50 hover:text-red-400 hover:bg-red-500/10 transition-colors group">
                            <img src="/icons/logout_icon.jpg" alt="Logout" className="w-5 h-5 rounded-sm object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm">Выйти</span>
                        </button>
                    </div>
                )}
            </div>
        </motion.aside>
    );
}
