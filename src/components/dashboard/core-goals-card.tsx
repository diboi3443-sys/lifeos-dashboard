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
        <div className="flex flex-col rounded-2xl border border-border bg-card p-5 lg:col-span-4 relative overflow-hidden group">
            {/* Background effects */}
            <div className="absolute top-0 right-0 p-32 bg-c-violet/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-c-violet/20 to-c-sky/20 border border-white/5 shadow-inner">
                        <Target className="h-5 w-5 text-c-sky drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white tracking-wide">Главные ориентиры</h3>
                        <p className="text-xs text-muted-foreground">Твоё видение и цели</p>
                    </div>
                </div>

                {!isEditing ? (
                    <button
                        onClick={() => {
                            setDraftGoals(goals);
                            setIsEditing(true);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-medium text-white/70 hover:text-white cursor-pointer"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                        Изменить
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCancel}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-medium text-white/70 cursor-pointer"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-c-emerald/20 hover:bg-c-emerald/30 border border-c-emerald/30 transition-colors text-xs font-medium text-c-emerald cursor-pointer"
                        >
                            <Check className="w-3.5 h-3.5" />
                            Сохранить
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {/* 1. Намерения (Что иметь) */}
                <div className="p-4 rounded-xl border border-white/5 bg-black/20 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                        <Crown className="w-4 h-4 text-c-emerald" />
                        <h4 className="text-sm font-semibold text-white/90">1. Что иметь?</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={draftGoals.wantToHave}
                            onChange={(e) => setDraftGoals({ ...draftGoals, wantToHave: e.target.value })}
                            className="w-full flex-1 min-h-[80px] bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-c-emerald/50 resize-none"
                            placeholder="Материальные цели, доходы, окружение..."
                        />
                    ) : (
                        <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap flex-1">
                            {goals.wantToHave || <span className="text-white/30 italic">Цель еще не задана...</span>}
                        </p>
                    )}
                </div>

                {/* 2. Идентичность (Кем быть) */}
                <div className="p-4 rounded-xl border border-white/5 bg-black/20 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-c-sky" />
                        <h4 className="text-sm font-semibold text-white/90">2. Кем быть?</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={draftGoals.wantToBe}
                            onChange={(e) => setDraftGoals({ ...draftGoals, wantToBe: e.target.value })}
                            className="w-full flex-1 min-h-[80px] bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-c-sky/50 resize-none"
                            placeholder="Личностные качества, статус..."
                        />
                    ) : (
                        <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap flex-1">
                            {goals.wantToBe || <span className="text-white/30 italic">Цель еще не задана...</span>}
                        </p>
                    )}
                </div>

                {/* 3. Деятельность (Чем заниматься) */}
                <div className="p-4 rounded-xl border border-white/5 bg-black/20 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-c-rose" />
                        <h4 className="text-sm font-semibold text-white/90">3. Чем заниматься?</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={draftGoals.wantToDo}
                            onChange={(e) => setDraftGoals({ ...draftGoals, wantToDo: e.target.value })}
                            className="w-full flex-1 min-h-[80px] bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-c-rose/50 resize-none"
                            placeholder="Твоя деятельность, миссия..."
                        />
                    ) : (
                        <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap flex-1">
                            {goals.wantToDo || <span className="text-white/30 italic">Цель еще не задана...</span>}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

