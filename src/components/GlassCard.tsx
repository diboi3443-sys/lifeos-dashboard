'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    gradient?: string;
    glow?: boolean;
    hover?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export default function GlassCard({
    children,
    className = '',
    gradient,
    glow = false,
    hover = true,
    onClick,
    style = {},
}: GlassCardProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <motion.div
            whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className={`
        relative overflow-hidden rounded-2xl p-5 glow-effect
        border border-white/[0.06]
        ${glow ? 'glow-blue' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
            style={{
                background: gradient || 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                ...style,
            }}
        >
            {/* Subtle gradient overlay */}
            <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)',
                }}
            />
            <div className="glow-content relative z-10">{children}</div>
        </motion.div>
    );
}

/* ── Stat Card  ── */
interface StatCardProps {
    label: string;
    value: string | number;
    icon: ReactNode;
    trend?: string;
    trendUp?: boolean;
    color?: string;
    gradient?: string;
    customIcon?: boolean;
}

export function StatCard({ label, value, icon, trend, trendUp, color, gradient, customIcon }: StatCardProps) {
    return (
        <GlassCard className="stat-card">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-1">{label}</p>
                    <p className="text-3xl font-black" style={{ color: color || 'white' }}>{value}</p>
                    {trend && (
                        <p className={`text-xs mt-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                            {trendUp ? '↑' : '↓'} {trend}
                        </p>
                    )}
                </div>
                {customIcon ? (
                    icon
                ) : (
                    <div
                        className="p-2.5 rounded-xl"
                        style={{
                            background: gradient || 'rgba(59,130,246,0.15)',
                        }}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </GlassCard>
    );
}

/* ── Progress Stat ── */
interface ProgressCardProps {
    label: string;
    value: number;
    max: number;
    color: string;
    icon: ReactNode;
    customIcon?: boolean;
}

export function ProgressCard({ label, value, max, color, icon, customIcon }: ProgressCardProps) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <GlassCard>
            <div className="flex items-center gap-3 mb-3">
                {customIcon ? (
                    icon
                ) : (
                    <div className="p-2 rounded-lg" style={{ background: `${color}20` }}>
                        {icon}
                    </div>
                )}
                <div className="flex-1">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-sm text-white/50">{value.toFixed(1)}</span>
                    </div>
                    <div className="progress-bar">
                        <motion.div
                            className="progress-bar-fill"
                            style={{ background: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
