export interface DayTask {
    title: string;
    description: string;
    type: 'video' | 'article' | 'action' | 'reflection';
    durationMinutes?: number;
    points: number;
}

export interface DayData {
    day: number;
    title: string;
    focus: 'disc' | 'phys' | 'intel' | 'emo' | 'pub' | 'mixed';
    tasks: DayTask[];
}

export const PROGRAM_30_DAYS: DayData[] = [
    {
        day: 1,
        title: "Эффект Зейгарник (Или почему ты устал, ничего не делая)",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Твой мозг — это процессор, а не жесткий диск. Эффект Зейгарник сжирает энергию на удержание фоновых задач. Механика: Сбрось кэш. Открой «Входящие» и выгрузи всё, что в голове.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Запиши минимум 15 задач во «Входящие». Почувствуй, как черепная коробка перестает гудеть.', durationMinutes: 10, points: 20 }
        ]
    },
    {
        day: 2,
        title: "Биохакинг для бедных (База)",
        focus: "phys",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Дисциплина не работает, если ты физически кусок мяса без энергии. Механика: Вода с утра для запуска лимфы и отбой до полуночи.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Отметь в трекере: стакан воды с утра и сон до 00:00. Не усложняй, просто сделай.', durationMinutes: 5, points: 15 }
        ]
    },
    {
        day: 3,
        title: "Финансовое вскрытие",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Деньги ненавидят творческий хаос. Механика: Инвентаризация. Фиксируем точку А, собираем все балансы в кучу.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Внеси все свои текущие балансы в модуль «Финансы». Посмотри правде в глаза.', durationMinutes: 15, points: 20 }
        ]
    },
    {
        day: 4,
        title: "Правило 2-х минут (Убиваем паразитов)",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Задачи-паразиты сжирают время и вызывают панику. Механика: Если действие занимает меньше 2-х минут — делай сразу, не записывай.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Зайди во «Входящие», найди 3 задачи на пару минут и уничтожь их. Нажми «Выполнено».', durationMinutes: 10, points: 15 }
        ]
    },
    {
        day: 5,
        title: "Детокс дофамина",
        focus: "emo",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Дешевый утренний кайф от рилсов лишает мотивации для реальных дел. Механика: Первый час после пробуждения — режим «в танке».', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Проведи час без телефона. Подтверди выполнение галочкой.', durationMinutes: 60, points: 30 }
        ]
    },
    {
        day: 6,
        title: "Трекинг в 3 секунды",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Осознанность вместо жадности. Понимание реальной стоимости лайфстайла. Механика: Делай учет на автомате за 3 секунды, иначе бросишь.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Внеси все расходы за вчерашний день в приложение.', durationMinutes: 5, points: 15 }
        ]
    },
    {
        day: 7,
        title: "Пустота",
        focus: "emo",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Жизнь на пределе ведет к выгоранию. Дисциплина — это и умение отпустить вожжи. Механика: Базовые настройки работают, остальное побоку.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Задач на сегодня нет. Иди поплавай, сходи на массаж или просто поплюй в потолок.', points: 50 }
        ]
    },
    {
        day: 8,
        title: "ЭТАП 2: Раскладываем по полочкам",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Инбокс похож на захламленный балкон. Механика: Создай 3 базовых проекта (например: Бабки/Бизнес, Здоровье/Тело, Бытовуха).', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Создай 3 проекта и раскидай по ним 10 задач из Входящих.', durationMinutes: 15, points: 20 }
        ]
    },
    {
        day: 9,
        title: "Завтрак из жабы",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Съешь с утра живую жабу, и ничего хуже за день не случится. Механика: Сделай самое ублюдское дело до 12:00 на полном баке силы воли.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Выбери одну задачу, поставь ей тег «Приоритет» и закрой её.', durationMinutes: 30, points: 30 }
        ]
    },
    {
        day: 10,
        title: "Кладбище гениальных идей",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Гениальные идеи отвлекают от того, что приносит кэш. Механика: Создай проект «Когда-нибудь» как буфер обмена для спасения фокуса.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Слей 5 «гениальных» идей из Входящих в папку «Когда-нибудь».', durationMinutes: 10, points: 15 }
        ]
    },
    {
        day: 11,
        title: "Zero Inbox (Пустота)",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Пустые «Входящие» в конце дня. Механика: Инбокс — транзитная зона. Если висит > 3 дней, удали или перенеси.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Разбери Инбокс до нуля. Раскидай всё по проектам или просто удали нахрен.', durationMinutes: 20, points: 25 }
        ]
    },
    {
        day: 12,
        title: "Воровство у завтрашнего дня",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Проснуться без плана — проиграть день. Механика: Завтра начинается сегодня вечером. Удели 3 минуты перед сном на план.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Запиши 3 главные задачи на завтра.', durationMinutes: 5, points: 15 }
        ]
    },
    {
        day: 13,
        title: "Поиск дыр в бюджете",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Деньги утекают на забытые подписки. Механика: Отрезаем паразитов, а не экономим на кофе.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Зайди в банковское приложение и отмени минимум 1 ненужную подписку. Купи на эти деньги нормальный стейк.', durationMinutes: 10, points: 20 }
        ]
    },
    {
        day: 14,
        title: "Чек-поинт",
        focus: "mixed",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: 2 недели в системе. Время оглянуться. Механика: Раз в неделю смотреть на цифры и быть честным с собой.', durationMinutes: 5, points: 10 },
            { type: 'reflection', title: 'Действие', description: 'Запиши итоги недели: что было топ, а что полный провал.', durationMinutes: 15, points: 20 }
        ]
    },
    {
        day: 15,
        title: "ЭТАП 3: Время — это блоки",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Список задач — фантазия, календарь — реальность. Механика: Бронируй время под важную задачу как встречу с инвестором.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Выдели в календаре жесткий блок (1-2 часа) на одну задачу.', durationMinutes: 60, points: 30 }
        ]
    },
    {
        day: 16,
        title: "Смазка для мозгов",
        focus: "phys",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Мозг тупит от нехватки кислорода. Механика: Разогнать кровь любым спортом, чтобы родить новые идеи.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Засеки 30 минут любой физической активности.', durationMinutes: 30, points: 25 }
        ]
    },
    {
        day: 17,
        title: "Хардкор на 50 минут",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Фокус дольше одного рилса делает тебя опасным. Механика: Помодоро для взрослых. 50 минут без единого отвлечения.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Отработай один спринт на 50 минут без единого разрыва фокуса.', durationMinutes: 50, points: 40 }
        ]
    },
    {
        day: 18,
        title: "Искусство посылать нахер",
        focus: "emo",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Продуктивность — это умение сказать «нет» 99 делам ради 1 важного. Механика: Признай поражение по висяку и удали.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Найди висяк (задачу, которую переносишь месяц) и безжалостно удали. Почувствуй облегчение.', durationMinutes: 5, points: 20 }
        ]
    },
    {
        day: 19,
        title: "Деньги проектов (Тизер)",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Бюджет идей не должен пересекаться с выживанием. Механика: Мухи отдельно, котлеты отдельно.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Попробуй создать отдельный счет или категорию для инвестиций в свои проекты.', durationMinutes: 15, points: 20 }
        ]
    },
    {
        day: 20,
        title: "Пусть вкалывают роботы",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Твоя задача — быть архитектором, а не чернорабочим. Механика: Передай тексты, код, анализ нейронкам.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Делегируй одну свою рутинную задачу любой нейросети.', durationMinutes: 10, points: 25 }
        ]
    },
    {
        day: 21,
        title: "Первая медаль",
        focus: "emo",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: 3 недели. Нейронные связи проросли. То, что казалось насилием, стало рутиной.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Забери свою первую внутриигровую ачивку. Ты выжил.', points: 50 }
        ]
    },
    {
        day: 22,
        title: "ЭТАП 4: Тебе тесно",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Базовые проекты — песочница. Для масштаба нужно перейти на новый уровень управления.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Нажми «Добавить 4-й проект» и встреться с мягким пэйволом полной версии.', durationMinutes: 5, points: 15 }
        ]
    },
    {
        day: 23,
        title: "Цифровая уборка",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Грязный рабочий стол = хаос в мыслях. Механика: Окружение диктует состояние.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Наведи жесткий порядок на рабочем столе ноута и очисти папку «Загрузки».', durationMinutes: 20, points: 25 }
        ]
    },
    {
        day: 24,
        title: "Обновление прошивки",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Не учишься — деградируешь. Мир летит вперед.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Потрать 30 минут на изучение нового куска кода, фишки в ИИ или инструмента для бизнеса.', durationMinutes: 30, points: 30 }
        ]
    },
    {
        day: 25,
        title: "Усложняем игру",
        focus: "phys",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: База усвоена. Пора брать вес потяжелее.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Добавь в трекер новую хардкорную привычку (медитация 20 мин, чтение сложно литературы на English и т.д.).', durationMinutes: 5, points: 20 }
        ]
    },
    {
        day: 26,
        title: "Not-To-Do List",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Важно то, чего ты НЕ делаешь. Механика: Ограничить воров энергии.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Составь список из 3 вещей «Что НЕ делать» (например, без сахара после 18:00) и продержись по нему сегодня.', points: 30 }
        ]
    },
    {
        day: 27,
        title: "Прицел на месяц",
        focus: "intel",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Хватит барахтаться в микро-задачах. Большие проекты делаются мощными рывками.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Выбери 1 ГЛАВНУЮ цель, которую нужно закрыть в след. 30 дней, чтобы месяц считался успешным.', durationMinutes: 15, points: 25 }
        ]
    },
    {
        day: 28,
        title: "Видение 540 дней",
        focus: "mixed",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Дисциплина без цели — депрессия. Зачем система? Куда идешь через 18 месяцев?', durationMinutes: 5, points: 10 },
            { type: 'reflection', title: 'Действие', description: 'Напиши мини-эссе на пару абзацев про свой идеальный день через 1.5 года (540 дней).', durationMinutes: 20, points: 30 }
        ]
    },
    {
        day: 29,
        title: "Предстартовый отсчет",
        focus: "disc",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Финал базовой тренировки. Проверка снаряжения перед выходом в реал.', durationMinutes: 5, points: 10 },
            { type: 'action', title: 'Действие', description: 'Занули Инбокс. Отметь все галочки трекера на сегодня. Приготовься к переходу.', durationMinutes: 15, points: 25 }
        ]
    },
    {
        day: 30,
        title: "Выбор таблетки (Финал)",
        focus: "emo",
        tasks: [
            { type: 'article', title: 'Теория и Механика', description: 'Концепт: Тестовый период завершен. Хаос ушел. Впереди марафон на 18 месяцев. Либо откат, либо вход в полную версию Life OS.', durationMinutes: 10, points: 20 },
            { type: 'action', title: 'Действие', description: 'Нажми кнопку «Вступить в PRAXIS / Начать 540 дней». Разблокируй полный функционал.', durationMinutes: 5, points: 100 }
        ]
    }
];
