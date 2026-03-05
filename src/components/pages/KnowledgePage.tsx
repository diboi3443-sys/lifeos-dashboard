'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';

const KB_SECTIONS = [
    { id: 'phases', emoji: '🗺️', label: 'Фазы 18 месяцев', group: 'Разделы' },
    { id: 'books', emoji: '📕', label: 'Книги (9 книг)', group: 'Разделы' },
    { id: 'training', emoji: '🏋️', label: 'Физический протокол', group: 'Разделы' },
    { id: 'speech', emoji: '🎙️', label: 'Харизма и речь', group: 'Разделы' },
    { id: 'codex', emoji: '⚔️', label: 'Философский кодекс', group: 'Разделы' },
    { id: 'actions', emoji: '⚡', label: 'Система действий', group: 'Разделы' },
    { id: 'howtoread', emoji: '📖', label: 'Как читать книги', group: 'Методология' },
    { id: 'habits', emoji: '🔄', label: 'Привычки: наука', group: 'Методология' },
];

const KB_CONTENT: Record<string, { title: string; sub: string; content: React.ReactNode }> = {
    phases: {
        title: 'Архитектура 18 месяцев',
        sub: 'Три фазы с чёткими целями, метриками и критериями перехода',
        content: (
            <div className="space-y-4">
                <div className="p-4 rounded-xl border border-red-500/20" style={{ background: 'rgba(239,68,68,0.05)' }}>
                    <h4 className="font-bold text-red-400 mb-1">ФАЗА 1 — ФУНДАМЕНТ ДИСЦИПЛИНЫ</h4>
                    <p className="text-xs text-white/40 mb-3">Месяцы 1–3 · 90 дней без пропуска</p>
                    <p className="text-sm text-white/60 mb-2"><b>Цель:</b> Создать каркас привычек. Доказать себе способность следовать системе.</p>
                    <div className="text-xs text-white/40 space-y-1">
                        <p>• Подъём 5:00 каждый день</p>
                        <p>• Холодный душ ежедневно</p>
                        <p>• Тренировки 5×/неделю</p>
                        <p>• Чтение 30 мин/день</p>
                        <p>• Журнал каждый вечер</p>
                        <p>• Финансовый контроль</p>
                    </div>
                    <p className="text-xs text-green-400/80 mt-3 flex items-center gap-1">
                        ✅ Критерий перехода: 85%+ привычек, 0 срывов streak
                    </p>
                </div>
                <div className="p-4 rounded-xl border border-blue-500/20" style={{ background: 'rgba(59,130,246,0.05)' }}>
                    <h4 className="font-bold text-blue-400 mb-1">ФАЗА 2 — РОСТ И МАСТЕРСТВО</h4>
                    <p className="text-xs text-white/40 mb-3">Месяцы 4–9 · Шесть месяцев углубления</p>
                    <p className="text-sm text-white/60 mb-2"><b>Цель:</b> Углубить каждое направление. Начать видеть реальные результаты.</p>
                    <div className="text-xs text-white/40 space-y-1">
                        <p>• Deep Work 4ч/день</p>
                        <p>• Силовые прогрессии</p>
                        <p>• 2 книги/месяц минимум</p>
                        <p>• Навык публичных выступлений</p>
                        <p>• Финансовая подушка 3 мес.</p>
                    </div>
                    <p className="text-xs text-green-400/80 mt-3 flex items-center gap-1">
                        ✅ Критерий: средний балл 7+, все максимумы растут
                    </p>
                </div>
                <div className="p-4 rounded-xl border border-yellow-500/20" style={{ background: 'rgba(234,179,8,0.05)' }}>
                    <h4 className="font-bold text-yellow-400 mb-1">ФАЗА 3 — ТРАНСФОРМАЦИЯ</h4>
                    <p className="text-xs text-white/40 mb-3">Месяцы 10–18 · Девять месяцев интеграции</p>
                    <p className="text-sm text-white/60 mb-2"><b>Цель:</b> Интегрировать все навыки в единую систему. Стать лучшей версией.</p>
                    <div className="text-xs text-white/40 space-y-1">
                        <p>• Ментор / учить других</p>
                        <p>• Продвинутые тренировки</p>
                        <p>• Инвестиции и пассивный доход</p>
                        <p>• Создание контента</p>
                        <p>• Лидерство</p>
                    </div>
                    <p className="text-xs text-green-400/80 mt-3 flex items-center gap-1">
                        ✅ Итог: средний балл 8.5+, все цели достигнуты
                    </p>
                </div>
            </div>
        ),
    },
    books: {
        title: '9 Обязательных книг',
        sub: 'Одна книга на каждые два месяца. Активное чтение с заметками.',
        content: (
            <div className="space-y-2">
                {[
                    { n: 1, title: 'Атомные привычки — Дж. Клир', desc: 'Система маленьких изменений. Как 1% в день = трансформация за год.' },
                    { n: 2, title: 'Как завоёвывать друзей — Д. Карнеги', desc: 'Навыки общения, эмпатии, влияния. Основа харизмы.' },
                    { n: 3, title: 'Думай медленно, решай быстро — Д. Канеман', desc: 'Когнитивные искажения. Как мозг нас обманывает.' },
                    { n: 4, title: '12 правил жизни — Дж. Питерсон', desc: 'Порядок из хаоса. Ответственность. Смысл.' },
                    { n: 5, title: 'Сила воли — К. Макгонигал', desc: 'Наука самоконтроля. Как не сдаваться.' },
                    { n: 6, title: 'Монах, который продал свой «Феррари»', desc: 'Притча о приоритетах, дисциплине и внутреннем мире.' },
                    { n: 7, title: 'Искусство войны — Сунь-Цзы', desc: 'Стратегическое мышление. Применимо к жизни.' },
                    { n: 8, title: 'Поток — М. Чиксентмихайи', desc: 'Наука о состоянии потока и оптимальном опыте.' },
                    { n: 9, title: '7 навыков — С. Кови', desc: 'Проактивность, приоритеты, синергия.' },
                ].map(b => (
                    <div key={b.n} className="flex gap-3 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                            style={{ background: 'var(--gradient-primary)' }}>{b.n}</div>
                        <div>
                            <div className="text-sm font-medium text-white/80">{b.title}</div>
                            <div className="text-xs text-white/40">{b.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    training: {
        title: 'Физический протокол',
        sub: 'Прогрессивная программа от новичка до атлета',
        content: (
            <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h4 className="font-bold text-green-400 mb-2">Недельный сплит</h4>
                    <div className="text-sm text-white/60 space-y-1">
                        <p>Пн — Силовая А (Верх): жим, тяга, плечи</p>
                        <p>Вт — Кардио + Core (30 мин)</p>
                        <p>Ср — Силовая Б (Низ): присед, RDL, икры</p>
                        <p>Чт — Восстановление / растяжка</p>
                        <p>Пт — Силовая В (Full body)</p>
                        <p>Сб — Функциональная / спорт</p>
                        <p>Вс — Отдых</p>
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h4 className="font-bold text-blue-400 mb-2">Прогрессия</h4>
                    <p className="text-sm text-white/60">Каждые 2 недели +2.5кг к рабочему весу. Ведём журнал. Тестируем 1RM каждые 3 месяца.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h4 className="font-bold text-yellow-400 mb-2">Питание</h4>
                    <p className="text-sm text-white/60">Белок 2г/кг, без сахара, 2л воды минимум, витамины D3+K2+Omega3+Mg.</p>
                </div>
            </div>
        ),
    },
    speech: {
        title: 'Харизма и речь',
        sub: 'Система развития коммуникативных навыков',
        content: (
            <div className="space-y-3">
                {[
                    { emoji: '🎯', t: 'Ежедневно', items: ['Осознанный контакт глаз', 'Контроль скорости речи', 'Паузы вместо «э-э»', 'Комплименты (мин. 1 в день)'] },
                    { emoji: '📅', t: 'Еженедельно', items: ['Запись голоса и анализ', 'Публичное выступление / тост', 'Новый разговор с незнакомцем'] },
                    { emoji: '🎓', t: 'Навыки', items: ['Сторителлинг', 'Активное слушание', 'Юмор', 'Убеждение без давления', 'Язык тела'] },
                ].map(s => (
                    <div key={s.t} className="p-3 rounded-lg border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <h4 className="text-sm font-bold text-white/70 mb-2 flex items-center gap-2">
                            <span className="text-blue-400">{s.emoji}</span> {s.t}
                        </h4>
                        {s.items.map(i => <p key={i} className="text-xs text-white/40">• {i}</p>)}
                    </div>
                ))}
            </div>
        ),
    },
    codex: {
        title: 'Философский кодекс',
        sub: 'Принципы, по которым ты живёшь',
        content: (
            <div className="space-y-3">
                {[
                    '1. Дисциплина побеждает мотивацию. Каждый. День.',
                    '2. Ты — среднее пяти людей вокруг. Выбирай окружение.',
                    '3. Тело — храм. Без здоровья нет ничего.',
                    '4. Деньги — инструмент свободы, а не цель.',
                    '5. Учись каждый день. Стагнация = смерть.',
                    '6. Говори правду. Даже когда сложно.',
                    '7. Держи слово. Даже данное себе.',
                    '8. Не жалуйся. Действуй или прими.',
                    '9. Помогай другим расти. Лидерство через пример.',
                    '10. Измеряй всё. Что измеряешь — тем управляешь.',
                ].map((p, i) => (
                    <div key={i} className="p-3 rounded-lg border border-white/5 text-sm text-white/70"
                        style={{ background: 'rgba(255,255,255,0.02)' }}>
                        {p}
                    </div>
                ))}
            </div>
        ),
    },
    actions: {
        title: 'Система действий',
        sub: 'Конкретные ежедневные протоколы',
        content: (
            <div className="space-y-3">
                {[
                    { emoji: '⏰', t: 'Утренний блок (5:00–8:00)', items: ['5:00 — подъём, стакан воды', '5:10 — холодный душ', '5:20 — медитация 10 мин', '5:30 — журнал: цели дня', '5:45 — тренировка 60 мин', '7:00 — завтрак белковый', '7:30 — чтение 30 мин'] },
                    { emoji: '🧠', t: 'Рабочий блок (8:00–12:00)', items: ['Deep Work, без отвлечений', 'Pomodoro 50/10', 'Телефон в другой комнате'] },
                    { emoji: '🌙', t: 'Вечерний блок (20:00–22:30)', items: ['Журнал: провал + инсайт', 'Подготовка на завтра', 'Чтение или подкаст', 'Сон до 22:30'] },
                ].map(s => (
                    <div key={s.t} className="p-3 rounded-lg border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <h4 className="text-sm font-bold text-white/70 mb-2 flex items-center gap-2">
                            <span className="text-purple-400">{s.emoji}</span> {s.t}
                        </h4>
                        {s.items.map(i => <p key={i} className="text-xs text-white/40">• {i}</p>)}
                    </div>
                ))}
            </div>
        ),
    },
    howtoread: {
        title: 'Как читать книги',
        sub: 'Метод активного чтения для максимального усвоения',
        content: (
            <div className="space-y-3">
                {[
                    { n: '1', t: 'Предварительный обзор', d: 'Прочитай оглавление, введение, заключение. Пойми структуру книги.' },
                    { n: '2', t: 'Активное чтение', d: 'Подчёркивай. Записывай цитаты. Спорь с автором. Никогда не читай пассивно.' },
                    { n: '3', t: 'Заметки', d: 'После каждой главы — 3 ключевых мысли в заметки. Тип: цитата, мысль, инсайт или принцип.' },
                    { n: '4', t: 'Применение', d: 'Для каждого инсайта — конкретное действие. Как я применю это ЗАВТРА?' },
                    { n: '5', t: 'Обзор', d: 'После книги — итоговая заметка: 5 главных идей + план действий.' },
                ].map(s => (
                    <div key={s.n} className="flex gap-3 p-3 rounded-lg border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                            style={{ background: 'var(--gradient-primary)' }}>{s.n}</div>
                        <div>
                            <div className="text-sm font-medium text-white/70">{s.t}</div>
                            <div className="text-xs text-white/40">{s.d}</div>
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    habits: {
        title: 'Привычки: наука',
        sub: 'Научные основы формирования привычек',
        content: (
            <div className="space-y-3">
                {[
                    { emoji: '🔄', t: 'Петля привычки', d: 'Сигнал → Желание → Действие → Награда. Измени один элемент = измени привычку.' },
                    { emoji: '📈', t: 'Правило 1%', d: 'Улучшение на 1% в день = 37x за год. Не пытайся стать идеальным сразу.' },
                    { emoji: '⛏️', t: 'Стекирование', d: 'Привяжи новую привычку к существующей: «После [текущая привычка] я [новая привычка]».' },
                    { emoji: '🎯', t: 'Закон минимального усилия', d: 'Сделай привычку ЛЕГКОЙ начать. 2 минуты вместо 2 часов.' },
                    { emoji: '🏆', t: 'Идентичность', d: 'Цель не «читать книги», а «стать человеком, который читает». Измени идентичность.' },
                    { emoji: '📊', t: 'Трекинг', d: 'Отмечай привычки каждый день. Визуальный прогресс = мощная мотивация.' },
                    { emoji: '⚠️', t: 'Правило 2 дней', d: 'Никогда не пропускай 2 дня подряд. 1 пропуск — случайность, 2 — новая привычка.' },
                ].map(s => (
                    <div key={s.t} className="p-3 rounded-lg border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <h4 className="text-sm font-bold text-white/70 flex items-center gap-2">
                            <span className="text-green-400">{s.emoji}</span> {s.t}
                        </h4>
                        <p className="text-xs text-white/40 mt-1">{s.d}</p>
                    </div>
                ))}
            </div>
        ),
    },
};

export default function KnowledgePage() {
    const [activeSection, setActiveSection] = useState('phases');
    const section = KB_CONTENT[activeSection];
    const groups = [...new Set(KB_SECTIONS.map(s => s.group))];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="text-2xl font-black mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <img src="/icons/Knowledge (Sidebar Icon).jpg" alt="Knowledge" className="w-full h-full object-cover transform scale-125" />
                </div>
                <span className="gradient-text">База знаний</span>
            </h1>

            <div className="flex gap-6">
                {/* Sidebar */}
                <div className="w-56 shrink-0">
                    <GlassCard className="sticky top-6">
                        {groups.map(group => (
                            <div key={group} className="mb-4">
                                <h4 className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-2">{group}</h4>
                                <div className="space-y-1">
                                    {KB_SECTIONS.filter(s => s.group === group).map(s => (
                                        <button key={s.id}
                                            onClick={() => setActiveSection(s.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2
                                                ${activeSection === s.id
                                                    ? 'text-white bg-blue-500/10 border border-blue-500/20'
                                                    : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03] border border-transparent'
                                                }`}
                                        >
                                            <span>{s.emoji}</span> {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </GlassCard>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GlassCard>
                                <h2 className="text-xl font-bold mb-1">{section.title}</h2>
                                <p className="text-sm text-white/40 mb-6">{section.sub}</p>
                                {section.content}
                            </GlassCard>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
