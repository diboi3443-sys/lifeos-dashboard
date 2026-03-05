'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Clock, Eye, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useLocalStorage } from '@/lib/storage';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20 },
};

type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

interface Tag {
    id: string;
    label: string;
    color: string;
}

interface ProjectTask {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    tags: Tag[];
    deadline?: string;
    createdAt: number;
}

const DEFAULT_TASKS: ProjectTask[] = [
    {
        id: 't1',
        title: 'Подготовить материалы для презентации',
        description: 'Собрать все данные за месяц по маркетингу и сделать 10 слайдов для инвесторов.',
        status: 'to-do' as any, // 'todo' is the correct status but let's conform to default structure or migrate
        tags: [{ id: 'tag1', label: 'Срочно', color: 'bg-red-500/20 text-red-400 border-red-500/30' }],
        createdAt: Date.now(),
    },
    {
        id: 't2',
        title: 'Изучить Framer Motion',
        description: 'Пройти туториал на egghead.io и попробовать сделать 2 анимации.',
        status: 'in-progress',
        tags: [{ id: 'tag2', label: 'Обучение', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }],
        createdAt: Date.now(),
    },
    {
        id: 't3',
        title: 'Дизайн нового лендинга',
        description: 'Основная версия готова, нужно чтобы арт-дир посмотрел отступы.',
        status: 'review',
        tags: [{ id: 'tag3', label: 'Дизайн', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }],
        createdAt: Date.now(),
    },
    {
        id: 't4',
        title: 'Настроить CI/CD pipeline',
        description: 'GitHub Actions теперь деплоит на Vercel автоматически.',
        status: 'done',
        tags: [{ id: 'tag4', label: 'DevOps', color: 'bg-green-500/20 text-green-400 border-green-500/30' }],
        createdAt: Date.now(),
    },
];

const COLUMNS: { id: TaskStatus; label: string; iconNode: React.ReactNode; color: string }[] = [
    { id: 'todo', label: 'To Do', iconNode: <Circle className="w-5 h-5 text-white/50" />, color: 'text-white/70 hover:text-white transition-colors' },
    { id: 'in-progress', label: 'In Progress', iconNode: <Clock className="w-5 h-5 text-blue-400" />, color: 'text-blue-400' },
    { id: 'review', label: 'Review', iconNode: <Eye className="w-5 h-5 text-purple-400" />, color: 'text-purple-400' },
    { id: 'done', label: 'Done', iconNode: <CheckCircle2 className="w-5 h-5 text-green-400" />, color: 'text-green-400' },
];


