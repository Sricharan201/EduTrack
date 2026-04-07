import React from 'react';

export default function StatCard({ title, value, icon: Icon, color, trend, trendLabel }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
    },
    green: {
      bg: 'bg-emerald-500',
      light: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
    },
    purple: {
      bg: 'bg-violet-500',
      light: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-100',
    },
    orange: {
      bg: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
    },
  };

  const c = colorMap[color] || colorMap.blue;
  const isPositive = trend >= 0;

  return (
    <div className={`bg-white rounded-2xl border ${c.border} p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${c.light} rounded-xl flex items-center justify-center`}>
          <Icon size={22} className={c.text} />
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-lg ${
              isPositive
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {isPositive ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      {trendLabel && <p className="text-xs text-gray-400 mt-1">{trendLabel}</p>}
    </div>
  );
}
