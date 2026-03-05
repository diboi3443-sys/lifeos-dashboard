"use client"

import { Plus, Timer, PenLine, Brain, Target, Zap } from "lucide-react"

const actions = [
  { icon: Timer, label: "Помодоро", desc: "25 мин", color: "#f43f5e" },
  { icon: PenLine, label: "Заметка", desc: "Запись", color: "#6366f1" },
  { icon: Brain, label: "Рефлексия", desc: "Дневник", color: "#8b5cf6" },
  { icon: Target, label: "Цель", desc: "Новая", color: "#10b981" },
]

export function QuickActionsCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-1">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-rose/10">
          <Zap className="h-4 w-4 text-c-rose" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Быстрые действия</h3>
          <p className="text-xs text-muted-foreground">Инструменты</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <button
            key={a.label}
            className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary p-3.5 transition-colors hover:bg-muted"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-105" style={{ backgroundColor: `${a.color}10` }}>
              <a.icon className="h-4.5 w-4.5" style={{ color: a.color }} />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold">{a.label}</p>
              <p className="text-[10px] text-muted-foreground">{a.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <button className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
        <Plus className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">Добавить</span>
      </button>
    </div>
  )
}
