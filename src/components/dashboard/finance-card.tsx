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
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 lg:col-span-1">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-c-violet/10 sm:h-11 sm:w-11">
            <Wallet className="h-5 w-5 text-c-violet sm:h-6 sm:w-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Финансы</h3>
            <p className="text-[11px] text-muted-foreground">{new Date().toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Daily spending */}
      <div className="mb-3 rounded-xl border border-border bg-secondary p-3 sm:mb-4 sm:p-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tabular-nums sm:text-3xl" style={{ color: todaySpent > dailyLimit && dailyLimit > 0 ? '#ef4444' : 'inherit' }}>
            {fmt(todaySpent)}
          </span>
          <span className="text-base text-muted-foreground sm:text-lg">{"\u20BD"}</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-[11px] sm:text-xs">
            <span className="text-muted-foreground">из {fmt(dailyLimit)} {"\u20BD"}/день</span>
            <span className="font-semibold" style={{ color: todaySpent > dailyLimit && dailyLimit > 0 ? '#ef4444' : '#22c55e' }}>
              {dailyLimit > 0 ? Math.round(100 - (todaySpent / dailyLimit) * 100) : 0}% свободно
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-background sm:h-2">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: todaySpent > dailyLimit && dailyLimit > 0 ? '#ef4444' : 'linear-gradient(to right, #8b5cf6, #3b82f6)' }} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-3 flex-1 max-h-[100px] overflow-hidden sm:mb-4 sm:max-h-[120px]">
        {sortedCats.length > 0 ? (
          <div className="flex flex-col gap-2 sm:gap-2.5">
            {sortedCats.map((c) => (
              <div key={c.label} className="flex items-center gap-2.5 sm:gap-3">
                <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="flex-1 text-[11px] text-muted-foreground truncate sm:text-xs">{c.label}</span>
                <span className="text-[11px] font-medium tabular-nums text-foreground sm:text-xs">{fmt(c.amount)} {"\u20BD"}</span>
                <span className="w-7 text-right text-[10px] tabular-nums text-muted-foreground/50 sm:text-[11px]">{c.pct}%</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-muted-foreground text-center py-4 sm:text-xs">Нет трат за месяц</div>
        )}
      </div>

      {/* Bottom stats */}
      <div className="mt-auto grid grid-cols-3 gap-1.5 sm:gap-2">
        <div className="flex flex-col items-center gap-0.5 rounded-lg border border-border bg-secondary p-2 sm:gap-1 sm:p-2.5">
          <ArrowUpRight className="h-4 w-4 text-c-emerald sm:h-5 sm:w-5" />
          <span className="text-[11px] font-bold tabular-nums text-foreground sm:text-xs">{fmt(Math.round(budget.income / 1000))}к</span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px]">Доход</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 rounded-lg border border-border bg-secondary p-2 sm:gap-1 sm:p-2.5">
          <ArrowDownRight className="h-4 w-4 text-c-rose sm:h-5 sm:w-5" />
          <span className="text-[11px] font-bold tabular-nums text-foreground sm:text-xs">{fmt(Math.round(monthSpent / 1000))}к</span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px]">Расход</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 rounded-lg border border-border bg-secondary p-2 sm:gap-1 sm:p-2.5">
          <PiggyBank className="h-4 w-4 text-c-sky sm:h-5 sm:w-5" />
          <span className="text-[11px] font-bold tabular-nums text-foreground sm:text-xs">{fmt(Math.round(saveAmount / 1000))}к</span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px]">Копилка</span>
        </div>
      </div>
    </div>
  )
}
