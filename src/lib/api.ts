'use client';

/**
 * API Client for 18M Backend
 * 
 * Base URL defaults to http://localhost:8000
 * Auth token stored in localStorage
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── Auth token management ───────────────────────────────────

let authToken: string | null = null;

export function setToken(token: string) {
    authToken = token;
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
}

export function getToken(): string | null {
    if (authToken) return authToken;
    if (typeof window !== 'undefined') {
        authToken = localStorage.getItem('auth_token');
    }
    return authToken;
}

export function clearToken() {
    authToken = null;
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
    }
}

// ── Core fetch wrapper ──────────────────────────────────────

async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        clearToken();
        throw new Error('Unauthorized');
    }

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API error ${res.status}: ${body}`);
    }

    return res.json();
}

// ── Auth ────────────────────────────────────────────────────

interface TokenResponse {
    access_token: string;
    token_type: string;
    user_id: number;
    is_new: boolean;
}

export async function loginTelegram(telegramId: number, username?: string): Promise<TokenResponse> {
    const data = await apiFetch<TokenResponse>('/auth/telegram', {
        method: 'POST',
        body: JSON.stringify({ telegram_id: telegramId, username }),
    });
    setToken(data.access_token);
    return data;
}

// Dev-only: quick login
export async function devLogin(telegramId: number = 123456): Promise<TokenResponse> {
    return loginTelegram(telegramId, 'dev_user');
}

// ── Stats / Summary ─────────────────────────────────────────

export interface StreakData {
    current: number;
    best: number;
}

export interface AverageScores {
    disc: number;
    phys: number;
    intel: number;
    emo: number;
    pub: number;
    overall: number;
}

export interface AvatarData {
    level: number;
    name: string;
    emoji: string;
    average: number;
    scores: AverageScores;
    streak: StreakData;
}

export interface HabitStatus {
    habit_id: string;
    name: string;
    cat: string;
    done: boolean;
}

export interface HabitsData {
    date: string;
    habits: HabitStatus[];
    done_count: number;
    total: number;
    percentage: number;
}

export interface ScoresData {
    date: string;
    disc: number;
    phys: number;
    intel: number;
    emo: number;
    pub: number;
    average: number;
}

export interface SummaryData {
    today_habits: HabitsData;
    today_scores: ScoresData | null;
    average_scores: AverageScores;
    streak: StreakData;
    avatar: AvatarData;
}

export async function getSummary(): Promise<SummaryData> {
    return apiFetch('/stats/summary');
}

export async function getAvatar(): Promise<AvatarData> {
    return apiFetch('/stats/avatar');
}

export async function getStreak(): Promise<StreakData> {
    return apiFetch('/stats/streak');
}

// ── Habits ──────────────────────────────────────────────────

export async function getHabits(date?: string): Promise<HabitsData> {
    const path = date ? `/habits/${date}` : '/habits/';
    return apiFetch(path);
}

export async function toggleHabit(habitId: string, done: boolean): Promise<{ ok: boolean }> {
    return apiFetch('/habits/toggle', {
        method: 'POST',
        body: JSON.stringify({ habit_id: habitId, done }),
    });
}

export async function saveHabitsBatch(date: string, habits: { habit_id: string; done: boolean }[]): Promise<HabitsData> {
    return apiFetch('/habits/', {
        method: 'POST',
        body: JSON.stringify({ date, habits }),
    });
}

// ── Scores ──────────────────────────────────────────────────

export async function getScores(date: string): Promise<ScoresData> {
    return apiFetch(`/scores/${date}`);
}

export async function saveScores(data: {
    date: string; disc: number; phys: number; intel: number; emo: number; pub: number;
}): Promise<ScoresData> {
    return apiFetch('/scores/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getAverageScores(): Promise<AverageScores> {
    return apiFetch('/scores/');
}

// ── Finance ─────────────────────────────────────────────────

export interface BudgetData {
    month: string;
    income: number;
    pct_savings: number;
    pct_invest: number;
    pct_free: number;
    fixed_total: number;
    free_amount: number;
    daily_limit: number;
}

export interface FixedExpense {
    id: number;
    name: string;
    category: string;
    amount: number;
    active: boolean;
}

export interface Expense {
    id: number;
    date: string;
    amount: number;
    category: string;
    description: string;
    is_fixed: boolean;
}

export interface SavingsGoal {
    id: number;
    name: string;
    target_amount: number;
    current_amount: number;
    deadline: string | null;
    progress_pct: number;
    active: boolean;
}

export interface FinanceOverview {
    month: string;
    income: number;
    fixed_total: number;
    spent_this_month: number;
    remaining: number;
    daily_limit: number;
    today_spent: number;
    today_remaining: number;
    savings_target: number;
    invest_target: number;
    goals: SavingsGoal[];
    top_categories: { category: string; amount: number }[];
}

export async function getBudget(): Promise<BudgetData> {
    return apiFetch('/finance/budget');
}

export async function setBudget(data: {
    month: string; income: number; pct_savings?: number; pct_invest?: number; pct_free?: number;
}): Promise<BudgetData> {
    return apiFetch('/finance/budget', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getFixedExpenses(): Promise<FixedExpense[]> {
    return apiFetch('/finance/fixed');
}

export async function addFixedExpense(data: { name: string; amount: number; category?: string }): Promise<FixedExpense> {
    return apiFetch('/finance/fixed', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deleteFixedExpense(id: number): Promise<void> {
    return apiFetch(`/finance/fixed/${id}`, { method: 'DELETE' });
}

export async function addExpense(data: { amount: number; category?: string; description?: string }): Promise<Expense> {
    return apiFetch('/finance/expenses', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getExpenses(date?: string): Promise<Expense[]> {
    const path = date ? `/finance/expenses/${date}` : '/finance/expenses/today';
    return apiFetch(path);
}

export async function deleteExpense(id: number): Promise<void> {
    return apiFetch(`/finance/expenses/${id}`, { method: 'DELETE' });
}

export async function getSavingsGoals(): Promise<SavingsGoal[]> {
    return apiFetch('/finance/goals');
}

export async function createSavingsGoal(data: { name: string; target_amount: number }): Promise<SavingsGoal> {
    return apiFetch('/finance/goals', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function addToGoal(goalId: number, amount: number): Promise<SavingsGoal> {
    return apiFetch(`/finance/goals/${goalId}/add?amount=${amount}`, { method: 'POST' });
}

export async function getFinanceOverview(): Promise<FinanceOverview> {
    return apiFetch('/finance/overview');
}

// ── Config ──────────────────────────────────────────────────

export interface HabitDefinition {
    id: string;
    cat: string;
    name: string;
}

export interface DirDefinition {
    id: string;
    name: string;
    emoji: string;
}

export interface ConfigData {
    habits: HabitDefinition[];
    categories: string[];
    dirs: DirDefinition[];
}

export async function getConfig(): Promise<ConfigData> {
    return apiFetch('/stats/config');
}

// ── Health check ────────────────────────────────────────────

export async function isBackendAvailable(): Promise<boolean> {
    try {
        const res = await fetch(`${API_BASE}/docs`, { method: 'HEAD' });
        return res.ok;
    } catch {
        return false;
    }
}
