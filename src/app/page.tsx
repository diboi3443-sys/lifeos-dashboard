'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import WelcomePage from '@/components/WelcomePage';
import { useApp } from '@/lib/AppContext';

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
        if (!app.isAuthenticated) {
            await app.login();
        }
    }, [app]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-10 h-10 border-2 border-border border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    // Show welcome/onboarding screen
    if (!isOnboarded) {
        return <WelcomePage onStart={handleStart} />;
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar
                activePage={activePage}
                onNavigate={setActivePage}
                streak={app.streak.current}
                level={app.level}
                xp={app.xp}
                maxXp={app.maxXp}
            />

            {/* Connection status indicator */}
            <div className="fixed top-3 right-3 z-40 md:top-4 md:right-4">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border
                    ${app.isOnline
                        ? 'bg-c-emerald/5 text-c-emerald border-c-emerald/15'
                        : 'bg-c-amber/5 text-c-amber border-c-amber/15'
                    }`}
                >
                    <div className={`w-1.5 h-1.5 rounded-full ${app.isOnline ? 'bg-c-emerald' : 'bg-c-amber'}`} />
                    <span className="hidden sm:inline">{app.isOnline ? 'API подключён' : 'Офлайн'}</span>
                </div>
            </div>

            {/* Main content - responsive padding */}
            <main className="flex-1 min-w-0 w-full h-screen flex flex-col
                pt-16 pb-20 px-4
                md:pt-0 md:pb-0 md:px-6 md:ml-[260px]
                lg:px-8
            ">
                <div className="flex-1 overflow-y-auto py-4 md:py-6">
                    <AnimatePresence mode="wait">
                        {renderPage(activePage)}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
