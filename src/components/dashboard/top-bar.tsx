"use client"

import { Bell, Search, Command, Flame, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export function TopBar() {
  const [dateStr, setDateStr] = useState("")

  useEffect(() => {
    const d = new Date()
    setDateStr(
      d.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })
    )
  }, [])

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          Панель управления
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
          {"Доброго дня, "}<span className="text-primary">Алексей</span>
        </h1>
        {dateStr && <p className="mt-0.5 text-sm capitalize text-muted-foreground">{dateStr}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1.5 rounded-lg border border-c-amber/20 bg-c-amber/5 px-3 py-1.5">
            <Flame className="h-3.5 w-3.5 text-c-amber" />
            <span className="text-xs font-semibold text-c-amber">5 дней</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">+240 XP</span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск..."
            className="w-28 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none md:w-40"
          />
          <div className="hidden items-center gap-0.5 rounded-md border border-border bg-secondary px-1.5 py-0.5 md:flex">
            <Command className="h-2.5 w-2.5 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">K</span>
          </div>
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-secondary">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-c-rose" />
        </button>
      </div>
    </div>
  )
}
