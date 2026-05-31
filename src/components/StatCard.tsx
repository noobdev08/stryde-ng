import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'blue' | 'orange' | 'emerald' | 'purple';
  suffix?: string;
}

export function StatCard({
  title,
  value,
  icon,
  color = 'blue',
  suffix,
}: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-400 border-blue-500/20 hover:border-blue-500/40',
    orange: 'text-orange-400 border-orange-500/20 hover:border-orange-500/40',
    emerald: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40',
    purple: 'text-purple-400 border-purple-500/20 hover:border-purple-500/40',
  };

  return (
    <div className={`bg-slate-900/40 border border-slate-700/40 rounded-2xl p-5 md:p-6 transition-all duration-300 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">{title}</p>
          <p className="text-2xl md:text-3xl font-black flex items-baseline gap-1">
            <span className={colorClasses[color].split(' ')[0]}>{value}</span>
            {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
          </p>
        </div>
        {icon && <div className="p-2.5 rounded-xl bg-slate-800/50">{icon}</div>}
      </div>
    </div>
  );
}
