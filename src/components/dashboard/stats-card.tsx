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
    { name: "Дисциплина", value: stats.disc, icon: Shield, color: "#6366f1", delta: "+1" },
    { name: "Физика", value: stats.phys, icon: Dumbbell, color: "#10b981", delta: "+2" },
    { name: "Интеллект", value: stats.intel, icon: Brain, color: "#8b5cf6", delta: "+1" },
    { name: "Стойкость", value: stats.emo, icon: Heart, color: "#f43f5e", delta: "+1" },
    { name: "Харизма", value: stats.pub, icon: Sparkles, color: "#f59e0b", delta: "+3" },
  ]

  const avg = Math.round(statArray.reduce((s, x) => s + x.value, 0) / statArray.length)

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-c-violet/10">
            <Swords className="h-5 w-5 text-c-violet" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Характеристики</h3>
            <p className="text-xs text-muted-foreground">Навыки персонажа</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-c-violet/20 bg-c-violet/5 px-3 py-1.5">
          <Swords className="h-3.5 w-3.5 text-c-violet" />
          <span className="text-xs font-bold text-c-violet">Ранг B+</span>
        </div>
      </div>

      {/* Stats grid -- 2 cols on mobile, 5 on desktop */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {statArray.map((s) => (
          <div key={s.name} className="rounded-xl border border-border bg-secondary p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon className="h-5 w-5" style={{ color: s.color }} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-c-emerald">
                <TrendingUp className="h-3 w-3" />{s.delta}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{s.name}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</span>
              <span className="text-xs text-muted-foreground/50">/100</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Total power */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3">
        <div>
          <span className="text-xs text-muted-foreground">Общая сила</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tabular-nums">{avg}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        <div className="relative h-14 w-14">
          <svg className="-rotate-90" viewBox="0 0 56 56" width="100%" height="100%">
            <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
            <circle cx="28" cy="28" r="22" fill="none" strokeWidth="4" strokeLinecap="round"
              stroke="url(#sg)" strokeDasharray={`${(avg / 100) * 138.23} 138.23`} />
            <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{avg}%</span>
        </div>
      </div>
    </div>
  )
}
