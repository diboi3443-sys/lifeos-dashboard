'use client';

// ═══════════════════════════════════════════
// NUTRITION DATA — Product Database & Formulas
// ═══════════════════════════════════════════

export interface Product {
    id: string;
    name: string;
    cal: number;   // kcal per 100g
    protein: number; // g per 100g
    fat: number;     // g per 100g
    carbs: number;   // g per 100g
    category: string;
}

export interface MealEntry {
    id: string;
    productId: string;
    productName: string;
    grams: number;
    cal: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface DayMeals {
    breakfast: MealEntry[];
    lunch: MealEntry[];
    snack: MealEntry[];
    dinner: MealEntry[];
}

export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export const MEAL_LABELS: Record<MealType, string> = {
    breakfast: 'Завтрак',
    lunch: 'Обед',
    snack: 'Перекус',
    dinner: 'Ужин',
};

export const MEAL_ICONS: Record<MealType, string> = {
    breakfast: '🌅',
    lunch: '☀️',
    snack: '🍎',
    dinner: '🌙',
};

// ── Goals ──
export type NutritionGoal = 'cut' | 'maintain' | 'bulk';

export const GOAL_LABELS: Record<NutritionGoal, string> = {
    cut: 'Похудение',
    maintain: 'Поддержание',
    bulk: 'Набор массы',
};

export const GOAL_COLORS: Record<NutritionGoal, string> = {
    cut: '#ef4444',
    maintain: '#3b82f6',
    bulk: '#22c55e',
};

// Calculate daily targets based on weight and goal
export function calcTargets(weightKg: number, goal: NutritionGoal) {
    // Mifflin-St Jeor simplified for males, activity factor 1.55
    const bmr = 10 * weightKg + 6.25 * 175 - 5 * 25 - 5; // rough average
    const tdee = Math.round(bmr * 1.55);

    const calMap: Record<NutritionGoal, number> = {
        cut: tdee - 500,
        maintain: tdee,
        bulk: tdee + 300,
    };

    const calories = calMap[goal];

    // Macros split
    const proteinG = Math.round(weightKg * (goal === 'bulk' ? 2.2 : goal === 'cut' ? 2.0 : 1.8));
    const fatG = Math.round((calories * 0.25) / 9);
    const carbsG = Math.round((calories - proteinG * 4 - fatG * 9) / 4);

    return { calories, protein: proteinG, fat: fatG, carbs: carbsG };
}

// ── Product Database (~50 items) ──
export const PRODUCTS: Product[] = [
    // Мясо & Рыба
    { id: 'chicken_breast', name: 'Куриная грудка', cal: 165, protein: 31, fat: 3.6, carbs: 0, category: 'Мясо' },
    { id: 'beef_lean', name: 'Говядина (нежирная)', cal: 187, protein: 26, fat: 9, carbs: 0, category: 'Мясо' },
    { id: 'turkey', name: 'Индейка', cal: 135, protein: 29, fat: 1.5, carbs: 0, category: 'Мясо' },
    { id: 'salmon', name: 'Лосось', cal: 208, protein: 20, fat: 13, carbs: 0, category: 'Рыба' },
    { id: 'tuna', name: 'Тунец (консервы)', cal: 116, protein: 25.5, fat: 1, carbs: 0, category: 'Рыба' },
    { id: 'eggs', name: 'Яйца (1 шт = 60г)', cal: 155, protein: 13, fat: 11, carbs: 1.1, category: 'Мясо' },

    // Молочка
    { id: 'cottage_cheese', name: 'Творог 5%', cal: 121, protein: 17, fat: 5, carbs: 1.8, category: 'Молочка' },
    { id: 'greek_yogurt', name: 'Йогурт греческий', cal: 73, protein: 10, fat: 0.7, carbs: 5, category: 'Молочка' },
    { id: 'milk', name: 'Молоко 2.5%', cal: 52, protein: 2.8, fat: 2.5, carbs: 4.7, category: 'Молочка' },
    { id: 'cheese', name: 'Сыр (твёрдый)', cal: 350, protein: 25, fat: 27, carbs: 0, category: 'Молочка' },
    { id: 'kefir', name: 'Кефир 1%', cal: 40, protein: 3, fat: 1, carbs: 4, category: 'Молочка' },

    // Крупы & Злаки
    { id: 'rice', name: 'Рис (варёный)', cal: 130, protein: 2.7, fat: 0.3, carbs: 28, category: 'Крупы' },
    { id: 'buckwheat', name: 'Гречка (варёная)', cal: 110, protein: 4.2, fat: 1.1, carbs: 21, category: 'Крупы' },
    { id: 'oats', name: 'Овсянка (сухая)', cal: 352, protein: 12.3, fat: 6.1, carbs: 59.5, category: 'Крупы' },
    { id: 'pasta', name: 'Макароны (варёные)', cal: 131, protein: 5, fat: 1.1, carbs: 25, category: 'Крупы' },
    { id: 'bread_dark', name: 'Хлеб чёрный', cal: 174, protein: 6.6, fat: 1.2, carbs: 33, category: 'Крупы' },
    { id: 'bread_white', name: 'Хлеб белый', cal: 265, protein: 9, fat: 3.2, carbs: 49, category: 'Крупы' },

    // Овощи
    { id: 'potato', name: 'Картофель (варёный)', cal: 86, protein: 2, fat: 0.1, carbs: 20, category: 'Овощи' },
    { id: 'tomato', name: 'Помидор', cal: 18, protein: 0.9, fat: 0.2, carbs: 3.9, category: 'Овощи' },
    { id: 'cucumber', name: 'Огурец', cal: 15, protein: 0.7, fat: 0.1, carbs: 3.6, category: 'Овощи' },
    { id: 'broccoli', name: 'Брокколи', cal: 34, protein: 2.8, fat: 0.4, carbs: 7, category: 'Овощи' },
    { id: 'carrot', name: 'Морковь', cal: 35, protein: 0.9, fat: 0.2, carbs: 6.9, category: 'Овощи' },
    { id: 'cabbage', name: 'Капуста', cal: 25, protein: 1.3, fat: 0.1, carbs: 5.8, category: 'Овощи' },
    { id: 'onion', name: 'Лук', cal: 40, protein: 1.1, fat: 0.1, carbs: 9.3, category: 'Овощи' },
    { id: 'pepper', name: 'Перец болгарский', cal: 27, protein: 1.3, fat: 0, carbs: 5.3, category: 'Овощи' },

    // Фрукты
    { id: 'banana', name: 'Банан', cal: 89, protein: 1.1, fat: 0.3, carbs: 23, category: 'Фрукты' },
    { id: 'apple', name: 'Яблоко', cal: 52, protein: 0.3, fat: 0.2, carbs: 14, category: 'Фрукты' },
    { id: 'orange', name: 'Апельсин', cal: 43, protein: 0.9, fat: 0.1, carbs: 8.3, category: 'Фрукты' },
    { id: 'strawberry', name: 'Клубника', cal: 32, protein: 0.7, fat: 0.3, carbs: 7.7, category: 'Фрукты' },

    // Орехи & Семена
    { id: 'almonds', name: 'Миндаль', cal: 579, protein: 21, fat: 50, carbs: 22, category: 'Орехи' },
    { id: 'walnuts', name: 'Грецкий орех', cal: 654, protein: 15, fat: 65, carbs: 14, category: 'Орехи' },
    { id: 'peanut_butter', name: 'Арахисовая паста', cal: 588, protein: 25, fat: 50, carbs: 20, category: 'Орехи' },

    // Масла & Соусы
    { id: 'olive_oil', name: 'Масло оливковое', cal: 884, protein: 0, fat: 100, carbs: 0, category: 'Масла' },
    { id: 'butter', name: 'Масло сливочное', cal: 717, protein: 0.9, fat: 81, carbs: 0.1, category: 'Масла' },

    // Бобовые
    { id: 'lentils', name: 'Чечевица (варёная)', cal: 116, protein: 9, fat: 0.4, carbs: 20, category: 'Бобовые' },
    { id: 'chickpeas', name: 'Нут (варёный)', cal: 164, protein: 8.9, fat: 2.6, carbs: 27, category: 'Бобовые' },

    // Напитки & Добавки
    { id: 'protein_shake', name: 'Протеин (порция 30г)', cal: 120, protein: 24, fat: 1.5, carbs: 3, category: 'Добавки' },
    { id: 'honey', name: 'Мёд', cal: 304, protein: 0.3, fat: 0, carbs: 82, category: 'Добавки' },

    // Фастфуд (для реалистичности)
    { id: 'pizza_slice', name: 'Пицца (1 кусок ~150г)', cal: 266, protein: 11, fat: 10, carbs: 33, category: 'Фастфуд' },
    { id: 'burger', name: 'Бургер (средний)', cal: 295, protein: 17, fat: 14, carbs: 24, category: 'Фастфуд' },
    { id: 'fries', name: 'Картошка фри', cal: 312, protein: 3.4, fat: 15, carbs: 41, category: 'Фастфуд' },
    { id: 'sushi_roll', name: 'Ролл (1 шт)', cal: 55, protein: 1.4, fat: 0.7, carbs: 10.5, category: 'Фастфуд' },

    // Сладкое
    { id: 'chocolate_dark', name: 'Шоколад тёмный', cal: 546, protein: 5, fat: 31, carbs: 60, category: 'Сладкое' },
    { id: 'ice_cream', name: 'Мороженое', cal: 207, protein: 3.5, fat: 11, carbs: 24, category: 'Сладкое' },

    // Напитки
    { id: 'coffee_milk', name: 'Кофе с молоком', cal: 30, protein: 1, fat: 1, carbs: 3, category: 'Напитки' },
    { id: 'juice_orange', name: 'Сок апельсиновый', cal: 45, protein: 0.7, fat: 0.2, carbs: 10, category: 'Напитки' },
    { id: 'cola', name: 'Кола', cal: 42, protein: 0, fat: 0, carbs: 10.6, category: 'Напитки' },
];

export const PRODUCT_CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];
