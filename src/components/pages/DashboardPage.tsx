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
        <div className="flex flex-col gap-4 min-h-full pb-6 w-full max-w-7xl mx-auto sm:gap-5 lg:gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 sm:text-xs">
                        Панель управления
                    </p>
                    <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                        Центр управления
                    </h1>
                    {dateStr && (
                        <p className="mt-0.5 text-xs capitalize text-muted-foreground sm:text-sm">{dateStr}</p>
                    )}
                </div>
            </div>

            {/* Bento Grid - responsive */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Hero (wide) + Missions */}
                <HeroCard level={level} xp={xp} maxXp={maxXp} />
                <MissionsCard
                    mission={todayMission}
                    completedTasks={completedMissionTasks}
                    onToggleTask={toggleMissionTask}
                />

                {/* Core Goals (full width) */}
                <CoreGoalsCard />

                {/* Stats (wide) + Finance */}
                <StatsCard stats={userStats} />
                <FinanceCard />

                {/* Streak (wide) + Habits */}
                <StreakCard streak={streak.current} />
                <HabitsCard />

                {/* Knowledge (full) + Nutrition */}
                <KnowledgeCard />
                <NutritionCard />
            </div>
        </div>
    );
}
