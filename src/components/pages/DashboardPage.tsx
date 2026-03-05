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

export default function DashboardPage() {
    const {
        level, xp, maxXp, streak,
    } = useApp();

    const dayNumber = 1; // Temporary: need to pull from user profile / journey state
    const todayMission = PROGRAM_30_DAYS.find(d => d.day === (dayNumber <= 30 ? dayNumber : 30)) || PROGRAM_30_DAYS[0];

    const [completedMissionTasks, setCompletedMissionTasks] = useLocalStorage<number[]>(`mission_completed_day_${todayMission.day}`, []);

    const toggleMissionTask = (idx: number) => {
        setCompletedMissionTasks(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    // Dummy data for now until we wire these fully
    const financeSpentToday = 45;
    const userStats = { disc: 8, phys: 6, intel: 7, emo: 9, pub: 5 };

    return (
        <div className="flex flex-col gap-6 lg:gap-8 min-h-full pb-12 w-full max-w-7xl mx-auto">
            {/* Header / Top */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">
                        Центр управления
                    </h1>
                    <p className="text-sm font-medium text-white/50 tracking-wide">
                        СВОДКА ЗА СЕГОДНЯ
                    </p>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Row 1: Hero wide + Missions */}
                <HeroCard level={level} xp={xp} maxXp={maxXp} />
                <MissionsCard
                    mission={todayMission}
                    completedTasks={completedMissionTasks}
                    onToggleTask={toggleMissionTask}
                />

                {/* Row 2: Core Goals (full width) */}
                <CoreGoalsCard />

                {/* Row 2: Stats wide + Finance */}
                <StatsCard stats={userStats} />
                <FinanceCard />

                {/* Row 3: Streak wide + Habits */}
                <StreakCard streak={streak.current} />
                <HabitsCard />

                {/* Row 4: Knowledge wide + Nutrition */}
                <KnowledgeCard />
                <NutritionCard />
            </div>
        </div>
    );
}
