"use client"

import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react"
import { useLocalStorage } from "@/lib/storage"

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
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-c-violet/10">
            <Wallet className="h-5 w-5 text-c-violet" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Финансы</h3>
            <p className="text-xs text-muted-foreground">{new Date().toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Daily spending */}
      <div className="mb-4 rounded-xl border border-border bg-secondary p-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tabular-nums" style={{ color: todaySpent > dailyLimit && dailyLimit > 0 ? '#ef4444' : 'inherit' }}>
            {fmt(todaySpent)}
          </span>
          <span className="text-lg text-muted-foreground">{"\u20BD"}</span>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">из {fmt(dailyLimit)} {"\u20BD"}/день</span>
            <span className="font-semibold" style={{ color: todaySpent > dailyLimit && dailyLimit > 0 ? '#ef4444' : '#22c55e' }}>
              {dailyLimit > 0 ? Math.round(100 - (todaySpent / dailyLimit) * 100) : 0}% свободно
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-background">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: todaySpent > dailyLimit && dailyLimit > 0 ? '#ef4444' : 'linear-gradient(to right, #8b5cf6, #3b82f6)' }} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4 flex-1">
        {sortedCats.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {sortedCats.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="flex-1 text-sm text-muted-foreground truncate">{c.label}</span>
                <span className="text-sm font-medium tabular-nums text-foreground">{fmt(c.amount)} {"\u20BD"}</span>
                <span className="w-8 text-right text-xs tabular-nums text-muted-foreground/50">{c.pct}%</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-6">Нет трат за месяц</div>
        )}
      </div>

      {/* Bottom stats */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-secondary p-3">
          <ArrowUpRight className="h-5 w-5 text-c-emerald" />
          <span className="text-sm font-bold tabular-nums text-foreground">{fmt(Math.round(budget.income / 1000))}к</span>
          <span className="text-[10px] text-muted-foreground">Доход</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-secondary p-3">
          <ArrowDownRight className="h-5 w-5 text-c-rose" />
          <span className="text-sm font-bold tabular-nums text-foreground">{fmt(Math.round(monthSpent / 1000))}к</span>
          <span className="text-[10px] text-muted-foreground">Расход</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-secondary p-3">
          <PiggyBank className="h-5 w-5 text-c-sky" />
          <span className="text-sm font-bold tabular-nums text-foreground">{fmt(Math.round(saveAmount / 1000))}к</span>
          <span className="text-[10px] text-muted-foreground">Копилка</span>
        </div>
      </div>
    </div>
  )
}
