"use client"

import {
  LayoutDashboard, Target, BookOpen, Dumbbell, GraduationCap,
  FolderKanban, Wallet, Settings, LogOut, Menu, X, Crown,
} from "lucide-react"
import { useState } from "react"

const nav = [
  { icon: LayoutDashboard, label: "Дашборд", active: true },
  { icon: Target, label: "Цели", active: false },
  { icon: BookOpen, label: "Журнал", active: false },
  { icon: Dumbbell, label: "Физика", active: false },
  { icon: GraduationCap, label: "Обучение", active: false },
  { icon: FolderKanban, label: "Проекты", active: false },
  { icon: Wallet, label: "Финансы", active: false },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm md:hidden">
        <button onClick={() => setOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border">
          <Menu className="h-4 w-4 text-muted-foreground" />
        </button>
        <span className="text-sm font-bold tracking-tight">Life<span className="text-primary">OS</span></span>
        <div className="w-9" />
      </header>

      {open && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed left-0 top-0 z-[60] flex h-screen w-[260px] flex-col border-r border-border bg-sidebar transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <div className="h-3 w-3 rounded-[3px] bg-primary" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight">Life<span className="text-primary">OS</span></span>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">v2.0 pro</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-5 h-px bg-border" />

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
            Навигация
          </p>
          {nav.map((item) => (
            <button
              key={item.label}
              onClick={() => setOpen(false)}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                item.active
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.active && <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />}
              <item.icon className="h-[18px] w-[18px]" strokeWidth={item.active ? 2 : 1.5} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="flex flex-col gap-1 px-3 pb-3">
          <div className="mx-2 mb-1 h-px bg-border" />
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Settings className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span>Настройки</span>
          </button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <LogOut className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span>Выйти</span>
          </button>

          {/* Profile */}
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-secondary p-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
              <img src="/images/avatar-hero.jpg" alt="Аватар" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold">Алексей</p>
                <Crown className="h-3 w-3 text-c-amber" />
              </div>
              <p className="text-xs text-muted-foreground">Уровень 15</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
