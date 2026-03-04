import { Bell, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-black text-[#111111] tracking-tight">洞悉数据，生成未来。</h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">AI时代的营销决策与生产中枢</p>
      </div>
      <div className="flex items-center space-x-6">
        <button type="button" className="text-gray-500 hover:text-[#111111] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#D96C6C] rounded-full border-2 border-white"></span>
        </button>
        <button type="button" className="text-gray-500 hover:text-[#111111] transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium group-hover:bg-gray-200 transition-colors">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
