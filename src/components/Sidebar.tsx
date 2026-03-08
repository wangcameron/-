import { useState } from 'react';
import { 
  BarChart2, 
  Sparkles, 
  BookOpen, 
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  FileText
} from 'lucide-react';

const NAV_ITEMS = [
  {
    title: 'Agent',
    icon: <Plus className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    title: '数据分析',
    icon: <BarChart2 className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    title: '智能创作',
    icon: <Sparkles className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    title: '资产记忆',
    icon: <BookOpen className="w-4 h-4" strokeWidth={1.5} />,
  }
];

const RECENT_ITEMS = [
  { title: '新版本掉率问题应对', type: 'project' },
  { title: '逆水寒内容透视报告', type: 'report' },
];

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function Sidebar({ activeNav, setActiveNav }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={`h-full flex flex-col flex-shrink-0 z-20 relative bg-[#F5F5F4] transition-all duration-300 ease-in-out overflow-x-hidden ${
        isExpanded ? 'w-[240px]' : 'w-[56px]'
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col px-2 pt-4 pb-2 space-y-2">
        <div className={`flex items-center ${isExpanded ? 'justify-between px-2' : 'justify-center'} mb-4`}>
          {isExpanded && (
            <img 
              src="https://img11.360buyimg.com/ddimg/jfs/t1/397186/39/18620/11134/69aa740dF82ce0a55/00153cb0e5f7c135.jpg" 
              alt="Logo" 
              className="h-6 object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full text-[#6B6B6B] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#242424] transition-colors group"
            title={isExpanded ? "Close sidebar" : "Open sidebar"}
          >
            <div className="transition-transform duration-200 group-hover:scale-110 group-active:scale-90">
              {isExpanded ? <PanelLeftClose className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <PanelLeftOpen className="w-[18px] h-[18px]" strokeWidth={1.5} />}
            </div>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col px-2 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.title;
          
          return (
            <button 
              key={item.title}
              onClick={() => setActiveNav(item.title)}
              className={`group flex items-center ${isExpanded ? 'justify-start px-3 py-2.5' : 'justify-center w-10 h-10 mx-auto'} rounded-full transition-colors ${
                isActive ? 'bg-white text-[#242424] font-medium shadow-sm' : 'text-[#6B6B6B] hover:bg-[rgba(0,0,0,0.04)] font-normal'
              }`}
              title={!isExpanded ? item.title : undefined}
            >
              <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-active:scale-90">
                {item.icon}
              </div>
              {isExpanded && <span className="ml-3 text-[14px] truncate">{item.title}</span>}
            </button>
          );
        })}

        {/* Recents Section */}
        <div className="mt-8 mb-2">
          {isExpanded ? (
            <div className="px-3 py-1 text-[12px] font-medium text-[#6B6B6B] mb-1">
              最近
            </div>
          ) : (
            <div className="w-full flex justify-center mt-6 mb-2">
              <div className="w-4 border-t border-[#E5E5E5]"></div>
            </div>
          )}
          
          <div className="space-y-0.5">
            {RECENT_ITEMS.map((item, idx) => (
              <button 
                key={idx}
                className={`group flex items-center ${isExpanded ? 'justify-start px-3 py-2' : 'justify-center w-10 h-10 mx-auto'} rounded-[8px] transition-colors text-[#444444] hover:bg-[#EAE8E3]/60 font-normal w-full`}
                title={!isExpanded ? item.title : undefined}
              >
                <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-active:scale-90">
                  {item.type === 'project' ? (
                    <FileText className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <BarChart2 className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </div>
                {isExpanded && <span className="ml-3 text-[14px] truncate">{item.title}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section (User Profile Placeholder) */}
      <div className="p-2 border-t border-[#E5E5E5]">
        <button 
          className={`group flex items-center ${isExpanded ? 'justify-start px-3 py-2' : 'justify-center w-10 h-10 mx-auto'} rounded-[8px] text-[#444444] hover:bg-[#EAE8E3]/60 transition-colors w-full`}
        >
          <div className="w-5 h-5 rounded-full bg-[#242424] text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-active:scale-90">
            U
          </div>
          {isExpanded && <span className="ml-3 text-[14px] font-normal truncate">User</span>}
        </button>
      </div>
    </aside>
  );
}
