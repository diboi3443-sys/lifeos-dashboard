"use client"

import { BarChart3, TrendingUp, Zap } from "lucide-react"

const week = [
  { day: "Пн", xp: 320, tasks: 5 },
  { day: "Вт", xp: 280, tasks: 4 },
  { day: "Ср", xp: 450, tasks: 7 },
  { day: "Чт", xp: 180, tasks: 3 },
  { day: "Пт", xp: 390, tasks: 6 },
  { day: "Сб", xp: 120, tasks: 2 },
  { day: "Вс", xp: 240, tasks: 4 },
]
const maxXP = Math.max(...week.map((d) => d.xp))
const totalXP = week.reduce((s, d) => s + d.xp, 0)
const avgXP = Math.round(totalXP / week.length)

export function WeeklyChartCard() {
  return (
    <div className="col-span-1 rounded-2xl border border-border bg-card p-5 md:col-span-2">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Активность недели</h3>
            <p className="text-xs text-muted-foreground">XP по дням</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-c-emerald/20 bg-c-emerald/5 px-2.5 py-1">
          <TrendingUp className="h-3 w-3 text-c-emerald" />
          <span className="text-xs font-semibold text-c-emerald">+12%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-3" style={{ height: 140 }}>
        {week.map((d, i) => {
          const h = (d.xp / maxXP) * 100
          const isToday = i === 4
          return (
            <div key={d.day} className="group relative flex flex-1 flex-col items-center gap-2">
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:opacity-100">
                <div className="rounded-lg border border-border bg-popover px-2.5 py-1.5 text-center shadow-lg">
                  <p className="text-xs font-bold">{d.xp} XP</p>
                  <p className="text-[10px] text-muted-foreground">{d.tasks} задач</p>
                </div>
              </div>
              <div
                className={`w-full rounded-lg transition-all duration-500 ${isToday ? "bg-gradient-to-t from-primary to-c-violet" : "bg-primary/20 group-hover:bg-primary/35"}`}
                style={{ height: `${h}%`, minHeight: 6 }}
              />
              <span className={`text-xs ${isToday ? "font-semibold text-primary" : "text-muted-foreground"}`}>{d.day}</span>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          { label: "Всего XP", value: "1 980", icon: Zap, color: "text-primary" },
          { label: "В среднем", value: `${avgXP}/день`, icon: BarChart3, color: "text-c-violet" },
          { label: "Лучший день", value: `${maxXP} XP`, icon: TrendingUp, color: "text-c-emerald" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 rounded-lg border border-border bg-secondary p-3">
            <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
            <div>
              <p className="text-xs font-semibold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
