'use client';

import { useState } from 'react';
import { Target, Edit2, Check, Star, Zap, Crown } from 'lucide-react';
import { useLocalStorage } from '@/lib/storage';

interface CoreGoals {
    wantToHave: string;
    wantToBe: string;
    wantToDo: string;
}

const DEFAULT_GOALS: CoreGoals = {
    wantToHave: '',
    wantToBe: '',
    wantToDo: ''
};

export function CoreGoalsCard() {
    const [goals, setGoals] = useLocalStorage<CoreGoals>('core_goals', DEFAULT_GOALS);
    const [isEditing, setIsEditing] = useState(false);
    const [draftGoals, setDraftGoals] = useState<CoreGoals>(goals);

    const handleSave = () => {
        setGoals(draftGoals);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDraftGoals(goals);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 col-span-1 sm:col-span-2 lg:col-span-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-c-violet/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-c-violet/20 to-c-sky/20 border border-border shrink-0 sm:h-12 sm:w-12">
                        <Target className="h-5 w-5 text-c-sky sm:h-6 sm:w-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-foreground sm:text-base">Главные ориентиры</h3>
                        <p className="text-[11px] text-muted-foreground sm:text-xs">Твоё видение и цели</p>
                    </div>
                </div>

                {!isEditing ? (
                    <button
                        onClick={() => {
                            setDraftGoals(goals);
                            setIsEditing(true);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted border border-border transition-colors text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer self-start sm:self-auto"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                        Изменить
                    </button>
                ) : (
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            onClick={handleCancel}
                            className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted border border-border transition-colors text-xs font-medium text-muted-foreground cursor-pointer"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-c-emerald/10 hover:bg-c-emerald/20 border border-c-emerald/20 transition-colors text-xs font-medium text-c-emerald cursor-pointer"
                        >
                            <Check className="w-3.5 h-3.5" />
                            Сохранить
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-3 relative z-10 sm:grid-cols-3 sm:gap-4">
                {/* Goal 1 */}
                <div className="p-3 rounded-xl border border-border bg-secondary flex flex-col sm:p-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Crown className="w-4 h-4 text-c-emerald sm:w-5 sm:h-5" />
                        <h4 className="text-xs font-semibold text-foreground/90 sm:text-sm">1. Что иметь?</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={draftGoals.wantToHave}
                            onChange={(e) => setDraftGoals({ ...draftGoals, wantToHave: e.target.value })}
                            className="w-full flex-1 min-h-[70px] bg-background border border-border rounded-lg p-3 text-xs text-foreground focus:outline-none focus:border-c-emerald/50 resize-none sm:text-sm sm:min-h-[80px]"
                            placeholder="Материальные цели, доходы..."
                        />
                    ) : (
                        <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap flex-1 sm:text-sm">
                            {goals.wantToHave || <span className="text-muted-foreground/40 italic">Цель ещё не задана...</span>}
                        </p>
                    )}
                </div>

                {/* Goal 2 */}
                <div className="p-3 rounded-xl border border-border bg-secondary flex flex-col sm:p-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Star className="w-4 h-4 text-c-sky sm:w-5 sm:h-5" />
                        <h4 className="text-xs font-semibold text-foreground/90 sm:text-sm">2. Кем быть?</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={draftGoals.wantToBe}
                            onChange={(e) => setDraftGoals({ ...draftGoals, wantToBe: e.target.value })}
                            className="w-full flex-1 min-h-[70px] bg-background border border-border rounded-lg p-3 text-xs text-foreground focus:outline-none focus:border-c-sky/50 resize-none sm:text-sm sm:min-h-[80px]"
                            placeholder="Личностные качества, статус..."
                        />
                    ) : (
                        <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap flex-1 sm:text-sm">
                            {goals.wantToBe || <span className="text-muted-foreground/40 italic">Цель ещё не задана...</span>}
                        </p>
                    )}
                </div>

                {/* Goal 3 */}
                <div className="p-3 rounded-xl border border-border bg-secondary flex flex-col sm:p-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Zap className="w-4 h-4 text-c-rose sm:w-5 sm:h-5" />
                        <h4 className="text-xs font-semibold text-foreground/90 sm:text-sm">3. Чем заниматься?</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={draftGoals.wantToDo}
                            onChange={(e) => setDraftGoals({ ...draftGoals, wantToDo: e.target.value })}
                            className="w-full flex-1 min-h-[70px] bg-background border border-border rounded-lg p-3 text-xs text-foreground focus:outline-none focus:border-c-rose/50 resize-none sm:text-sm sm:min-h-[80px]"
                            placeholder="Твоя деятельность, миссия..."
                        />
                    ) : (
                        <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap flex-1 sm:text-sm">
                            {goals.wantToDo || <span className="text-muted-foreground/40 italic">Цель ещё не задана...</span>}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
