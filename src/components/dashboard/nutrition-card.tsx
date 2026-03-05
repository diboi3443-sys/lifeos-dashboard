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
        <div className="flex flex-col rounded-2xl border border-border bg-card p-5 lg:col-span-1">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-c-emerald/10">
                        <Utensils className="h-4 w-4 text-c-emerald" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Питание</h3>
                        <p className="text-xs text-muted-foreground">{allEntries.length} записей</p>
                    </div>
                </div>
            </div>

            {/* Calorie ring */}
            <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
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
                        <Flame className="h-3 w-3 text-c-amber mb-0.5" />
                        <span className="text-lg font-bold tabular-nums">{totalCal}</span>
                        <span className="text-[9px] text-muted-foreground">/{targets.calories}</span>
                    </div>
                </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-2">
                {macros.map(m => {
                    const pct = Math.min((m.value / m.target) * 100, 100)
                    return (
                        <div key={m.label} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary p-2.5">
                            <span className="text-xs font-bold" style={{ color: m.color }}>{m.value}г</span>
                            <div className="w-full h-1.5 overflow-hidden rounded-full bg-background">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: m.color }} />
                            </div>
                            <span className="text-[10px] text-muted-foreground">{m.label} {m.target}г</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
