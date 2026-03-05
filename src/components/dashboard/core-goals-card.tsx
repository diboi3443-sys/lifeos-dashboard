'use client';

import { useState } from 'react';
import { Target, Edit2, Check, Star, Zap, Crown } from 'lucide-react';
import { useLocalStorage } from '@/lib/storage';

interface CoreGoals {
    wantToHave: string;
    wantToBe: string;
    wantToDo: string;
}

const DEFAULT_GOALS: CoreGoals = { wantToHave: '', wantToBe: '', wantToDo: '' };

export function CoreGoalsCard() {
    const [goals, setGoals] = useLocalStorage<CoreGoals>('core_goals', DEFAULT_GOALS);
    const [isEditing, setIsEditing] = useState(false);
    const [draftGoals, setDraftGoals] = useState<CoreGoals>(goals);

    const handleSave = () => { setGoals(draftGoals); setIsEditing(false); };
    const handleCancel = () => { setDraftGoals(goals); setIsEditing(false); };

    const sections = [
        { key: 'wantToHave' as const, label: '1. Что иметь?', icon: Crown, color: '#10b981', placeholder: 'Материальные цели, доходы...' },
        { key: 'wantToBe' as const, label: '2. Кем быть?', icon: Star, color: '#38bdf8', placeholder: 'Личностные качества, статус...' },
        { key: 'wantToDo' as const, label: '3. Чем заниматься?', icon: Zap, color: '#f43f5e', placeholder: 'Твоя деятельность, миссия...' },
    ];

    return (
        <div className="flex flex-col rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-c-violet/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-c-violet/20 to-c-sky/20 border border-border shrink-0">
                        <Target className="h-5 w-5 text-c-sky" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-foreground md:text-base">Главные ориентиры</h3>
                        <p className="text-xs text-muted-foreground">Твоё видение и цели</p>
                    </div>
                </div>

                {!isEditing ? (
                    <button
                        onClick={() => { setDraftGoals(goals); setIsEditing(true); }}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary hover:bg-muted border border-border transition-colors text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer self-start sm:self-auto"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                        Изменить
                    </button>
                ) : (
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button onClick={handleCancel} className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-muted border border-border transition-colors text-xs font-medium text-muted-foreground cursor-pointer">
                            Отмена
                        </button>
                        <button onClick={handleSave} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-c-emerald/10 hover:bg-c-emerald/20 border border-c-emerald/20 transition-colors text-xs font-medium text-c-emerald cursor-pointer">
                            <Check className="w-3.5 h-3.5" />
                            Сохранить
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-3 relative z-10 sm:grid-cols-3 sm:gap-4">
                {sections.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.key} className="p-4 rounded-xl border border-border bg-secondary flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <Icon className="w-5 h-5" style={{ color: s.color }} />
                                <h4 className="text-sm font-semibold text-foreground/90">{s.label}</h4>
                            </div>
                            {isEditing ? (
                                <textarea
                                    value={draftGoals[s.key]}
                                    onChange={(e) => setDraftGoals({ ...draftGoals, [s.key]: e.target.value })}
                                    className="w-full flex-1 min-h-[80px] bg-background border border-border rounded-lg p-3 text-sm text-foreground focus:outline-none resize-none"
                                    style={{ borderColor: isEditing ? `${s.color}30` : undefined }}
                                    placeholder={s.placeholder}
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap flex-1">
                                    {goals[s.key] || <span className="text-muted-foreground/40 italic">Цель ещё не задана...</span>}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
