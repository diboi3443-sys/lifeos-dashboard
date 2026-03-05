"use client"

import { useState } from "react"
import { Repeat, Droplets, Moon, Apple, BookOpen, Dumbbell, Check } from "lucide-react"

interface Habit { id: number; icon: typeof Droplets; name: string; cur: number; max: number; unit: string; color: string; done: boolean }

const init: Habit[] = [
  { id: 1, icon: Droplets, name: "Вода", cur: 6, max: 8, unit: "стак.", color: "#38bdf8", done: false },
  { id: 2, icon: Moon, name: "Сон 8ч", cur: 1, max: 1, unit: "", color: "#8b5cf6", done: true },
  { id: 3, icon: Apple, name: "Питание", cur: 2, max: 3, unit: "приёма", color: "#10b981", done: false },
  { id: 4, icon: BookOpen, name: "Чтение", cur: 25, max: 30, unit: "стр.", color: "#f59e0b", done: false },
  { id: 5, icon: Dumbbell, name: "Спорт", cur: 0, max: 1, unit: "", color: "#f43f5e", done: false },
]

export function HabitsCard() {
  const [habits, setHabits] = useState(init)
  const toggle = (id: number) => setHabits((p) => p.map((h) => (h.id === id ? { ...h, done: !h.done, cur: !h.done ? h.max : 0 } : h)))
  const doneCount = habits.filter((h) => h.done).length

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 lg:col-span-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-emerald/10">
            <Repeat className="h-4 w-4 text-c-emerald" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Привычки</h3>
            <p className="text-xs text-muted-foreground">{doneCount}/{habits.length} сегодня</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {habits.map((h) => {
          const pct = Math.min((h.cur / h.max) * 100, 100)
          return (
            <button
              key={h.id}
              onClick={() => toggle(h.id)}
              className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                h.done ? "border-c-emerald/15 bg-c-emerald/[0.04]" : "border-border bg-secondary hover:bg-muted"
              }`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${h.color}10` }}>
                {h.done ? <Check className="h-4 w-4" style={{ color: h.color }} /> : <h.icon className="h-4 w-4" style={{ color: `${h.color}80` }} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${h.done ? "text-muted-foreground" : ""}`}>{h.name}</span>
                  <span className="text-[10px] tabular-nums text-muted-foreground">{h.cur}/{h.max} {h.unit}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: h.color, opacity: h.done ? 0.6 : 0.8 }} />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
