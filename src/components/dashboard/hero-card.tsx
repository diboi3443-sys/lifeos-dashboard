"use client"

import { Zap, TrendingUp, Star, Shield, Crown, Trophy } from "lucide-react"
import dynamic from 'next/dynamic'

const Avatar3D = dynamic(() => import('@/components/Avatar3D'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-black/20">
      <div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
    </div>
  ),
})

export function HeroCard({ level, xp, maxXp }: { level: number; xp: number; maxXp: number }) {
  const currentXP = xp
  const maxXP = maxXp
  const progress = Math.min((currentXP / maxXP) * 100, 100)

  return (
    <div className="relative col-span-1 overflow-hidden rounded-2xl border border-border bg-card md:col-span-2 lg:col-span-3">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-c-violet/[0.03]" />

      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-36 w-36 overflow-hidden rounded-2xl border border-border md:h-44 md:w-44 bg-black/40 relative">
            <Avatar3D level={level} className="w-full h-full scale-125 translate-y-2" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 shadow-lg">
            <Crown className="h-3.5 w-3.5 text-c-amber" />
            <span className="text-sm font-bold text-primary">LVL {level}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              Профиль героя
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              {"Алексей "}
              <span className="text-primary">Кибервоин</span>
            </h2>
            <div className="mt-1 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Путь мастера дисциплины и знаний</p>
            </div>
          </div>

          {/* XP */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-c-amber" />
                <span className="text-sm text-muted-foreground">Опыт</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold tabular-nums">{currentXP.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">/ {maxXP.toLocaleString()} XP</span>
              </div>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-primary to-c-violet transition-all duration-1000"
                style={{ width: `${progress}%` }}
              >
                <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{maxXP - currentXP} XP до следующего уровня</p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: TrendingUp, label: "+240 XP сегодня", color: "text-c-emerald" },
              { icon: Trophy, label: "12 достижений", color: "text-c-amber" },
              { icon: Star, label: "Ранг B+", color: "text-c-violet" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5">
                <b.icon className={`h-3.5 w-3.5 ${b.color}`} />
                <span className="text-xs font-medium text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
