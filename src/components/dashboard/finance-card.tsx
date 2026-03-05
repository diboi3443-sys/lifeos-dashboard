"use client"

import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react"

const cats = [
  { name: "Еда", amount: "2 100", color: "#f59e0b", pct: 47 },
  { name: "Транспорт", amount: "800", color: "#6366f1", pct: 18 },
  { name: "Подписки", amount: "650", color: "#8b5cf6", pct: 14 },
  { name: "Развлечения", amount: "950", color: "#10b981", pct: 21 },
]
import { useLocalStorage } from "@/lib/storage";

interface Budget { income: number; pctSave: number; pctInvest: number; pctFree: number; month: string; }
interface FixedExpense { id: string; name: string; amount: number; }
interface Expense { id: string; desc: string; amount: number; category: string; date: string; }

const CATEGORIES = [
  { id: 'food', label: "Еда", color: "#f59e0b" },
  { id: 'transport', label: "Транспорт", color: "#3b82f6" },
  { id: 'entertainment', label: "Развлечения", color: "#8b5cf6" },
  { id: 'health', label: "Здоровье", color: "#22c55e" },
  { id: 'education', label: "Обучение", color: "#eab308" },
  { id: 'clothes', label: "Одежда", color: "#ec4899" },
  { id: 'subscriptions', label: "Подписки", color: "#06b6d4" },
  { id: 'other', label: "Другое", color: "#6b7280" },
];

const fmt = (n: number) => n.toLocaleString('ru-RU');

export function FinanceCard() {
  const [budget] = useLocalStorage<Budget>('fin_budget', { income: 0, pctSave: 30, pctInvest: 20, pctFree: 50, month: '' });
  const [fixed] = useLocalStorage<FixedExpense[]>('fin_fixed', []);
  const [expenses] = useLocalStorage<Expense[]>('fin_expenses', []);

  const fixedTotal = fixed.reduce((s, f) => s + f.amount, 0);
  const freeAmount = budget.income * (budget.pctFree / 100);
  const saveAmount = budget.income * (budget.pctSave / 100);
  const dailyLimit = budget.income > 0 ? Math.round((freeAmount - fixedTotal) / 30) : 0;

  const todaySpent = expenses
    .filter(e => e.date === new Date().toISOString().split('T')[0])
    .reduce((s, e) => s + e.amount, 0);

  const monthSpent = expenses.reduce((s, e) => s + e.amount, 0) + fixedTotal;

  const progress = dailyLimit > 0 ? Math.min((todaySpent / dailyLimit) * 100, 100) : 0;

  // top 4 categories
  const catStats: Record<string, number> = {};
  expenses.forEach(e => { catStats[e.category] = (catStats[e.category] || 0) + e.amount; });
  const sortedCats = Object.entries(catStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, amount]) => {
      const cat = CATEGORIES.find(c => c.id === id) || CATEGORIES[7];
      return { ...cat, amount, pct: expenses.length > 0 ? Math.round((amount / (monthSpent - fixedTotal)) * 100) : 0 };
    });

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 lg:col-span-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-violet/10">
            <Wallet className="h-4 w-4 text-c-violet" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Финансы</h3>
            <p className="text-xs text-muted-foreground">{new Date().toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Daily Total */}
      <div className="mb-4 rounded-xl border border-border bg-secondary p-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tabular-nums" style={{ color: todaySpent > dailyLimit ? '#ef4444' : 'inherit' }}>
            {fmt(todaySpent)}
          </span>
          <span className="text-lg text-muted-foreground">{"\u20BD"}</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">из {fmt(dailyLimit)} {"\u20BD"}/день</span>
            <span className="font-semibold" style={{ color: todaySpent > dailyLimit ? '#ef4444' : '#22c55e' }}>
              {dailyLimit > 0 ? Math.round(100 - (todaySpent / dailyLimit) * 100) : 0}% свободно
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-background">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: todaySpent > dailyLimit ? '#ef4444' : 'linear-gradient(to right, #8b5cf6, #3b82f6)' }} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4 space-y-2.5 flex-1 max-h-[120px] overflow-hidden">
        {sortedCats.length > 0 ? sortedCats.map((c) => (
          <div key={c.label} className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="flex-1 text-xs text-muted-foreground truncate">{c.label}</span>
            <span className="text-xs font-medium tabular-nums">{fmt(c.amount)} {"\u20BD"}</span>
            <span className="w-7 text-right text-[11px] tabular-nums text-muted-foreground/50">{c.pct}%</span>
          </div>
        )) : (
          <div className="text-xs text-muted-foreground text-center py-4">Нет трат за месяц</div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary p-2.5">
          <ArrowUpRight className="h-3.5 w-3.5 text-c-emerald" />
          <span className="text-xs font-bold">{fmt(Math.round(budget.income / 1000))}к</span>
          <span className="text-[10px] text-muted-foreground">Доход</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary p-2.5">
          <ArrowDownRight className="h-3.5 w-3.5 text-c-rose" />
          <span className="text-xs font-bold">{fmt(Math.round(monthSpent / 1000))}к</span>
          <span className="text-[10px] text-muted-foreground">Расход</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary p-2.5">
          <PiggyBank className="h-3.5 w-3.5 text-c-sky" />
          <span className="text-xs font-bold">{fmt(Math.round(saveAmount / 1000))}к</span>
          <span className="text-[10px] text-muted-foreground">Копилка</span>
        </div>
      </div>
    </div>
  )
}
