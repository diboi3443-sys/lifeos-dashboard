'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import GlassCard, { StatCard, ProgressCard } from '@/components/GlassCard';
import WelcomePage from '@/components/WelcomePage';
import { useApp } from '@/lib/AppContext';
import { useLocalStorage } from '@/lib/storage';
import { PROGRAM_30_DAYS } from '@/data/30_day_data';

// Lazy-load 3D avatar (heavy)
const Avatar3D = dynamic(() => import('@/components/Avatar3D'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-[350px]">
            <div className="w-12 h-12 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
        </div>
    ),
});

// Lazy-load pages
const TrackerPage = dynamic(() => import('@/components/pages/TrackerPage'), { ssr: false });
const JournalPage = dynamic(() => import('@/components/pages/JournalPage'), { ssr: false });
const PhysicalPage = dynamic(() => import('@/components/pages/PhysicalPage'), { ssr: false });
const KnowledgePage = dynamic(() => import('@/components/pages/KnowledgePage'), { ssr: false });
const NotesPage = dynamic(() => import('@/components/pages/NotesPage'), { ssr: false });
const ProgramPage = dynamic(() => import('@/components/pages/ProgramPage'), { ssr: false });
const ProjectsPage = dynamic(() => import('@/components/pages/ProjectsPage'), { ssr: false });
const FinancePage = dynamic(() => import('@/components/pages/FinancePage'), { ssr: false });
const NutritionPage = dynamic(() => import('@/components/pages/NutritionPage'), { ssr: false });
import DashboardPage from '@/components/pages/DashboardPage';

const DIRECTIONS = [
    { key: 'disc', label: 'Дисциплина', imgSrc: '/icons/discipline_characteristic_icon.jpg', color: '#ef4444' },
    { key: 'phys', label: 'Физика', imgSrc: '/icons/physics_statistic_icon.jpg', color: '#22c55e' },
    { key: 'intel', label: 'Интеллект', imgSrc: '/icons/intellect_characteristic_icon.jpg', color: '#3b82f6' },
    { key: 'emo', label: 'Устойчивость', imgSrc: '/icons/resilience_statistic_icon.jpg', color: '#0ea5e9' },
    { key: 'pub', label: 'Харизма', imgSrc: '/icons/charisma_statistic_icon.jpg', color: '#8b5cf6' },
];

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.08 } },
    exit: { opacity: 0, y: -20 },
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

function renderPage(page: string) {
    switch (page) {
        case 'dashboard': return <DashboardPage key="dashboard" />;
        case 'tracker': return <TrackerPage key="tracker" />;
        case 'journal': return <JournalPage key="journal" />;
        case 'physical': return <PhysicalPage key="physical" />;
        case 'knowledge': return <KnowledgePage key="knowledge" />;
        case 'notes': return <NotesPage key="notes" />;
        case 'program': return <ProgramPage key="program" />;
        case 'projects': return <ProjectsPage key="projects" />;
        case 'finance': return <FinancePage key="finance" />;
        case 'nutrition': return <NutritionPage key="nutrition" />;
        default: return <DashboardPage key="dashboard" />;
    }
}

export default function Home() {
    const [activePage, setActivePage] = useState('dashboard');
    const app = useApp();
    const [userName, setUserName] = useState<string | null>(null);
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('user_name');
        if (saved) {
            setUserName(saved);
            setIsOnboarded(true);
        }
        setLoading(false);
    }, []);

    const handleStart = useCallback(async (name: string) => {
        localStorage.setItem('user_name', name);
        setUserName(name);
        setIsOnboarded(true);
        // Try to login with backend
        if (!app.isAuthenticated) {
            await app.login();
        }
    }, [app]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
                <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    // Show welcome/onboarding screen
    if (!isOnboarded) {
        return <WelcomePage onStart={handleStart} />;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar
                activePage={activePage}
                onNavigate={setActivePage}
                streak={app.streak.current}
                level={app.level}
                xp={app.xp}
                maxXp={app.maxXp}
            />

            {/* Connection status */}
            <div className="fixed top-4 right-4 z-50">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium
                    ${app.isOnline ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                    {app.isOnline
                        ? <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        : <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                    }
                    {app.isOnline ? 'API подключён' : 'Офлайн режим'}
                </div>
            </div>

            {/* Main content */}
            <main
                className="flex-1 min-w-0 ml-[260px] h-screen flex flex-col"
                style={{ padding: '24px 32px' }}
            >
                <AnimatePresence mode="wait">
                    {renderPage(activePage)}
                </AnimatePresence>
            </main>
        </div>
    );
}
