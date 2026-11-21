
import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CircularGrowthProps {
    value: number;
    max?: number;
    label: string;
    suffix?: string;
    prefix?: string;
    colorTheme?: 'blue' | 'purple' | 'amber' | 'green';
    delay?: number;
}

export const CircularGrowth: React.FC<CircularGrowthProps> = ({ 
    value, 
    max = 100, 
    label, 
    suffix = '%', 
    prefix = '', 
    colorTheme = 'blue',
    delay = 0 
}) => {
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState(0);
    
    // Config
    const size = 120;
    const strokeWidth = 8;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    // Colors
    const themes = {
        blue: { start: "#3b82f6", end: "#06b6d4", shadow: "rgba(6, 182, 212, 0.4)", bg: "text-blue-600" },
        purple: { start: "#8b5cf6", end: "#ec4899", shadow: "rgba(236, 72, 153, 0.4)", bg: "text-purple-600" },
        amber: { start: "#f59e0b", end: "#ef4444", shadow: "rgba(239, 68, 68, 0.4)", bg: "text-amber-600" },
        green: { start: "#10b981", end: "#34d399", shadow: "rgba(16, 185, 129, 0.4)", bg: "text-green-600" }
    };
    const theme = themes[colorTheme];

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;
        const duration = 2000;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progressTime = timestamp - startTime;
            
            // Wait for delay
            if (progressTime < delay) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            const actualTime = progressTime - delay;
            const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
            
            const percentage = Math.min(actualTime / duration, 1);
            const easeVal = easeOutQuart(percentage);

            setCount(Math.round(easeVal * value));
            setProgress(easeVal * (Math.min(value, max))); // Limit visual to max

            if (actualTime < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [value, max, delay]);

    const offset = circumference - ((progress / max) * circumference);
    const uniqueId = Math.random().toString(36).substr(2, 9);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="relative flex items-center justify-center transition-transform duration-500 hover:scale-105">
                <svg width={size} height={size} className="transform -rotate-90">
                    <defs>
                        <linearGradient id={`grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={theme.start} />
                            <stop offset="100%" stopColor={theme.end} />
                        </linearGradient>
                    </defs>
                    <circle cx={center} cy={center} r={radius} stroke="#f1f5f9" strokeWidth={strokeWidth} fill="transparent" />
                    <circle
                        cx={center} cy={center} r={radius}
                        stroke={`url(#grad-${uniqueId})`} strokeWidth={strokeWidth} fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0px 0px 6px ${theme.shadow})` }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                    <span className={`text-2xl font-extrabold tracking-tighter ${theme.bg}`}>
                        {prefix}{count}{suffix}
                    </span>
                </div>
            </div>
            <h4 className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</h4>
        </div>
    );
};

interface BarChartProps {
    data: number[];
    labels: string[];
    label: string;
    colorTheme?: 'blue' | 'purple' | 'amber';
}

export const TrendBarChart: React.FC<BarChartProps> = ({ data, labels, label, colorTheme = 'blue' }) => {
    const maxVal = Math.max(...data);
    
    const colors = {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        amber: "bg-amber-500"
    };
    const barColor = colors[colorTheme];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{label}</h4>
                <div className="flex items-center text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> Trending
                </div>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-32 w-full">
                {data.map((val, idx) => {
                    const heightPercent = (val / maxVal) * 100;
                    return (
                        <div key={idx} className="flex flex-col items-center flex-1 group">
                            <div className="w-full bg-slate-50 rounded-t-lg relative overflow-hidden h-full flex items-end">
                                <div 
                                    className={`w-full ${barColor} opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-out rounded-t-md`}
                                    style={{ height: `${heightPercent}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-2 font-medium">{labels[idx]}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
