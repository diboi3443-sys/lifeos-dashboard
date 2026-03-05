"use client"

import { Shield, Dumbbell, Brain, Heart, Sparkles, Swords, TrendingUp } from "lucide-react"

interface UserStats {
  disc: number;
  phys: number;
  intel: number;
  emo: number;
  pub: number;
}

export function StatsCard({ stats }: { stats: UserStats }) {
  const statArray = [
    { name: "Дисциплина", shortName: "DISC", value: stats.disc, icon: Shield, color: "#6366f1", delta: "+1" },
    { name: "Физика", shortName: "PHYS", value: stats.phys, icon: Dumbbell, color: "#10b981", delta: "+2" },
    { name: "Интеллект", shortName: "INT", value: stats.intel, icon: Brain, color: "#8b5cf6", delta: "+1" },
    { name: "Стойкость", shortName: "RES", value: stats.emo, icon: Heart, color: "#f43f5e", delta: "+1" },
    { name: "Харизма", shortName: "CHA", value: stats.pub, icon: Sparkles, color: "#f59e0b", delta: "+3" },
  ]

  const avg = Math.round(statArray.reduce((s, x) => s + x.value, 0) / statArray.length)

  return (
    <div className="col-span-1 rounded-2xl border border-border bg-card p-4 sm:p-5 sm:col-span-2 lg:col-span-3">
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-c-violet/10 sm:h-11 sm:w-11">
            <Swords className="h-5 w-5 text-c-violet sm:h-6 sm:w-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Характеристики</h3>
            <p className="text-[11px] text-muted-foreground">Навыки персонажа</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-c-violet/20 bg-c-violet/5 px-2.5 py-1 sm:px-3 sm:py-1.5">
          <Swords className="h-3 w-3 text-c-violet" />
          <span className="text-[11px] font-bold text-c-violet sm:text-xs">Ранг B+</span>
        </div>
      </div>

      {/* Stats - responsive grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5 sm:gap-3">
        {statArray.map((s) => (
          <div key={s.name} className="rounded-xl border border-border bg-secondary p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: s.color }} />
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-medium text-c-emerald sm:text-[11px]">
                <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{s.delta}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground sm:text-xs">
              <span className="hidden sm:inline">{s.name}</span>
              <span className="sm:hidden">{s.shortName}</span>
            </p>
            <div className="mt-0.5 flex items-baseline gap-0.5 sm:mt-1 sm:gap-1">
              <span className="text-lg font-bold tabular-nums sm:text-xl" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[10px] text-muted-foreground/50 sm:text-xs">/100</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-background sm:mt-2 sm:h-1.5">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Total power */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-secondary px-4 py-2.5 sm:mt-4 sm:px-5 sm:py-3">
        <div>
          <span className="text-[10px] text-muted-foreground sm:text-xs">Общая сила</span>
          <div className="flex items-baseline gap-0.5 sm:gap-1">
            <span className="text-xl font-bold tabular-nums sm:text-2xl">{avg}</span>
            <span className="text-xs text-muted-foreground sm:text-sm">/100</span>
          </div>
        </div>
        <div className="relative h-12 w-12 sm:h-14 sm:w-14">
          <svg className="-rotate-90" viewBox="0 0 56 56" width="100%" height="100%">
            <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
            <circle
              cx="28" cy="28" r="22" fill="none" strokeWidth="4" strokeLinecap="round"
              stroke="url(#sg)" strokeDasharray={`${(avg / 100) * 138.23} 138.23`}
            />
            <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground sm:text-xs">{avg}%</span>
        </div>
      </div>
    </div>
  )
}
