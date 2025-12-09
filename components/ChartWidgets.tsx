
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

const data = [
  { name: 'Mon', tasks: 40, cost: 240 },
  { name: 'Tue', tasks: 30, cost: 139 },
  { name: 'Wed', tasks: 98, cost: 600 },
  { name: 'Thu', tasks: 50, cost: 290 },
  { name: 'Fri', tasks: 75, cost: 450 },
  { name: 'Sat', tasks: 60, cost: 380 },
  { name: 'Sun', tasks: 85, cost: 510 },
];

export const ActivityChart = () => {
  return (
    <div className="h-[250px] w-full min-w-0" style={{ minWidth: 0, minHeight: 0 }}>
      {/* debounce={1} helps prevent ResizeObserver loops and calculation errors during animations */}
      <ResponsiveContainer width="100%" height="100%" debounce={1}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#475569" 
            tick={{fontSize: 10, fill: '#64748b'}} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            stroke="#475569" 
            tick={{fontSize: 10, fill: '#64748b'}} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
            itemStyle={{ color: '#06b6d4' }}
            cursor={{ stroke: '#334155', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="tasks" 
            stroke="#06b6d4" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorTasks)" 
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TokenUsageChart = () => {
  return (
    <div className="h-[250px] w-full min-w-0" style={{ minWidth: 0, minHeight: 0 }}>
      <ResponsiveContainer width="100%" height="100%" debounce={1}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#475569" 
            tick={{fontSize: 10, fill: '#64748b'}} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            cursor={{fill: '#1e293b', opacity: 0.4}}
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
          />
          <Bar dataKey="cost" fill="#8b5cf6" radius={[4, 4, 0, 0]} isAnimationActive={true}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#7c3aed'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
