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
    if (!cfg) return <Circle className="w-5 h-5 text-muted-foreground/30" />;
    const Icon = cfg.icon;
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0" style={{ background: `${cfg.color}15` }}>
        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
      </div>
    );
  };

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 h-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-c-amber/10">
            <Crosshair className="h-5 w-5 text-c-amber" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Миссии (День {mission.day})</h3>
            <p className="text-xs text-muted-foreground">{done}/{mission.tasks.length} выполнено</p>
          </div>
        </div>
      </div>

      {/* Progress summary */}
      <div className="mb-4 rounded-xl border border-border bg-secondary p-3.5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Прогресс</span>
          <span className="font-semibold text-c-emerald">+{earnedXP} XP</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-gradient-to-r from-c-emerald to-primary transition-all duration-700"
            style={{ width: `${totalXP > 0 ? (earnedXP / totalXP) * 100 : 0}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">{earnedXP} / {totalXP} XP</p>
      </div>

      {/* Task list */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-hide">
        {mission.tasks.map((m, idx) => {
          const isCompleted = completedTasks.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => onToggleTask(idx)}
              className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors active:scale-[0.98] ${
                isCompleted
                  ? "border-c-emerald/15 bg-c-emerald/[0.04]"
                  : "border-border bg-secondary hover:bg-muted"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-c-emerald" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-muted-foreground/30" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {renderTaskIcon(m.type)}
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">{m.type}</span>
                </div>
                <p className={`text-sm leading-snug ${isCompleted ? "text-muted-foreground line-through" : "text-foreground/80"}`}>{m.title}</p>
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold shrink-0 ${isCompleted ? "text-muted-foreground/40" : "text-primary"}`}>
                <Zap className="h-3 w-3" />{m.points}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  )
}
