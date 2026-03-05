"use client"

import { Crosshair, Zap, CheckCircle2, Circle, Play, FileText, Rocket, Brain } from "lucide-react"
import type { DayData } from "@/data/30_day_data"

interface MissionsCardProps {
  mission: DayData;
  completedTasks: number[];
  onToggleTask: (idx: number) => void;
}

const TASK_ICONS: Record<string, { icon: typeof Play; color: string }> = {
  video: { icon: Play, color: '#ef4444' },
  article: { icon: FileText, color: '#3b82f6' },
  action: { icon: Rocket, color: '#22c55e' },
  reflection: { icon: Brain, color: '#8b5cf6' },
};

export function MissionsCard({ mission, completedTasks, onToggleTask }: MissionsCardProps) {
  const done = completedTasks.length;
  const totalXP = mission.tasks.reduce((s, m) => s + m.points, 0);
  const earnedXP = mission.tasks.reduce((s, m, idx) => s + (completedTasks.includes(idx) ? m.points : 0), 0);

  const renderTaskIcon = (type: string) => {
    const cfg = TASK_ICONS[type];
    if (!cfg) return <Circle className="w-4 h-4 text-muted-foreground/30 sm:w-5 sm:h-5" />;
    const Icon = cfg.icon;
    return (
      <div
        className="flex h-6 w-6 items-center justify-center rounded-md shrink-0 sm:h-7 sm:w-7"
        style={{ background: `${cfg.color}15` }}
      >
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: cfg.color }} />
      </div>
    );
  };

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 sm:col-span-2 lg:col-span-1 lg:row-span-2">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-c-amber/10 sm:h-11 sm:w-11">
            <Crosshair className="h-5 w-5 text-c-amber sm:h-6 sm:w-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Миссии (День {mission.day})</h3>
            <p className="text-[11px] text-muted-foreground">{done}/{mission.tasks.length} выполнено</p>
          </div>
        </div>
      </div>

      {/* Progress summary */}
      <div className="mb-3 rounded-xl border border-border bg-secondary p-3 sm:mb-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Прогресс</span>
          <span className="font-semibold text-c-emerald">+{earnedXP} XP</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-background sm:h-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-c-emerald to-primary transition-all duration-700"
            style={{ width: `${totalXP > 0 ? (earnedXP / totalXP) * 100 : 0}%` }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground sm:text-[11px]">{earnedXP} / {totalXP} XP</p>
      </div>

      {/* Task list */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto scrollbar-hide max-h-[300px] sm:max-h-none">
        {mission.tasks.map((m, idx) => {
          const isCompleted = completedTasks.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => onToggleTask(idx)}
              className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-colors sm:gap-3 sm:py-2.5 ${isCompleted
                  ? "border-c-emerald/15 bg-c-emerald/[0.04]"
                  : "border-border bg-secondary hover:bg-muted"
                }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-c-emerald" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-muted-foreground/30" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {renderTaskIcon(m.type)}
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/50 sm:text-[10px]">{m.type}</span>
                </div>
                <p className={`truncate text-xs sm:text-sm ${isCompleted ? "text-muted-foreground line-through" : "text-foreground/80"}`}>{m.title}</p>
              </div>
              <span className={`flex items-center gap-0.5 text-[11px] font-semibold shrink-0 sm:text-xs ${isCompleted ? "text-muted-foreground/40" : "text-primary"}`}>
                <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{m.points}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  )
}
