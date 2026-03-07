import { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MoreHorizontal,
  ThumbsDown,
  MessageCircle,
  Share2,
  Star
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const EVENT_DATA = [
  { time: '08:00', 正面: 120, 负面: 10, 中性: 300 },
  { time: '09:00', 正面: 150, 负面: 15, 中性: 400 },
  { time: '10:00', 正面: 200, 负面: 40, 中性: 500 },
  { time: '11:00', 正面: 180, 负面: 120, 中性: 450 },
  { time: '12:00', 正面: 160, 负面: 250, 中性: 400 },
  { time: '13:00', 正面: 140, 负面: 320, 中性: 350 },
  { time: '14:00', 正面: 130, 负面: 400, 中性: 300 },
  { time: '15:00', 正面: 150, 负面: 380, 中性: 320 },
  { time: '16:00', 正面: 180, 负面: 300, 中性: 350 },
  { time: '17:00', 正面: 220, 负面: 200, 中性: 400 },
];

const FEED_ITEMS = [
  {
    id: 1,
    platform: '微博',
    author: '吃瓜群众A',
    time: '10分钟前',
    content: '这包装也太差了吧，收到的时候都碎了，客服还不理人！避雷！',
    sentiment: 'negative',
    engagement: { likes: 1204, comments: 342, shares: 89 },
    isHighRisk: true
  },
  {
    id: 2,
    platform: '小红书',
    author: '种草小达人',
    time: '15分钟前',
    content: '今天收到了新品，颜色真的绝美，完全没有色差，爱了爱了！',
    sentiment: 'positive',
    engagement: { likes: 892, comments: 124, shares: 45 },
    isHighRisk: false
  },
  {
    id: 3,
    platform: '抖音',
    author: '测评博主B',
    time: '22分钟前',
    content: '实测这款产品，说实话性价比一般，没有宣传的那么神。',
    sentiment: 'neutral',
    engagement: { likes: 450, comments: 89, shares: 12 },
    isHighRisk: false
  },
  {
    id: 4,
    platform: '微博',
    author: '愤怒的消费者',
    time: '30分钟前',
    content: '严重怀疑是假货，用了一次就过敏了，要求退款并赔偿！大家千万别买！',
    sentiment: 'negative',
    engagement: { likes: 3405, comments: 892, shares: 450 },
    isHighRisk: true
  },
  {
    id: 5,
    platform: 'B站',
    author: '开箱UP主',
    time: '1小时前',
    content: '深度体验一周后，来说说这款产品的优缺点。总体来说还是值得推荐的。',
    sentiment: 'positive',
    engagement: { likes: 5200, comments: 680, shares: 320 },
    isHighRisk: false
  },
  {
    id: 6,
    platform: '小红书',
    author: '时尚博主C',
    time: '1.5小时前',
    content: '这个设计真的很难评，感觉像上个世纪的产物，完全不符合现在的审美。',
    sentiment: 'negative',
    engagement: { likes: 210, comments: 45, shares: 8 },
    isHighRisk: false
  },
  {
    id: 7,
    platform: '抖音',
    author: '生活记录者',
    time: '2小时前',
    content: '日常记录，今天用了新买的这个，感觉还不错，挺方便的。',
    sentiment: 'neutral',
    engagement: { likes: 156, comments: 12, shares: 2 },
    isHighRisk: false
  },
  {
    id: 8,
    platform: '微博',
    author: '行业观察员',
    time: '3小时前',
    content: '从这次的新品发布可以看出，品牌在努力转型，但市场接受度还有待观察。',
    sentiment: 'neutral',
    engagement: { likes: 890, comments: 120, shares: 45 },
    isHighRisk: false
  }
];

export default function EventMonitoring() {
  const [showAiResponse, setShowAiResponse] = useState<number | null>(null);

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#111111] flex items-center">
            事件监测
            <span className="ml-3 px-2 py-1 bg-[#D96C6C]/10 text-[#D96C6C] text-xs font-bold rounded-md flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#D96C6C] animate-pulse mr-1.5"></span>
              高危预警中
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">当前监测任务：春季新品发布会舆情</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索关键词..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
            />
          </div>
          <button type="button" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left: Dashboard (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-[#111111]">实时情绪走势</h3>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-[#82A7A6] font-medium"><span className="w-2 h-2 rounded-full bg-[#82A7A6] mr-1.5"></span>正面 24%</span>
                <span className="flex items-center text-[#D96C6C] font-medium"><span className="w-2 h-2 rounded-full bg-[#D96C6C] mr-1.5"></span>负面 35%</span>
                <span className="flex items-center text-gray-500 font-medium"><span className="w-2 h-2 rounded-full bg-gray-400 mr-1.5"></span>中性 41%</span>
              </div>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={EVENT_DATA}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82A7A6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#82A7A6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D96C6C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D96C6C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111111', color: '#fff', borderRadius: '8px', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="负面" stackId="1" stroke="#D96C6C" fill="url(#colorNeg)" />
                  <Area type="monotone" dataKey="正面" stackId="2" stroke="#82A7A6" fill="url(#colorPos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Live Feed (40%) */}
        <div className="w-full lg:w-[40%] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-bold text-[#111111] flex items-center">
              实时信息流
              <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </h3>
            <span className="text-xs text-gray-500">每 30 秒刷新</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {FEED_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className={`relative p-4 rounded-xl border transition-all ${
                  item.isHighRisk 
                    ? 'border-[#D96C6C]/30 bg-[#D96C6C]/5 pl-5' 
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                {item.isHighRisk && (
                  <>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D96C6C] rounded-l-xl"></div>
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#D96C6C] animate-pulse"></div>
                  </>
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {item.platform}
                    </span>
                    <span className="text-sm font-bold text-[#111111]">{item.author}</span>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                  {item.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center"><ThumbsDown className="w-3.5 h-3.5 mr-1" /> {item.engagement.likes}</span>
                    <span className="flex items-center"><MessageCircle className="w-3.5 h-3.5 mr-1" /> {item.engagement.comments}</span>
                    <span className="flex items-center"><Share2 className="w-3.5 h-3.5 mr-1" /> {item.engagement.shares}</span>
                  </div>
                  
                  {item.isHighRisk && (
                    <button 
                      type="button"
                      onClick={() => setShowAiResponse(showAiResponse === item.id ? null : item.id)}
                      className="flex items-center space-x-1 text-xs font-medium text-[#D96C6C] bg-[#D96C6C]/10 px-2 py-1 rounded hover:bg-[#D96C6C]/20 transition-colors"
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>AI 响应方案</span>
                    </button>
                  )}
                </div>

                {/* AI Response Suggestion */}
                {showAiResponse === item.id && (
                  <div className="mt-3 p-3 bg-white border border-[#D96C6C]/20 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="w-4 h-4 text-[#D96C6C]" />
                      <span className="text-xs font-bold text-[#111111]">建议公关回复</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      您好，非常抱歉给您带来不好的体验！我们已私信您了解具体情况，将为您安排专属客服进行退换货及补偿处理。感谢您的监督！
                    </p>
                    <div className="flex justify-end space-x-2">
                      <button type="button" className="text-xs px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50">修改</button>
                      <button type="button" className="text-xs px-2 py-1 bg-[#111111] text-white rounded hover:bg-gray-800">一键回复</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Bot icon component since it wasn't imported from lucide-react in this file
function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
