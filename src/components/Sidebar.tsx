'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, Settings, LogOut } from 'lucide-react';

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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Close mobile menu on navigation
    const handleNav = (page: string) => {
        onNavigate(page);
        if (isMobile) setMobileOpen(false);
    };

    const sidebarWidth = collapsed ? 72 : 260;

    const SidebarContent = ({ isMobileDrawer = false }: { isMobileDrawer?: boolean }) => (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center justify-between px-5 h-16 shrink-0">
                <AnimatePresence>
                    {(!collapsed || isMobileDrawer) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2.5"
                        >
                            <img src="/logo.png" alt="LifeOS Logo" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                                <span className="font-bold text-sm tracking-wider uppercase text-foreground">LifeOS</span>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">v2.0 pro</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {isMobileDrawer ? (
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
                            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                    </button>
                )}
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-border" />

            {/* Streak badge */}
            <div className="px-3 mt-4 mb-3 shrink-0">
                <div
                    className="rounded-xl p-3 flex items-center gap-3 border border-border"
                    style={{
                        background: streak > 0
                            ? 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(239,68,68,0.04))'
                            : 'var(--secondary)',
                    }}
                >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(245,158,11,0.1)' }}>
                        {streak > 0
                            ? <img src="/icons/3d_streak_icon.jpg" alt="Streak" className="w-5 h-5 object-cover rounded shadow" />
                            : <div className="w-5 h-5 rounded bg-border" />}
                    </div>
                    <AnimatePresence>
                        {(!collapsed || isMobileDrawer) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="min-w-0"
                            >
                                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Streak</div>
                                <div className="font-bold text-base leading-tight tabular-nums text-foreground">{streak} дней</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation label */}
            {(!collapsed || isMobileDrawer) && (
                <div className="px-6 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
                        Навигация
                    </span>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 pb-2">
                <div className="flex flex-col gap-0.5">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activePage === item.id;
                        return (
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                    transition-all duration-200 group relative cursor-pointer
                                    ${isActive
                                        ? 'text-primary font-semibold'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                    }
                                `}
                                style={isActive ? {
                                    background: 'rgba(99,102,241,0.08)',
                                    border: '1px solid rgba(99,102,241,0.15)',
                                } : { border: '1px solid transparent' }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <div className={`w-5 h-5 rounded-md overflow-hidden shrink-0 border ${isActive ? 'border-primary/30' : 'border-border'}`}>
                                    <img
                                        src={item.imgSrc}
                                        alt={item.label}
                                        className={`w-full h-full object-cover transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-50 grayscale'}`}
                                    />
                                </div>
                                <AnimatePresence>
                                    {(!collapsed || isMobileDrawer) && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="text-sm whitespace-nowrap overflow-hidden"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>
            </nav>

            {/* Level & XP */}
            <div className="px-3 pb-3 shrink-0">
                <div className="h-px bg-border mb-3 mx-2" />

                <div className="rounded-xl p-3 bg-secondary border border-border mb-2">
                    <div className="flex items-center justify-between mb-2">
                        {(!collapsed || isMobileDrawer) ? (
                            <>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                                    Уровень {level}
                                </span>
                                <span className="text-[10px] tabular-nums text-muted-foreground/40">{xp}/{maxXp} XP</span>
                            </>
                        ) : (
                            <span className="text-xs font-bold text-center w-full text-foreground">{level}</span>
                        )}
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-background">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-c-violet"
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp / maxXp) * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Settings & Logout */}
                {(!collapsed || isMobileDrawer) && (
                    <div className="flex flex-col gap-0.5">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground/60 hover:text-muted-foreground hover:bg-secondary transition-colors text-sm">
                            <Settings className="w-4 h-4" />
                            <span>Настройки</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-destructive/50 hover:text-destructive hover:bg-destructive/5 transition-colors text-sm">
                            <LogOut className="w-4 h-4" />
                            <span>Выйти</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* MOBILE: Top bar + bottom nav */}
            {isMobile && (
                <>
                    {/* Mobile top bar */}
                    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-lg px-4 py-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary"
                            aria-label="Open menu"
                        >
                            <Menu className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="LifeOS" className="w-6 h-6 rounded-md object-cover" />
                            <span className="text-sm font-bold tracking-tight text-foreground">
                                Life<span className="text-primary">OS</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg border border-c-amber/20 bg-c-amber/5 px-2.5 py-1.5">
                            <img src="/icons/3d_streak_icon.jpg" alt="" className="w-3.5 h-3.5 object-cover rounded" />
                            <span className="text-[11px] font-bold tabular-nums text-c-amber">{streak}</span>
                        </div>
                    </header>

                    {/* Mobile drawer overlay */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
                                    onClick={() => setMobileOpen(false)}
                                />
                                <motion.aside
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                    className="fixed left-0 top-0 z-[80] h-full w-[280px] border-r border-border bg-card"
                                    style={{
                                        background: 'linear-gradient(180deg, hsl(240 10% 5.5%) 0%, hsl(240 10% 4%) 100%)',
                                    }}
                                >
                                    <SidebarContent isMobileDrawer />
                                </motion.aside>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Mobile bottom navigation (quick access) */}
                    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
                        <div className="flex items-center justify-around px-2 py-2">
                            {NAV_ITEMS.slice(0, 5).map((item) => {
                                const isActive = activePage === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNav(item.id)}
                                        className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                                            isActive
                                                ? 'text-primary'
                                                : 'text-muted-foreground/50'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-md overflow-hidden ${isActive ? 'ring-1 ring-primary/30' : ''}`}>
                                            <img
                                                src={item.imgSrc}
                                                alt={item.label}
                                                className={`w-full h-full object-cover ${isActive ? '' : 'opacity-40 grayscale'}`}
                                            />
                                        </div>
                                        <span className={`text-[9px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground/40'}`}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="mobileActiveTab"
                                                className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </>
            )}

            {/* DESKTOP: Fixed sidebar */}
            {!isMobile && (
                <motion.aside
                    animate={{ width: sidebarWidth }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed left-0 top-0 h-screen z-50 border-r border-border"
                    style={{
                        background: 'linear-gradient(180deg, hsl(240 10% 5.5%) 0%, hsl(240 10% 4%) 100%)',
                    }}
                >
                    <SidebarContent />
                </motion.aside>
            )}
        </>
    );
}
