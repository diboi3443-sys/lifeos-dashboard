"use client"

import { Flame, Calendar, Trophy } from "lucide-react"

const days = [
  { label: "Пн", active: true, intensity: 3 },
  { label: "Вт", active: true, intensity: 2 },
  { label: "Ср", active: true, intensity: 3 },
  { label: "Чт", active: true, intensity: 1 },
  { label: "Пт", active: true, intensity: 3 },
  { label: "Сб", active: false, intensity: 0 },
  { label: "Вс", active: false, intensity: 0 },
]

const weeks = [
  [3, 2, 3, 1, 3, 0, 1],
  [2, 3, 2, 3, 1, 2, 0],
  [3, 3, 2, 3, 3, 1, 2],
  [3, 2, 3, 1, 3, 0, 0],
]

function heatColor(n: number) {
  if (n === 0) return "var(--border)"
  if (n === 1) return "rgba(245,158,11,0.20)"
  if (n === 2) return "rgba(245,158,11,0.40)"
  return "rgba(245,158,11,0.65)"
}

export function StreakCard({ streak = 0 }: { streak?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-c-amber/10">
            <Flame className="h-5 w-5 text-c-amber" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Серия активности</h3>
            <p className="text-xs text-muted-foreground">Непрерывная полоса</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-c-amber/20 bg-c-amber/5 px-3 py-1.5">
          <Flame className="h-3.5 w-3.5 text-c-amber" />
          <span className="text-sm font-bold text-c-amber">{streak} дней</span>
        </div>
      </div>

      {/* Current week -- bigger cells on mobile */}
      <div className="mb-4 flex gap-2">
        {days.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground/60">{d.label}</span>
            <div
              className={`flex h-11 w-full items-center justify-center rounded-xl border transition-colors ${
                d.active ? "border-c-amber/15 bg-c-amber/[0.05]" : "border-border bg-secondary"
              }`}
            >
              {d.active ? (
                <Flame className="h-5 w-5 text-c-amber" style={{ opacity: 0.3 + d.intensity * 0.23 }} />
              ) : (
                <div className="h-2 w-2 rounded-full bg-border" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">4 недели</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex gap-1.5">
              {w.map((n, di) => (
                <div key={di} className="h-5 flex-1 rounded-md transition-colors md:h-6" style={{ backgroundColor: heatColor(n) }} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Рекорд: 12 дней</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Мало</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="h-3.5 w-3.5 rounded-sm" style={{ backgroundColor: heatColor(n) }} />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">Много</span>
          </div>
        </div>
      </div>
    </div>
  )
}