export default function ProjectsPage() {
    const [tasks, setTasks] = useLocalStorage<ProjectTask[]>('projects_tasks', DEFAULT_TASKS.map(t => ({ ...t, status: t.status === 'to-do' as any ? 'todo' : t.status })));
    const [draggedId, setDraggedId] = useState<string | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('todo');

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('text/plain', id);
        setDraggedId(id);
        // Optional: make ghost image look better or custom
        // e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, columnId: TaskStatus) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        setDraggedId(null);
        if (!id) return;

        setTasks(prev => {
            const taskIndex = prev.findIndex(t => t.id === id);
            if (taskIndex === -1) return prev;

            const newTasks = [...prev];
            newTasks[taskIndex] = { ...newTasks[taskIndex], status: columnId };
            return newTasks;
        });
    };

    const handleDelete = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const createTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: ProjectTask = {
            id: `task_${Date.now()}`,
            title: newTaskTitle,
            description: newTaskDesc,
            status: newTaskStatus,
            tags: [],
            createdAt: Date.now(),
        };

        setTasks(prev => [...prev, newTask]);
        setIsModalOpen(false);
        setNewTaskTitle('');
        setNewTaskDesc('');
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full overflow-hidden"
        >
            <div className="flex items-center justify-between mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-black mb-1 flex items-center gap-3">
                        <span className="gradient-text">Проекты</span>
                    </h1>
                    <p className="text-white/40">Управление рабочими задачами и дисциплиной</p>
                </div>
                <button
                    onClick={() => {
                        setNewTaskStatus('todo');
                        setIsModalOpen(true);
                    }}
                    className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                    + Создать задачу
                </button>
            </div>

            {/* Scrollable board area */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4 -mx-2 px-2">
                <div className="flex gap-6 h-full w-max">
                    {COLUMNS.map(column => {
                        const columnTasks = tasks.filter(t => t.status === column.id);

                        return (
                            <div
                                key={column.id}
                                className="flex flex-col min-w-[320px] w-[320px] max-w-[320px] shrink-0"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, column.id)}
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between mb-4 px-1 group">
                                    <div className="flex items-center gap-2">
                                        <span className={column.color}>{column.iconNode}</span>
                                        <span className="font-bold text-sm tracking-wide uppercase text-white/80 group-hover:text-white transition-colors">{column.label}</span>
                                    </div>
                                    <div className="text-xs font-bold text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                                        {columnTasks.length}
                                    </div>
                                </div>

                                {/* Column Body */}
                                <div className={`flex-1 rounded-2xl border border-white/5 bg-white/[0.01] p-3 flex flex-col gap-3 transition-colors ${draggedId ? 'border-dashed border-white/10 bg-white/[0.02]' : ''}`}>
                                    <AnimatePresence>
                                        {columnTasks.map(task => (
                                            <motion.div
                                                key={task.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                draggable
                                                onDragStart={(e: any) => handleDragStart(e, task.id)}
                                                onDragEnd={() => setDraggedId(null)}
                                                className={`cursor-grab active:cursor-grabbing ${draggedId === task.id ? 'opacity-40' : 'opacity-100'}`}
                                            >
                                                <GlassCard className="p-4 group/card hover:border-white/20 transition-all">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {task.tags.map(tag => (
                                                                <span key={tag.id} className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${tag.color}`}>
                                                                    {tag.label}
                                                                </span>
                                                            ))}
                                                            {task.tags.length === 0 && (
                                                                <div className="h-5" /> // spacing placeholder
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(task.id)}
                                                            className="text-white/20 hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition-opacity text-xs font-bold"
                                                        >
                                                            ✖
                                                        </button>
                                                    </div>

                                                    <h3 className="text-sm font-bold leading-tight mb-2 text-white/90 group-hover/card:text-white transition-colors">
                                                        {task.title}
                                                    </h3>
                                                    {task.description && (
                                                        <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                                                            {task.description}
                                                        </p>
                                                    )}

                                                    <div className="mt-4 flex items-center justify-between">
                                                        <div className="flex -space-x-2">
                                                            {/* Dummy assignees */}
                                                            <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-[10px] font-bold text-blue-300">
                                                                M
                                                            </div>
                                                        </div>
                                                        <div className="text-white/20 hover:text-white/50 cursor-pointer transition-colors text-xs">
                                                            ⋮
                                                        </div>
                                                    </div>
                                                </GlassCard>
                                            </motion.div>
                                        ))}
                                        {columnTasks.length === 0 && (
                                            <div className="h-full flex items-center justify-center text-xs text-white/20 font-medium py-10">
                                                Перетащите задачу сюда
                                            </div>
                                        )}
                                    </AnimatePresence>

                                    {/* Add task button at bottom of column */}
                                    <button
                                        onClick={() => {
                                            setNewTaskStatus(column.id);
                                            setIsModalOpen(true);
                                        }}
                                        className="w-full py-2.5 rounded-xl border border-dashed border-white/10 text-white/30 text-xs font-bold hover:bg-white/[0.03] hover:text-white/60 hover:border-white/20 transition-all flex items-center justify-center gap-2 mt-auto"
                                    >
                                        + Добавить
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Basic Create Task Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-2xl"
                            style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                        >
                            <h2 className="text-xl font-bold mb-4">Создать задачу</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Название</label>
                                    <input
                                        type="text"
                                        value={newTaskTitle}
                                        onChange={e => setNewTaskTitle(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder="Например: Спроектировать базу"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Описание</label>
                                    <textarea
                                        value={newTaskDesc}
                                        onChange={e => setNewTaskDesc(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none h-24"
                                        placeholder="Дополнительные детали..."
                                    />
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 font-bold text-sm hover:bg-white/5 transition-colors"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        onClick={createTask}
                                        className="flex-1 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors"
                                    >
                                        Создать
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
