"use client"

import { Utensils, Flame } from "lucide-react"
import { useLocalStorage } from "@/lib/storage"
import { calcTargets, type NutritionGoal, type DayMeals } from "@/data/nutrition_data"

const today = () => new Date().toISOString().split('T')[0]

export function NutritionCard() {
    const [weight] = useLocalStorage<number>('nut_weight', 75)
    const [goal] = useLocalStorage<NutritionGoal>('nut_goal', 'maintain')
    const [meals] = useLocalStorage<DayMeals>(`nut_meals_${today()}`, {
        breakfast: [], lunch: [], snack: [], dinner: [],
    })

    const targets = calcTargets(weight, goal)
    const allEntries = [...meals.breakfast, ...meals.lunch, ...meals.snack, ...meals.dinner]
    const totalCal = allEntries.reduce((s, e) => s + e.cal, 0)
    const totalProtein = allEntries.reduce((s, e) => s + e.protein, 0)
    const totalFat = allEntries.reduce((s, e) => s + e.fat, 0)
    const totalCarbs = allEntries.reduce((s, e) => s + e.carbs, 0)

    const calPct = Math.min((totalCal / targets.calories) * 100, 100)

    const macros = [
        { label: "Б", value: Math.round(totalProtein), target: targets.protein, color: "#ef4444" },
        { label: "Ж", value: Math.round(totalFat), target: targets.fat, color: "#f59e0b" },
        { label: "У", value: Math.round(totalCarbs), target: targets.carbs, color: "#3b82f6" },
    ]

    return (
        <div className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 lg:col-span-1">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-c-emerald/10 sm:h-11 sm:w-11">
                        <Utensils className="h-5 w-5 text-c-emerald sm:h-6 sm:w-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Питание</h3>
                        <p className="text-[11px] text-muted-foreground">{allEntries.length} записей</p>
                    </div>
                </div>
            </div>

            {/* Calorie ring */}
            <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
                        <circle cx="50" cy="50" r="40" fill="none"
                            stroke={totalCal > targets.calories ? "#ef4444" : "#22c55e"}
                            strokeWidth="6" strokeLinecap="round"
                            strokeDasharray={`${calPct * 2.513} 251.3`}
                            className="transition-all duration-700"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Flame className="h-2.5 w-2.5 text-c-amber mb-0.5 sm:h-3 sm:w-3" />
                        <span className="text-base font-bold tabular-nums text-foreground sm:text-lg">{totalCal}</span>
                        <span className="text-[8px] text-muted-foreground sm:text-[9px]">/{targets.calories}</span>
                    </div>
                </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {macros.map(m => {
                    const pct = Math.min((m.value / m.target) * 100, 100)
                    return (
                        <div key={m.label} className="flex flex-col items-center gap-0.5 rounded-lg border border-border bg-secondary p-2 sm:gap-1 sm:p-2.5">
                            <span className="text-[11px] font-bold sm:text-xs" style={{ color: m.color }}>{m.value}г</span>
                            <div className="w-full h-1 overflow-hidden rounded-full bg-background sm:h-1.5">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: m.color }} />
                            </div>
                            <span className="text-[9px] text-muted-foreground sm:text-[10px]">{m.label} {m.target}г</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
