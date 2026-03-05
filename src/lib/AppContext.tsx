'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '@/lib/api';

interface AppState {
    /* Auth */
    isAuthenticated: boolean;
    isOnline: boolean; // backend available?
    userId: number | null;

    /* Summary data from API (or fallbacks) */
    streak: { current: number; best: number };
    level: number;
    levelName: string;
    xp: number;
    maxXp: number;
    scores: { disc: number; phys: number; intel: number; emo: number; pub: number; overall: number };
    todayHabits: { done: number; total: number; pct: number };

    /* Actions */
    login: (telegramId?: number) => Promise<void>;
    refreshSummary: () => Promise<void>;
}

const DEFAULT_STATE: AppState = {
    isAuthenticated: false,
    isOnline: false,
    userId: null,
    streak: { current: 0, best: 0 },
    level: 0,
    levelName: 'Новичок',
    xp: 0,
    maxXp: 100,
    scores: { disc: 0, phys: 0, intel: 0, emo: 0, pub: 0, overall: 0 },
    todayHabits: { done: 0, total: 19, pct: 0 },
    login: async () => { },
    refreshSummary: async () => { },
};

const AppContext = createContext<AppState>(DEFAULT_STATE);

export function useApp() {
    return useContext(AppContext);
}

// XP calculation from level
function levelToXp(level: number): { xp: number; maxXp: number } {
    // Each level needs more XP
    const maxXp = 100 + level * 20;
    // XP is fraction of average score * days
    return { xp: 0, maxXp };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [streak, setStreak] = useState({ current: 0, best: 0 });
    const [level, setLevel] = useState(0);
    const [levelName, setLevelName] = useState('Новичок');
    const [xp, setXp] = useState(0);
    const [maxXp, setMaxXp] = useState(100);
    const [scores, setScores] = useState({ disc: 0, phys: 0, intel: 0, emo: 0, pub: 0, overall: 0 });
    const [todayHabits, setTodayHabits] = useState({ done: 0, total: 19, pct: 0 });

    const refreshSummary = useCallback(async () => {
        try {
            const summary = await api.getSummary();

            setStreak(summary.streak);
            setScores(summary.average_scores);
            setTodayHabits({
                done: summary.today_habits.done_count,
                total: summary.today_habits.total,
                pct: summary.today_habits.percentage,
            });

            const avatar = summary.avatar;
            setLevel(avatar.level);
            setLevelName(avatar.name);

            // Calculate XP from average as a percentage within the level
            const { maxXp: mxp } = levelToXp(avatar.level);
            const xpFromAvg = Math.round((avatar.average / 10) * mxp);
            setXp(xpFromAvg);
            setMaxXp(mxp);
        } catch (e) {
            console.warn('Failed to refresh summary:', e);
        }
    }, []);

    const login = useCallback(async (telegramId: number = 123456) => {
        try {
            const tokenResp = await api.devLogin(telegramId);
            setUserId(tokenResp.user_id);
            setIsAuthenticated(true);
            await refreshSummary();
        } catch (e) {
            console.warn('Login failed:', e);
        }
    }, [refreshSummary]);

    // On mount: check backend, try to restore session
    useEffect(() => {
        (async () => {
            const online = await api.isBackendAvailable();
            setIsOnline(online);

            if (online) {
                const token = api.getToken();
                if (token) {
                    setIsAuthenticated(true);
                    try {
                        await refreshSummary();
                    } catch {
                        // Token expired — auto-login with dev user
                        await login();
                    }
                } else {
                    // Auto-login for dev mode
                    await login();
                }
            }
        })();
    }, [login, refreshSummary]);

    return (
        <AppContext.Provider value={{
            isAuthenticated, isOnline, userId,
            streak, level, levelName, xp, maxXp,
            scores, todayHabits,
            login, refreshSummary,
        }}>
            {children}
        </AppContext.Provider>
    );
}
