import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark,
  Users,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Tag
} from 'lucide-react';

const INFLUENCERS = [
  {
    id: 1,
    name: '种草小达人',
    platform: '小红书',
    avatar: 'https://picsum.photos/seed/inf1/100/100?blur=2',
    metrics: { followers: '10万+', engagementRate: '5.2%' },
    tags: ['高互动', '成分党', '美妆垂直'],
    recentPost: '春季新品穿搭分享，这件外套绝了！',
    isSaved: false
  },
  {
    id: 2,
    name: '测评博主B',
    platform: '抖音',
    avatar: 'https://picsum.photos/seed/inf2/100/100?blur=2',
    metrics: { followers: '50万+', engagementRate: '3.8%' },
    tags: ['硬核测评', '数码科技', '高转化'],
    recentPost: '实测这款产品，到底值不值得买？',
    isSaved: true
  },
  {
    id: 3,
    name: '吃瓜群众A',
    platform: '微博',
    avatar: 'https://picsum.photos/seed/inf3/100/100?blur=2',
    metrics: { followers: '5万+', engagementRate: '8.5%' },
    tags: ['搞笑段子', '生活日常', '高活跃'],
    recentPost: '今天发生了一件搞笑的事...',
    isSaved: false
  },
  {
    id: 4,
    name: '时尚教主',
    platform: '小红书',
    avatar: 'https://picsum.photos/seed/inf4/100/100?blur=2',
    metrics: { followers: '100万+', engagementRate: '2.1%' },
    tags: ['穿搭指南', '高端品牌', '带货王'],
    recentPost: '本季必入的时尚单品大盘点！',
    isSaved: false
  },
  {
    id: 5,
    name: '美食探店',
    platform: '抖音',
    avatar: 'https://picsum.photos/seed/inf5/100/100?blur=2',
    metrics: { followers: '20万+', engagementRate: '6.4%' },
    tags: ['本地生活', '探店打卡', '吃货必看'],
    recentPost: '发现一家隐藏在巷子里的神仙小店！',
    isSaved: true
  },
  {
    id: 6,
    name: '游戏大神',
    platform: 'B站',
    avatar: 'https://picsum.photos/seed/inf6/100/100?blur=2',
    metrics: { followers: '80万+', engagementRate: '4.5%' },
    tags: ['硬核攻略', '电竞解说', '高粘性'],
    recentPost: '最新副本通关攻略，手把手教你过！',
    isSaved: false
  },
  {
    id: 7,
    name: '科技先锋',
    platform: '知乎',
    avatar: 'https://picsum.photos/seed/inf7/100/100?blur=2',
    metrics: { followers: '30万+', engagementRate: '4.1%' },
    tags: ['深度分析', '行业观察', '高知人群'],
    recentPost: '如何看待这次的AI技术突破？',
    isSaved: false
  },
  {
    id: 8,
    name: '旅行日记',
    platform: '小红书',
    avatar: 'https://picsum.photos/seed/inf8/100/100?blur=2',
    metrics: { followers: '15万+', engagementRate: '7.2%' },
    tags: ['小众景点', '摄影教学', '高颜值'],
    recentPost: '周末逃离城市计划，这几个地方太美了！',
    isSaved: false
  }
];

const VIRAL_CONTENTS = [
  { id: 1, title: '春季新品穿搭分享，这件外套绝了！', platform: '小红书', likes: '1.2w', comments: '342', image: 'https://picsum.photos/seed/vc1/300/400' },
  { id: 2, title: '实测这款产品，到底值不值得买？', platform: '抖音', likes: '8.5w', comments: '1.2k', image: 'https://picsum.photos/seed/vc2/300/400' },
  { id: 3, title: '最新副本通关攻略，手把手教你过！', platform: 'B站', likes: '4.5w', comments: '890', image: 'https://picsum.photos/seed/vc3/300/400' },
  { id: 4, title: '本季必入的时尚单品大盘点！', platform: '小红书', likes: '2.3w', comments: '560', image: 'https://picsum.photos/seed/vc4/300/400' },
  { id: 5, title: '发现一家隐藏在巷子里的神仙小店！', platform: '抖音', likes: '12w', comments: '3.4k', image: 'https://picsum.photos/seed/vc5/300/400' },
  { id: 6, title: '周末逃离城市计划，这几个地方太美了！', platform: '小红书', likes: '3.1w', comments: '420', image: 'https://picsum.photos/seed/vc6/300/400' },
];

export default function ContentInfluencers() {
  const [activeTab, setActiveTab] = useState('达人画像');
  const [savedInfluencers, setSavedInfluencers] = useState<number[]>([2, 5]);

  const toggleSave = (id: number) => {
    if (savedInfluencers.includes(id)) {
      setSavedInfluencers(savedInfluencers.filter(i => i !== id));
    } else {
      setSavedInfluencers([...savedInfluencers, id]);
    }
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">内容与达人</h1>
          <p className="text-sm text-gray-500 mt-1">发现高潜创作者，沉淀爆款内容库</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-lg mr-4">
            {['达人画像', '爆款内容库'].map(tab => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab 
                    ? 'bg-white text-[#111111] shadow-sm' 
                    : 'text-gray-500 hover:text-[#111111]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索达人/内容..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20 focus:border-[#4A6B82]"
            />
          </div>
          <button type="button" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === '达人画像' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INFLUENCERS.map((inf) => (
              <div key={inf.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col relative group">
                <button 
                  type="button"
                  onClick={() => toggleSave(inf.id)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors z-10"
                  title="一键收藏入库"
                >
                  <Bookmark 
                    className={`w-5 h-5 transition-colors ${
                      savedInfluencers.includes(inf.id) ? 'fill-[#4A6B82] text-[#4A6B82]' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                </button>
                
                <div className="flex items-start space-x-4 mb-6">
                  <img 
                    src={inf.avatar} 
                    alt={inf.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-base font-bold text-[#111111]">{inf.name}</h3>
                      <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {inf.platform}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{inf.recentPost}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">粉丝量</p>
                    <p className="text-lg font-bold text-[#111111] font-mono">{inf.metrics.followers}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">互动率</p>
                    <p className="text-lg font-bold text-[#111111] font-mono flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      {inf.metrics.engagementRate}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">AI 智能标签</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {inf.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 bg-[#4A6B82]/10 text-[#4A6B82] border border-[#4A6B82]/20 rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            爆款内容库瀑布流开发中...
          </div>
        )}
      </div>
    </div>
  );
}
