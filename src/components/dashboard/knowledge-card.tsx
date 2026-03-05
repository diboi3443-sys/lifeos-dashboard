"use client"

import { GraduationCap, BookOpen, Headphones, Code2, Play, Clock } from "lucide-react"

const items = [
  { type: "Курс", title: "React Advanced Patterns", progress: 72, icon: Code2, color: "#6366f1", lessons: "18/25", time: "2ч 15м" },
  { type: "Книга", title: "Atomic Habits", progress: 45, icon: BookOpen, color: "#8b5cf6", lessons: "135/300 стр.", time: "~4ч" },
  { type: "Подкаст", title: "Lex Fridman #421", progress: 60, icon: Headphones, color: "#f59e0b", lessons: "1:20/2:15", time: "55 мин" },
]

export function KnowledgeCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Обучение</h3>
            <p className="text-xs text-muted-foreground">3 активных материала</p>
          </div>
        </div>
        <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">+120 XP / нед</span>
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="group rounded-xl border border-border bg-secondary p-4 transition-colors hover:bg-muted">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${it.color}15` }}>
                <it.icon className="h-5 w-5" style={{ color: it.color }} />
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border opacity-60 transition-all hover:opacity-100 hover:bg-card md:opacity-0 md:group-hover:opacity-100">
                <Play className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            <span className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${it.color}10`, color: it.color }}>
              {it.type}
            </span>
            <p className="mt-1.5 truncate text-sm font-semibold text-foreground">{it.title}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />{it.time} осталось
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span style={{ color: it.color }}>{it.progress}%</span>
                <span className="text-muted-foreground">{it.lessons}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${it.progress}%`, backgroundColor: it.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
