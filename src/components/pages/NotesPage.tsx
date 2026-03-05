'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage } from '@/lib/storage';

const BOOKS = [
    'Атомные привычки', 'Как завоёвывать друзей', 'Думай медленно, решай быстро',
    '12 правил жизни', 'Сила воли', 'Монах, который продал свой «Феррари»',
    'Искусство войны', 'Поток', '7 навыков',
];

const NOTE_TYPES = [
    { id: 'quote', label: '💬 Цитата', color: '#3b82f6' },
    { id: 'thought', label: '💭 Мысль', color: '#8b5cf6' },
    { id: 'insight', label: '💡 Инсайт', color: '#f59e0b' },
    { id: 'principle', label: '⚡ Принцип', color: '#ef4444' },
];

interface Note {
    id: string;
    book: string;
    type: string;
    text: string;
    page: string;
    comment: string;
    community: boolean;
    date: string;
}

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50';

export default function NotesPage() {
    const [notes, setNotes] = useLocalStorage<Note[]>('notes_list', []);
    const [book, setBook] = useState('');
    const [type, setType] = useState('quote');
    const [text, setText] = useState('');
    const [page, setPage] = useState('');
    const [comment, setComment] = useState('');
    const [community, setCommunity] = useState(false);

    const [search, setSearch] = useState('');
    const [filterBook, setFilterBook] = useState('');
    const [filterType, setFilterType] = useState('');

    const save = () => {
        if (!text.trim()) return;
        const note: Note = {
            id: Date.now().toString(),
            book, type, text, page, comment, community,
            date: new Date().toISOString().split('T')[0],
        };
        setNotes(p => [note, ...p]);
        setText(''); setPage(''); setComment(''); setCommunity(false);
    };

    const remove = (id: string) => setNotes(p => p.filter(n => n.id !== id));

    const filtered = useMemo(() => {
        return notes.filter(n => {
            if (filterBook && n.book !== filterBook) return false;
            if (filterType && n.type !== filterType) return false;
            if (search && !n.text.toLowerCase().includes(search.toLowerCase()) && !n.comment.toLowerCase().includes(search.toLowerCase())) return false;
            return true;
        });
    }, [notes, filterBook, filterType, search]);

    const stats = useMemo(() => {
        const byType: Record<string, number> = {};
        const byBook: Record<string, number> = {};
        notes.forEach(n => {
            byType[n.type] = (byType[n.type] || 0) + 1;
            if (n.book) byBook[n.book] = (byBook[n.book] || 0) + 1;
        });
        return { total: notes.length, community: notes.filter(n => n.community).length, byType, byBook };
    }, [notes]);

    const copyExport = () => {
        const communityNotes = notes.filter(n => n.community);
        const text = communityNotes.map(n =>
            `[${n.type.toUpperCase()}] ${n.book ? `📚 ${n.book}` : ''}\n${n.text}${n.comment ? `\n💭 ${n.comment}` : ''}\n`
        ).join('\n---\n');
        navigator.clipboard.writeText(text);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="text-2xl font-black mb-6">
                📝 <span className="gradient-text">Заметки</span>
            </h1>

            <div className="grid grid-cols-2 gap-6">
                {/* LEFT: New Note */}
                <div className="space-y-4">
                    <GlassCard>
                        <h3 className="text-lg font-bold mb-4">Новая заметка</h3>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-white/40 block mb-1">Книга</label>
                                <select value={book} onChange={e => setBook(e.target.value)} className={inputClass}>
                                    <option value="">— Выбери книгу —</option>
                                    {BOOKS.map(b => <option key={b}>{b}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-white/40 block mb-1">Тип записи</label>
                                <div className="flex gap-2">
                                    {NOTE_TYPES.map(t => (
                                        <button key={t.id}
                                            onClick={() => setType(t.id)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                            style={{
                                                background: type === t.id ? `${t.color}25` : 'rgba(255,255,255,0.03)',
                                                color: type === t.id ? t.color : 'rgba(255,255,255,0.4)',
                                                border: `1px solid ${type === t.id ? `${t.color}40` : 'rgba(255,255,255,0.06)'}`,
                                            }}>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-white/40 block mb-1">
                                    {type === 'quote' ? 'Цитата (дословно)' : type === 'thought' ? 'Мысль' : type === 'insight' ? 'Инсайт' : 'Принцип'}
                                </label>
                                <textarea value={text} onChange={e => setText(e.target.value)}
                                    rows={4} placeholder="Введи текст..." className={inputClass} style={{ resize: 'none' }} />
                            </div>

                            <div>
                                <label className="text-xs text-white/40 block mb-1">Страница (опц.)</label>
                                <input value={page} onChange={e => setPage(e.target.value)} placeholder="47" className={inputClass} />
                            </div>

                            <div>
                                <label className="text-xs text-white/40 block mb-1">Личная мысль / применение</label>
                                <textarea value={comment} onChange={e => setComment(e.target.value)}
                                    rows={2} placeholder="Как это применю к себе?" className={inputClass} style={{ resize: 'none' }} />
                            </div>

                            <label className="flex items-center gap-3 p-3 rounded-lg border border-white/5 cursor-pointer hover:bg-white/[0.02]">
                                <input type="checkbox" checked={community} onChange={e => setCommunity(e.target.checked)}
                                    className="w-4 h-4 accent-blue-500" />
                                <div>
                                    <div className="text-sm font-medium">📤 В базу комьюнити</div>
                                    <div className="text-xs text-white/30">Войдёт в экспорт для будущего комьюнити</div>
                                </div>
                            </label>

                            <div className="flex gap-2">
                                <button onClick={save} className="flex-1 py-2 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                    style={{ background: 'var(--gradient-primary)' }}>
                                    <Save className="w-5 h-5" />
                                    <span>Сохранить заметку</span>
                                </button>
                                <button onClick={() => { setText(''); setPage(''); setComment(''); }}
                                    className="px-4 py-2.5 rounded-lg text-sm text-white/40 border border-white/10 hover:bg-white/5">
                                    Очистить
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Stats */}
                    <GlassCard>
                        <h4 className="text-sm font-semibold text-white/50 mb-3">📊 Статистика заметок</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 rounded-lg bg-white/[0.03] text-center">
                                <div className="text-xl font-bold">{stats.total}</div>
                                <div className="text-xs text-white/30">Всего</div>
                            </div>
                            <div className="p-2 rounded-lg bg-white/[0.03] text-center">
                                <div className="text-xl font-bold text-blue-400">{stats.community}</div>
                                <div className="text-xs text-white/30">Для комьюнити</div>
                            </div>
                            {NOTE_TYPES.map(t => (
                                <div key={t.id} className="p-2 rounded-lg bg-white/[0.03] text-center">
                                    <div className="text-lg font-bold" style={{ color: t.color }}>{stats.byType[t.id] || 0}</div>
                                    <div className="text-xs text-white/30">{t.label}</div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* RIGHT: List */}
                <GlassCard>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">
                            Все заметки <span className="text-white/30 text-sm font-normal">({filtered.length})</span>
                        </h3>
                        <button onClick={copyExport}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-white/5 text-white/40 hover:text-white/60">
                            📋 Экспорт
                        </button>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-xs">🔍</span>
                            <input value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Поиск..." className={inputClass + ' !pl-8'} />
                        </div>
                        <select value={filterBook} onChange={e => setFilterBook(e.target.value)} className={inputClass + ' !w-auto'}>
                            <option value="">Все книги</option>
                            {BOOKS.map(b => <option key={b}>{b}</option>)}
                        </select>
                        <select value={filterType} onChange={e => setFilterType(e.target.value)} className={inputClass + ' !w-auto'}>
                            <option value="">Все типы</option>
                            {NOTE_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                        {filtered.length === 0 ? (
                            <p className="text-white/20 text-center py-8 text-sm">Нет заметок</p>
                        ) : (
                            filtered.map(note => {
                                const typeInfo = NOTE_TYPES.find(t => t.id === note.type) || NOTE_TYPES[0];
                                return (
                                    <motion.div key={note.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-3 rounded-lg border border-white/5 hover:border-white/10"
                                        style={{ background: 'rgba(255,255,255,0.02)' }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-0.5 rounded"
                                                    style={{ background: `${typeInfo.color}20`, color: typeInfo.color }}>
                                                    {typeInfo.label}
                                                </span>
                                                {note.book && <span className="text-xs text-white/30">📚 {note.book}</span>}
                                                {note.community && <span className="text-xs text-blue-400">📤</span>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-white/20">{note.date}</span>
                                                <button onClick={() => remove(note.id)}
                                                    className="p-1 rounded hover:bg-red-500/20 text-white/20 hover:text-red-400 text-xs font-bold">
                                                    DEL
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-white/70 mb-1">{note.text}</p>
                                        {note.comment && <p className="text-xs text-white/40 italic">💭 {note.comment}</p>}
                                        {note.page && <p className="text-xs text-white/20 mt-1">стр. {note.page}</p>}
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </GlassCard>
            </div>
        </motion.div>
    );
}
