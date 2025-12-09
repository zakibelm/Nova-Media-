
import React from 'react';
import { LayoutDashboard, Users, GitMerge, Settings, Activity, Command, FileJson } from 'lucide-react';
import { ViewState, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { language, setLanguage, direction, t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: t.sidebar.dashboard, icon: LayoutDashboard },
    { id: 'workflow', label: t.sidebar.orchestration, icon: GitMerge },
    { id: 'agents', label: t.sidebar.agents, icon: Users },
    { id: 'settings', label: t.sidebar.settings, icon: Settings },
    { id: 'json_dump', label: t.sidebar.archDump, icon: FileJson },
  ];

  return (
    <div className={`w-64 h-screen bg-nova-900 ${direction === 'rtl' ? 'border-l left-auto right-0' : 'border-r left-0'} border-nova-700 flex flex-col fixed top-0 z-50 shadow-2xl overflow-hidden`}>
      {/* Header with Animation */}
      <div className="p-6 flex items-center gap-3 border-b border-nova-700/50 relative overflow-hidden group">
        <motion.div 
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-8 h-8 bg-nova-cyan rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] flex-shrink-0 z-10 cursor-pointer"
        >
          <Command className="text-white w-5 h-5" />
        </motion.div>
        <div className="z-10 flex flex-col items-start">
          <h1 className="text-lg font-bold text-white tracking-wide leading-none">NOVA MEDIA</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">v3.0.0</p>
        </div>
        
        {/* Subtle Glow Effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-nova-cyan/10 rounded-full blur-3xl group-hover:bg-nova-cyan/20 transition-all duration-700"></div>
      </div>

      {/* Language Switcher */}
      <div className="p-4 flex gap-2 justify-center border-b border-nova-700/30">
        {(['fr', 'en', 'ar'] as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors duration-300 relative overflow-hidden isolate ${
              language === lang 
              ? 'text-nova-900' 
              : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === lang && (
              <motion.div
                layoutId="lang-active-pill"
                className="absolute inset-0 bg-nova-cyan z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ borderRadius: 9999 }}
              />
            )}
            <span className="relative z-10">{lang}</span>
          </button>
        ))}
      </div>

      {/* Animated Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <AnimatePresence>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewState)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 group outline-none isolate ${
                  isActive ? 'text-nova-cyan' : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* The "Sliding Pill" Background - Moves smoothly between items */}
                {isActive && (
                  <motion.div
                    layoutId="menu-active-pill"
                    className={`absolute inset-0 bg-nova-800 border border-nova-700/80 shadow-[0_0_15px_rgba(6,182,212,0.1)] z-[-1] ${direction === 'rtl' ? 'border-r-2 border-r-nova-cyan' : 'border-l-2 border-l-nova-cyan'}`}
                    style={{ borderRadius: '0.75rem' }}
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      mass: 0.8
                    }}
                  />
                )}

                {/* Icon with Pop effect */}
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Icon size={20} className={isActive ? 'text-nova-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'group-hover:text-white transition-colors'} />
                </motion.div>
                
                <span className="font-medium text-sm relative z-10">{item.label}</span>
                
                {/* Hover highlight for non-active items */}
                {!isActive && (
                   <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[-1]" />
                )}
              </button>
            );
          })}
        </AnimatePresence>
      </nav>

      <div className="p-4 border-t border-nova-700/50 bg-nova-900/50 backdrop-blur-md">
        <div className="bg-nova-800/50 rounded-lg p-3 border border-nova-700 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-green-400" />
            <span className="text-xs font-mono text-green-400 uppercase">{t.sidebar.systemStatus}</span>
          </div>
          <div className="w-full bg-nova-900 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-green-500 h-full rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-500">{t.sidebar.latency}: 42ms</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center pt-2 border-t border-nova-700/30">
          <p className="text-[10px] text-gray-500 font-mono opacity-70 hover:opacity-100 transition-opacity cursor-default">
            {t.sidebar.poweredBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
