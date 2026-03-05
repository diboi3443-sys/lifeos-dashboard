"use client"

import { GraduationCap, BookOpen, Headphones, Code2, Play, Clock } from "lucide-react"

const items = [
  { type: "Курс", title: "React Advanced Patterns", progress: 72, icon: Code2, color: "#6366f1", lessons: "18/25", time: "2ч 15м" },
  { type: "Книга", title: "Atomic Habits", progress: 45, icon: BookOpen, color: "#8b5cf6", lessons: "135/300 стр.", time: "~4ч" },
  { type: "Подкаст", title: "Lex Fridman #421", progress: 60, icon: Headphones, color: "#f59e0b", lessons: "1:20/2:15", time: "55 мин" },
]

export function KnowledgeCard() {
  return (
    <div className="col-span-1 rounded-2xl border border-border bg-card p-4 sm:p-5 sm:col-span-2 lg:col-span-4">
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Обучение</h3>
            <p className="text-[11px] text-muted-foreground">3 активных материала</p>
          </div>
        </div>
        <span className="rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-muted-foreground sm:px-2.5 sm:text-[11px]">+120 XP / нед</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="group rounded-xl border border-border bg-secondary p-3.5 transition-colors hover:bg-muted sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10" style={{ backgroundColor: `${it.color}10` }}>
                <it.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" style={{ color: it.color }} />
              </div>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-border opacity-60 transition-all hover:opacity-100 hover:bg-card sm:h-8 sm:w-8 sm:opacity-0 sm:group-hover:opacity-100">
                <Play className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
            <span className="inline-block rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider sm:text-[9px]" style={{ backgroundColor: `${it.color}10`, color: it.color }}>
              {it.type}
            </span>
            <p className="mt-1.5 truncate text-xs font-semibold text-foreground sm:text-sm">{it.title}</p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{it.time} осталось
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="mb-1 flex justify-between text-[10px] sm:text-[11px]">
                <span style={{ color: it.color }}>{it.progress}%</span>
                <span className="text-muted-foreground">{it.lessons}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-background sm:h-1.5">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${it.progress}%`, backgroundColor: it.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
