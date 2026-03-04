import { useState } from 'react';
import { 
  BarChart2, 
  Users, 
  Activity, 
  Image as ImageIcon, 
  Video, 
  Bot, 
  BookOpen, 
  Link,
  ChevronDown,
  ChevronRight,
  PieChart,
  Star,
  FileText,
  Database
} from 'lucide-react';

const NAV_ITEMS = [
  {
    title: '官号运营',
    icon: <BarChart2 className="w-5 h-5" />,
    children: [
      { title: '全局洞察', icon: <PieChart className="w-4 h-4" /> },
      { title: '智能日报', icon: <FileText className="w-4 h-4" /> },
    ]
  },
  {
    title: '智能创作',
    icon: <Bot className="w-5 h-5" />,
    children: [
      { title: '小红书写手', icon: <FileText className="w-4 h-4" /> },
    ]
  },
  {
    title: '资产中心',
    icon: <Database className="w-5 h-5" />,
    children: [
      { title: '品牌知识库', icon: <BookOpen className="w-4 h-4" /> },
    ]
  }
];

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function Sidebar({ activeNav, setActiveNav }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['官号运营', '智能创作', '资产中心']);

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col flex-shrink-0">
      <div className="pt-[46px] pb-6 px-6 flex items-center justify-center">
        <span className="text-3xl font-black tracking-tighter flex items-baseline">
          <span className="text-[#111111] italic pr-1 font-sans">UTen</span>
          <span className="text-[#E63946] text-2xl not-italic">幼狮</span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col mt-[64px]">
        <nav className="px-4 space-y-6">
          {NAV_ITEMS.map((group) => (
            <div key={group.title}>
              <button 
                type="button"
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between w-full text-base font-bold text-gray-800 hover:text-[#111111] transition-colors mb-3 px-2"
              >
                <div className="flex items-center space-x-3">
                  {group.icon}
                  <span>{group.title}</span>
                </div>
                {expandedGroups.includes(group.title) ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
              
              {expandedGroups.includes(group.title) && (
                <div className="space-y-1.5 mt-2">
                  {group.children.map((child) => (
                    <button
                      type="button"
                      key={child.title}
                      onClick={() => setActiveNav(child.title)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base transition-all duration-200 ${
                        activeNav === child.title 
                          ? 'bg-[#4A6B82]/10 text-[#4A6B82] font-bold' 
                          : 'text-gray-700 font-medium hover:bg-gray-50 hover:text-[#111111]'
                      }`}
                    >
                      {child.icon}
                      <span>{child.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
