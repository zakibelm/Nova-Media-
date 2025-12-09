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
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" stroke="#475569" tick={{fontSize: 12}} />
          <YAxis stroke="#475569" tick={{fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
            itemStyle={{ color: '#06b6d4' }}
          />
          <Area type="monotone" dataKey="tasks" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTasks)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TokenUsageChart = () => {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="name" stroke="#475569" tick={{fontSize: 12}} />
          <Tooltip 
            cursor={{fill: '#1e293b'}}
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
          />
          <Bar dataKey="cost" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#7c3aed'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};