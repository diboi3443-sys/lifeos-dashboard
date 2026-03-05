'use client';

import { useApp } from '@/lib/AppContext';
import { HeroCard } from '@/components/dashboard/hero-card';
import { MissionsCard } from '@/components/dashboard/missions-card';
import { FinanceCard } from '@/components/dashboard/finance-card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { StreakCard } from '@/components/dashboard/streak-card';
import { HabitsCard } from '@/components/dashboard/habits-card';
import { KnowledgeCard } from '@/components/dashboard/knowledge-card';
import { NutritionCard } from '@/components/dashboard/nutrition-card';
import { CoreGoalsCard } from '@/components/dashboard/core-goals-card';
import { PROGRAM_30_DAYS } from '@/data/30_day_data';
import { useLocalStorage } from '@/lib/storage';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
    const { level, xp, maxXp, streak } = useApp();
    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        const d = new Date();
        setDateStr(d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }));
    }, []);

    const dayNumber = 1;
    const todayMission = PROGRAM_30_DAYS.find(d => d.day === (dayNumber <= 30 ? dayNumber : 30)) || PROGRAM_30_DAYS[0];

    const [completedMissionTasks, setCompletedMissionTasks] = useLocalStorage<number[]>(`mission_completed_day_${todayMission.day}`, []);

    const toggleMissionTask = (idx: number) => {
        setCompletedMissionTasks(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const userStats = { disc: 8, phys: 6, intel: 7, emo: 9, pub: 5 };

    return (
        <div className="flex flex-col gap-5 min-h-full pb-4 w-full max-w-7xl mx-auto md:gap-6">
            {/* Header */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
                    Панель управления
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Центр управления
                </h1>
                {dateStr && (
                    <p className="mt-0.5 text-sm capitalize text-muted-foreground">{dateStr}</p>
                )}
            </div>

            {/* Mobile: simple stack. Desktop: bento grid */}
            <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:gap-5">
                <div className="md:col-span-3">
                    <HeroCard level={level} xp={xp} maxXp={maxXp} />
                </div>
                <div className="md:col-span-1 md:row-span-2">
                    <MissionsCard
                        mission={todayMission}
                        completedTasks={completedMissionTasks}
                        onToggleTask={toggleMissionTask}
                    />
                </div>
                <div className="md:col-span-4">
                    <CoreGoalsCard />
                </div>
                <div className="md:col-span-3">
                    <StatsCard stats={userStats} />
                </div>
                <div className="md:col-span-1">
                    <FinanceCard />
                </div>
                <div className="md:col-span-3">
                    <StreakCard streak={streak.current} />
                </div>
                <div className="md:col-span-1">
                    <HabitsCard />
                </div>
                <div className="md:col-span-3">
                    <KnowledgeCard />
                </div>
                <div className="md:col-span-1">
                    <NutritionCard />
                </div>
            </div>
        </div>
    );
}
