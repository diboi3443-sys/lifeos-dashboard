"use client"

import { useState } from "react"
import { Activity, TrendingUp } from "lucide-react"

const moods = [
  { value: 5, label: "Отлично", color: "#10b981" },
  { value: 4, label: "Хорошо", color: "#6366f1" },
  { value: 3, label: "Норм", color: "#f59e0b" },
  { value: 2, label: "Так себе", color: "#8b5cf6" },
  { value: 1, label: "Плохо", color: "#f43f5e" },
]

const weekMoods = [
  { day: "Пн", value: 4, color: "#6366f1" },
  { day: "Вт", value: 5, color: "#10b981" },
  { day: "Ср", value: 3, color: "#f59e0b" },
  { day: "Чт", value: 4, color: "#6366f1" },
  { day: "Пт", value: 4, color: "#6366f1" },
  { day: "Сб", value: 0, color: "transparent" },
  { day: "Вс", value: 0, color: "transparent" },
]

export function MoodCard() {
  const [selected, setSelected] = useState(4)
  const current = moods.find((m) => m.value === selected)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-emerald/10">
            <Activity className="h-4 w-4 text-c-emerald" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Настроение</h3>
            <p className="text-xs text-muted-foreground">Сегодня</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-medium text-c-emerald">
          <TrendingUp className="h-3 w-3" />Стабильно
        </span>
      </div>

      {/* Current */}
      {current && (
        <div className="mb-4 flex items-center justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300"
            style={{ borderColor: `${current.color}30`, backgroundColor: `${current.color}08` }}
          >
            <span className="text-lg font-bold" style={{ color: current.color }}>{current.label}</span>
          </div>
        </div>
      )}

      {/* Selector */}
      <div className="mb-4 flex gap-1.5">
        {moods.map((m) => (
          <button
            key={m.value}
            onClick={() => setSelected(m.value)}
            className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg border py-2 transition-all ${
              selected === m.value ? "scale-105 border-border bg-secondary" : "border-transparent"
            }`}
          >
            <div
              className="h-3 w-3 rounded-full transition-opacity"
              style={{ backgroundColor: m.color, opacity: selected === m.value ? 1 : 0.25 }}
            />
            <span className="text-[9px] font-medium" style={{ color: selected === m.value ? m.color : "var(--muted-foreground)" }}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* Week */}
      <div className="rounded-lg border border-border bg-secondary p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Эта неделя</p>
        <div className="flex gap-1.5">
          {weekMoods.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="h-5 w-full rounded-md"
                style={{ backgroundColor: d.value ? `${d.color}25` : "var(--border)" }}
              />
              <span className="text-[9px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
