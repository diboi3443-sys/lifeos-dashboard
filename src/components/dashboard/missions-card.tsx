"use client"

import { Crosshair, Zap, CheckCircle2, Circle } from "lucide-react"
import type { DayData } from "@/data/30_day_data"

interface MissionsCardProps {
  mission: DayData;
  completedTasks: number[];
  onToggleTask: (idx: number) => void;
}

export function MissionsCard({ mission, completedTasks, onToggleTask }: MissionsCardProps) {
  const done = completedTasks.length;
  const totalXP = mission.tasks.reduce((s, m) => s + m.points, 0);
  const earnedXP = mission.tasks.reduce((s, m, idx) => s + (completedTasks.includes(idx) ? m.points : 0), 0);

  const renderTaskIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <img src="/icons/video_content_icon.jpg" alt="Video" className="w-4 h-4 object-cover rounded shadow-sm sm:w-5 sm:h-5" />;
      case 'article':
        return <img src="/icons/article_reading_icon.jpg" alt="Article" className="w-4 h-4 object-cover rounded shadow-sm sm:w-5 sm:h-5" />;
      case 'action':
        return <img src="/icons/action_task_icon.jpg" alt="Action" className="w-4 h-4 object-cover rounded shadow-sm sm:w-5 sm:h-5" />;
      case 'reflection':
        return <img src="/icons/reflection_mindset_icon.jpg" alt="Reflection" className="w-4 h-4 object-cover rounded shadow-sm sm:w-5 sm:h-5" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground/30 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 sm:col-span-2 lg:col-span-1 lg:row-span-2">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-amber/10">
            <Crosshair className="h-4 w-4 text-c-amber" />
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
