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
    <div className="col-span-1 rounded-2xl border border-border bg-card p-4 sm:p-5 sm:col-span-2 lg:col-span-3">
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-amber/10">
            <Flame className="h-4 w-4 text-c-amber" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Серия активности</h3>
            <p className="text-[11px] text-muted-foreground">Непрерывная полоса</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-c-amber/20 bg-c-amber/5 px-2.5 py-1 sm:px-3 sm:py-1.5">
          <Flame className="h-3 w-3 text-c-amber sm:h-3.5 sm:w-3.5" />
          <span className="text-[11px] font-bold text-c-amber sm:text-sm">{streak} дней</span>
        </div>
      </div>

      {/* Current week */}
      <div className="mb-4 flex gap-1.5 sm:mb-5 sm:gap-2">
        {days.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1 sm:gap-1.5">
            <span className="text-[9px] font-semibold uppercase text-muted-foreground/60 sm:text-[10px]">{d.label}</span>
            <div
              className={`flex h-9 w-full items-center justify-center rounded-lg border transition-colors sm:h-10 ${d.active ? "border-c-amber/15 bg-c-amber/[0.05]" : "border-border bg-secondary"
                }`}
            >
              {d.active ? (
                <Flame className="h-3 w-3 text-c-amber sm:h-3.5 sm:w-3.5" style={{ opacity: 0.3 + d.intensity * 0.23 }} />
              ) : (
                <div className="h-1.5 w-1.5 rounded-full bg-border" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60 sm:text-[10px]">4 недели</span>
        </div>
        <div className="flex flex-col gap-1">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex gap-1">
              {w.map((n, di) => (
                <div key={di} className="h-4 flex-1 rounded-md transition-colors sm:h-5" style={{ backgroundColor: heatColor(n) }} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Trophy className="h-3 w-3 text-muted-foreground" />
            <span className="text-[9px] text-muted-foreground sm:text-[10px]">Рекорд: 12 дней</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] text-muted-foreground sm:text-[9px]">Мало</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="h-2.5 w-2.5 rounded-sm sm:h-3 sm:w-3" style={{ backgroundColor: heatColor(n) }} />
              ))}
            </div>
            <span className="text-[8px] text-muted-foreground sm:text-[9px]">Много</span>
          </div>
        </div>
      </div>
    </div>
  )
}
