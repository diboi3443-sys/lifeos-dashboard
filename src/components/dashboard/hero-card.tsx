"use client"

import { Zap, TrendingUp, Star, Shield, Crown, Trophy } from "lucide-react"
import PhotoAvatar from "@/components/PhotoAvatar"

export function HeroCard({ level, xp, maxXp }: { level: number; xp: number; maxXp: number }) {
  const progress = Math.min((xp / maxXp) * 100, 100)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-c-violet/[0.03]" />

      <div className="relative flex flex-col gap-5 p-5 md:flex-row md:items-center md:p-6">
        {/* Photo Avatar */}
        <div className="relative mx-auto shrink-0 md:mx-0">
          <PhotoAvatar size={140} className="hidden md:block" />
          <PhotoAvatar size={100} className="block md:hidden" />
          <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 shadow-lg z-10">
            <Crown className="h-4 w-4 text-c-amber" />
            <span className="text-sm font-bold text-primary">LVL {level}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 min-w-0">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Профиль героя
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">
              {"Алексей "}
              <span className="text-primary">Кибервоин</span>
            </h2>
            <div className="mt-1 flex items-center justify-center gap-1.5 md:justify-start">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Путь мастера дисциплины и знаний</p>
            </div>
          </div>

          {/* XP */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-c-amber" />
                <span className="text-sm text-muted-foreground">Опыт</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold tabular-nums">{xp.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">/ {maxXp.toLocaleString()} XP</span>
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
            <p className="text-xs text-muted-foreground">{maxXp - xp} XP до следующего уровня</p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {[
              { icon: TrendingUp, label: "+240 XP", color: "text-c-emerald" },
              { icon: Trophy, label: "12 ачивок", color: "text-c-amber" },
              { icon: Star, label: "Ранг B+", color: "text-c-violet" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2">
                <b.icon className={`h-4 w-4 ${b.color}`} />
                <span className="text-xs font-medium text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
