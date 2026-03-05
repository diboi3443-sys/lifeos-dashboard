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

  // Helper to render our custom 3D icons instead of Lucide
  const renderTaskIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <img src="/icons/video_content_icon.jpg" alt="Video" className="w-5 h-5 object-cover rounded shadow-sm" />;
      case 'article':
        return <img src="/icons/article_reading_icon.jpg" alt="Article" className="w-5 h-5 object-cover rounded shadow-sm" />;
      case 'action':
        return <img src="/icons/action_task_icon.jpg" alt="Action" className="w-5 h-5 object-cover rounded shadow-sm" />;
      case 'reflection':
        return <img src="/icons/reflection_mindset_icon.jpg" alt="Reflection" className="w-5 h-5 object-cover rounded shadow-sm" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground/30" />;
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 lg:col-span-1 lg:row-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-amber/10">
            <Crosshair className="h-4 w-4 text-c-amber" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Миссии (День {mission.day})</h3>
            <p className="text-xs text-muted-foreground">{done}/{mission.tasks.length} выполнено</p>
          </div>
        </div>
      </div>

      {/* Progress summary */}
      <div className="mb-4 rounded-xl border border-border bg-secondary p-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Прогресс</span>
          <span className="font-semibold text-c-emerald">+{earnedXP} XP</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-gradient-to-r from-c-emerald to-primary transition-all duration-700"
            style={{ width: `${(earnedXP / totalXP) * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">{earnedXP} / {totalXP} XP</p>
      </div>

      {/* List */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto scrollbar-hide">
        {mission.tasks.map((m, idx) => {
          const isCompleted = completedTasks.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => onToggleTask(idx)}
              className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${isCompleted
                  ? "border-c-emerald/15 bg-c-emerald/[0.04]"
                  : "border-border bg-secondary hover:bg-muted"
                }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-c-emerald" />
              ) : (
                <Circle className="h-4.5 w-4.5 shrink-0 text-muted-foreground/30" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {renderTaskIcon(m.type)}
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">{m.type}</span>
                </div>
                <p className={`truncate text-sm ${isCompleted ? "text-muted-foreground line-through" : "text-foreground/80"}`}>{m.title}</p>
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${isCompleted ? "text-muted-foreground/40" : "text-primary"}`}>
                <Zap className="h-3 w-3" />{m.points}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  )
}
