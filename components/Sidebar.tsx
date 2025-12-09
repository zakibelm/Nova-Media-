import React from 'react';
import { LayoutDashboard, Users, GitMerge, Settings, Activity, Command, FileJson } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'workflow', label: 'Orchestration', icon: GitMerge },
    { id: 'agents', label: 'Agent Fleet', icon: Users },
    { id: 'settings', label: 'System Config', icon: Settings },
    { id: 'json_dump', label: 'Arch. Dump', icon: FileJson },
  ];

  return (
    <div className="w-64 h-screen bg-nova-900 border-r border-nova-700 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-nova-700/50">
        <div className="w-8 h-8 bg-nova-cyan rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <Command className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide">NOVA MEDIA</h1>
          <p className="text-xs text-gray-400 font-mono">v3.0.0 [OR]</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-nova-800 text-nova-cyan border-l-2 border-nova-cyan' 
                  : 'text-gray-400 hover:bg-nova-800/50 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-nova-cyan' : 'group-hover:text-white'} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-nova-700/50">
        <div className="bg-nova-800/50 rounded-lg p-3 border border-nova-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-green-400" />
            <span className="text-xs font-mono text-green-400">OPENROUTER</span>
          </div>
          <div className="w-full bg-nova-900 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[92%] animate-pulse"></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-500">Latency: 42ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;