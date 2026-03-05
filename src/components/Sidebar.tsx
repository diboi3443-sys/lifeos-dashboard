'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, ChevronLeft, Settings, LogOut, Flame,
    LayoutDashboard, ListChecks, BookOpen, Dumbbell,
    GraduationCap, StickyNote, Rocket, FolderKanban,
    Wallet, Utensils,
} from 'lucide-react';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard, color: '#6366f1' },
    { id: 'tracker', label: 'Трекер', icon: ListChecks, color: '#10b981' },
    { id: 'journal', label: 'Журнал', icon: BookOpen, color: '#f59e0b' },
    { id: 'physical', label: 'Физика', icon: Dumbbell, color: '#ef4444' },
    { id: 'knowledge', label: 'Знания', icon: GraduationCap, color: '#8b5cf6' },
    { id: 'notes', label: 'Заметки', icon: StickyNote, color: '#38bdf8' },
    { id: 'program', label: 'Программа', icon: Rocket, color: '#f97316' },
    { id: 'projects', label: 'Проекты', icon: FolderKanban, color: '#22c55e' },
    { id: 'finance', label: 'Финансы', icon: Wallet, color: '#a855f7' },
    { id: 'nutrition', label: 'Питание', icon: Utensils, color: '#14b8a6' },
];

const BOTTOM_NAV = NAV_ITEMS.slice(0, 5);

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

    const handleNav = (page: string) => {
        onNavigate(page);
        setMobileOpen(false);
    };

    const sidebarWidth = collapsed ? 72 : 260;

    /* ─── Reusable sidebar content ─── */
    const SidebarContent = ({ isDrawer = false }: { isDrawer?: boolean }) => (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 shrink-0">
                <AnimatePresence>
                    {(!collapsed || isDrawer) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2.5"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                                <Rocket className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <span className="font-bold text-sm tracking-wider uppercase text-foreground">LifeOS</span>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">v2.0 pro</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {isDrawer ? (
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
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

            <div className="mx-4 h-px bg-border" />

            {/* Streak */}
            <div className="px-3 mt-4 mb-3 shrink-0">
                <div
                    className="rounded-xl p-3 flex items-center gap-3 border border-border"
                    style={{
                        background: streak > 0
                            ? 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(239,68,68,0.04))'
                            : 'var(--secondary)',
                    }}
                >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(245,158,11,0.12)' }}>
                        <Flame className="w-5 h-5 text-c-amber" />
                    </div>
                    <AnimatePresence>
                        {(!collapsed || isDrawer) && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-0">
                                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Streak</div>
                                <div className="font-bold text-base leading-tight tabular-nums text-foreground">{streak} дней</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {(!collapsed || isDrawer) && (
                <div className="px-6 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">Навигация</span>
                </div>
            )}

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 pb-2">
                <div className="flex flex-col gap-0.5">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activePage === item.id;
                        const Icon = item.icon;
                        return (
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                    transition-all duration-200 group relative cursor-pointer
                                    ${isActive
                                        ? 'text-foreground font-semibold'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                    }
                                `}
                                style={isActive ? {
                                    background: `${item.color}10`,
                                    border: `1px solid ${item.color}25`,
                                } : { border: '1px solid transparent' }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId={isDrawer ? "activeTabDrawer" : "activeTab"}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                                        style={{ background: item.color }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: isActive ? `${item.color}18` : 'transparent' }}
                                >
                                    <Icon className="w-[18px] h-[18px] transition-all" style={{ color: isActive ? item.color : undefined, opacity: isActive ? 1 : 0.5 }} />
                                </div>
                                <AnimatePresence>
                                    {(!collapsed || isDrawer) && (
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
                        {(!collapsed || isDrawer) ? (
                            <>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Уровень {level}</span>
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

                {(!collapsed || isDrawer) && (
                    <div className="flex flex-col gap-0.5">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground/60 hover:text-muted-foreground hover:bg-secondary transition-colors text-sm">
                            <Settings className="w-[18px] h-[18px]" />
                            <span>Настройки</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-destructive/50 hover:text-destructive hover:bg-destructive/5 transition-colors text-sm">
                            <LogOut className="w-[18px] h-[18px]" />
                            <span>Выйти</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* ═══════════════════ MOBILE (CSS: visible below md) ═══════════════════ */}
            <div className="md:hidden">
                {/* Top bar */}
                <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xl px-4 h-14">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary active:scale-95 transition-transform"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5 text-muted-foreground" />
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                            <Rocket className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-foreground">
                            Life<span className="text-primary">OS</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-xl border border-c-amber/20 bg-c-amber/5 px-2.5 py-1.5">
                        <Flame className="w-4 h-4 text-c-amber" />
                        <span className="text-xs font-bold tabular-nums text-c-amber">{streak}</span>
                    </div>
                </header>

                {/* Drawer overlay */}
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
                                className="fixed left-0 top-0 z-[80] h-full w-[300px] border-r border-border bg-card"
                                style={{ background: 'linear-gradient(180deg, hsl(240 10% 5.5%) 0%, hsl(240 10% 4%) 100%)' }}
                            >
                                <SidebarContent isDrawer />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Bottom tab bar */}
                <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl safe-area-bottom">
                    <div className="grid grid-cols-5 h-16">
                        {BOTTOM_NAV.map((item) => {
                            const isActive = activePage === item.id;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNav(item.id)}
                                    className="relative flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="mobileActiveTab"
                                            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] rounded-full"
                                            style={{ background: item.color }}
                                        />
                                    )}
                                    <Icon
                                        className="w-6 h-6 transition-colors"
                                        style={{ color: isActive ? item.color : 'var(--muted-foreground)' }}
                                    />
                                    <span
                                        className="text-[10px] font-medium leading-tight"
                                        style={{ color: isActive ? item.color : 'var(--muted-foreground)' }}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>

            {/* ═══════════════════ DESKTOP (CSS: visible at md+) ═══════════════════ */}
            <motion.aside
                animate={{ width: sidebarWidth }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="hidden md:block fixed left-0 top-0 h-screen z-50 border-r border-border"
                style={{ background: 'linear-gradient(180deg, hsl(240 10% 5.5%) 0%, hsl(240 10% 4%) 100%)' }}
            >
                <SidebarContent />
            </motion.aside>
        </>
    );
}
