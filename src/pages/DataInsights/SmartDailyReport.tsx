import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Download, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  ThumbsUp, 
  AlertTriangle, 
  BarChart2, 
  PieChart, 
  FileText,
  RefreshCw,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  X,
  Smile,
  Meh,
  Frown,
  Heart,
  Share2,
  Target,
  List,
  Sparkles,
  Search,
  BookOpen,
  Video,
  ChevronDown
} from 'lucide-react';

interface SmartDailyReportProps {
  initialDate?: string | null;
  onNavigateToWriter?: (params: any) => void;
}

export default function SmartDailyReport({ initialDate, onNavigateToWriter }: SmartDailyReportProps) {
  const [reportType, setReportType] = useState<'content' | 'platform'>('content');
  const [selectedPlatform, setSelectedPlatform] = useState('全部');
  const [canvasState, setCanvasState] = useState<'empty' | 'loading' | 'report'>('empty');
  const [showToast, setShowToast] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Form states
  const [selectedAccount, setSelectedAccount] = useState('逆水寒手游官方');
  const [selectedPost, setSelectedPost] = useState('');
  const [timeRange, setTimeRange] = useState({ start: '2026-03-05T10:00', end: '2026-03-05T18:00' });
  const [allDate, setAllDate] = useState('2026-03-05');
  const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
  const [postSearchQuery, setPostSearchQuery] = useState('');

  const posts = [
    { id: 'post1', title: '全新版本「幻梦之境」即将开启！', time: '2026-03-05 10:00', img: 'https://picsum.photos/seed/nsh1/80/80' },
    { id: 'post2', title: '新角色技能演示，这也太帅了吧！', time: '2026-03-04 18:30', img: 'https://picsum.photos/seed/nsh2/80/80' },
    { id: 'post3', title: '开发组答疑：关于近期副本难度的调整', time: '2026-03-03 12:00', img: 'https://picsum.photos/seed/nsh3/80/80' },
  ];

  const filteredPosts = posts.filter(p => p.title.includes(postSearchQuery));

  useEffect(() => {
    if (initialDate) {
      setAllDate(initialDate);
    }
  }, [initialDate]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleGenerate = () => {
    setCanvasState('loading');
    setElapsedTime(0);
    
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setCanvasState('report');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 5000);
  };

  const renderInsightConsole = () => {
    return (
      <div className="w-[320px] flex-shrink-0 bg-white border-r border-[#E5E5E5] flex flex-col h-full relative z-20">
        <div className="px-6 pt-8 pb-5 text-left">
          <h1 className="text-[24px] font-medium text-[#242424] tracking-tight mb-6">官号运营</h1>
          <h2 className="text-[16px] font-medium text-[#242424]">分析配置</h2>
        </div>
        <div className="px-6 flex-1 overflow-y-auto">
          {/* Time Dimension */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-[#6B6B6B] mb-2 text-left">单日时间维度</label>
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={allDate} 
                onChange={e => setAllDate(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-[16px] px-4 py-3 text-[14px] text-[#242424] focus:border-[#242424] hover:border-[#242424]/30 focus:ring-0 outline-none transition-colors" 
              />
            </div>
          </div>

          {/* Analysis Type */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-[#6B6B6B] mb-2 text-left">分析类型</label>
            <div className="flex bg-[#FBFBFA] p-1 rounded-[16px] border border-[#E5E5E5]">
              <button 
                className={`flex-1 py-2 text-[14px] font-medium rounded-[12px] transition-all duration-200 ${reportType === 'content' ? 'bg-white text-[#242424] shadow-sm' : 'text-[#6B6B6B] hover:text-[#242424]'}`}
                onClick={() => setReportType('content')}
              >
                内容分析
              </button>
              <button 
                className={`flex-1 py-2 text-[14px] font-medium rounded-[12px] transition-all duration-200 ${reportType === 'platform' ? 'bg-white text-[#242424] shadow-sm' : 'text-[#6B6B6B] hover:text-[#242424]'}`}
                onClick={() => setReportType('platform')}
              >
                平台分析
              </button>
            </div>
          </div>

          {/* Platform Selection */}
          {(reportType === 'content' || reportType === 'platform') && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-[14px] font-medium text-[#6B6B6B] mb-2 text-left">选择平台</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: '全部', icon: <List className="w-4 h-4" /> },
                  { id: '小红书', icon: <BookOpen className="w-4 h-4" /> },
                  { id: '抖音', icon: <Video className="w-4 h-4" /> },
                  { id: '微博', icon: <MessageSquare className="w-4 h-4" /> },
                ].map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`py-3 rounded-[16px] text-[13px] font-medium transition-all flex flex-col items-center justify-center gap-1.5 ${
                      selectedPlatform === p.id 
                        ? 'bg-[#242424] text-white' 
                        : 'bg-white text-[#6B6B6B] border border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#242424]'
                    }`}
                  >
                    {p.icon}
                    <span>{p.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Article Selection */}
          {reportType === 'content' && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-[14px] font-medium text-[#6B6B6B] mb-2 text-left">选择文章</label>
              <div className="relative">
                <div 
                  onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
                  className="w-full bg-white border border-[#E5E5E5] rounded-[16px] px-4 py-3 text-[14px] text-[#242424] flex items-center justify-between cursor-pointer hover:border-[#242424]/30 transition-colors"
                >
                  {selectedPost ? (
                    <div className="flex items-center gap-2 truncate">
                      <img src={posts.find(p => p.id === selectedPost)?.img} className="w-5 h-5 rounded object-cover" alt="" />
                      <span className="truncate">{posts.find(p => p.id === selectedPost)?.title}</span>
                    </div>
                  ) : (
                    <span className="text-[#6B6B6B]">请选择要分析的文章...</span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-[#6B6B6B] transition-transform duration-200 ${isPostDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {isPostDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[16px] shadow-lg border border-[#E5E5E5] z-50 overflow-hidden">
                    <div className="p-2 border-b border-[#E5E5E5]">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6B6B]" />
                        <input 
                          type="text" 
                          placeholder="搜索近期发布文章..." 
                          value={postSearchQuery}
                          onChange={e => setPostSearchQuery(e.target.value)}
                          className="w-full bg-[#F8F9FA] border-none rounded-md pl-8 pr-3 py-1.5 text-[13px] text-[#242424] focus:ring-0 outline-none placeholder:text-[#6B6B6B]" 
                        />
                      </div>
                    </div>
                    <div className="max-h-[240px] overflow-y-auto p-1.5 space-y-0.5">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                          <div 
                            key={post.id}
                            onClick={() => {
                              setSelectedPost(post.id);
                              setIsPostDropdownOpen(false);
                              setPostSearchQuery('');
                            }}
                            className={`flex gap-2.5 p-2 rounded-md cursor-pointer transition-colors ${selectedPost === post.id ? 'bg-[#F8F9FA]' : 'hover:bg-[#F8F9FA]'}`}
                          >
                            <img src={post.img} className="w-8 h-8 rounded object-cover shrink-0" alt="cover" referrerPolicy="no-referrer" />
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <div className={`text-[13px] font-medium truncate ${selectedPost === post.id ? 'text-[#242424]' : 'text-[#444444]'}`}>{post.title}</div>
                              <div className="text-[11px] text-[#6B6B6B] mt-0.5">{post.time}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-[13px] text-[#6B6B6B]">未找到相关文章</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-6 bg-white border-t border-[#E5E5E5]">
          <button 
            onClick={handleGenerate}
            className="w-full bg-[#242424] text-white py-3 rounded-[16px] font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 text-[15px]"
          >
            <Sparkles className="w-4 h-4" />
            生成分析报告
          </button>
        </div>
      </div>
    );
  };

  const [imageError, setImageError] = useState(false);

  const renderDynamicCanvas = () => {
    if (canvasState === 'empty' || canvasState === 'loading') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#FBFBFA] relative overflow-hidden">
          {/* Dynamic Watermark Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <img 
              src="https://img13.360buyimg.com/ddimg/jfs/t1/399747/35/13541/32005/69aa6e08Fc6755cbb/0015257257c351d3.jpg" 
              alt="逆水寒 Logo Watermark" 
              className="w-[600px] h-[600px] object-contain animate-breathe grayscale mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col items-center justify-center pointer-events-none z-10">
            {canvasState === 'loading' && (
              <div className="mt-8 flex flex-col items-center space-y-4 bg-white/80 backdrop-blur-md p-8 rounded-[24px] border border-[#E5E5E5] shadow-sm min-w-[320px]">
                <div className="w-full h-2 rounded-full overflow-hidden bg-[#F0F9F9]">
                  <div className="w-full h-full skeleton-wave"></div>
                </div>
                <div className="flex items-center gap-3 text-[#242424] font-medium text-[15px]">
                  正在生成分析报告...
                </div>
                <div className="w-full h-px bg-[#E5E5E5] my-2"></div>
                <div className="flex justify-between w-full text-[14px] text-[#6B6B6B]">
                  <span>预估时间</span>
                  <span className="font-medium text-[#242424]">03:00</span>
                </div>
                <div className="flex justify-between w-full text-[14px] text-[#6B6B6B]">
                  <span>实际用时</span>
                  <span className="font-medium text-[#63A398] font-mono">
                    {Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:{(elapsedTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 bg-[#FBFBFA] p-8 overflow-y-auto relative">
        {/* Dynamic Watermark Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 fixed">
          <img 
            src="https://img13.360buyimg.com/ddimg/jfs/t1/399747/35/13541/32005/69aa6e08Fc6755cbb/0015257257c351d3.jpg" 
            alt="逆水寒 Logo Watermark" 
            className="w-[800px] h-[800px] object-contain animate-breathe grayscale mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-5xl mx-auto space-y-8 pb-20 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-end mb-8">
            <h1 className="text-[28px] font-serif font-medium text-[#242424] tracking-tight">
              {reportType === 'content' ? '逆水寒内容透视报告' : selectedPlatform === '全部' ? '逆水寒全平台大盘报告' : '逆水寒单平台速报'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-medium text-[#6B6B6B]">数据快照：2026-03-05 15:30</span>
              <button className="flex items-center gap-2 bg-white text-[#242424] px-5 py-2.5 rounded-full text-[14px] font-medium hover:bg-[rgba(0,0,0,0.04)] transition-all border border-[#E5E5E5]">
                <Download className="w-4 h-4" />
                导出报告
              </button>
            </div>
          </div>

          {/* 一、 基础数据 */}
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E5E5]">
            <h2 className="text-[18px] font-medium text-[#242424] mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#E8F5F5] text-[#63A398] flex items-center justify-center mr-3 text-[14px] font-bold">1</span>
              基础数据
            </h2>
            <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FBFBFA]">
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">文章标题</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">总评论</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">最高赞</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">活跃度估算</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#242424]">
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6">[标题A] 全新版本「幻梦之境」即将开启！</td>
                    <td className="py-4 px-6 font-mono">5,230</td>
                    <td className="py-4 px-6 font-mono">1.2w</td>
                    <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-md bg-[#E8F5F5] text-[#63A398] font-medium">高</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6">[标题B] 新角色技能演示，这也太帅了吧！</td>
                    <td className="py-4 px-6 font-mono">3,102</td>
                    <td className="py-4 px-6 font-mono">8,500</td>
                    <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-md bg-[#E8F5F5] text-[#63A398] font-medium">高</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6">[标题C] 开发组答疑：关于近期副本难度的调整</td>
                    <td className="py-4 px-6 font-mono">4,118</td>
                    <td className="py-4 px-6 font-mono">2.4w</td>
                    <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-md bg-[#F5F5F4] text-[#6B6B6B] font-medium">中</span></td>
                  </tr>
                  <tr className="bg-[#FBFBFA] font-semibold">
                    <td className="py-4 px-6">大盘总计</td>
                    <td className="py-4 px-6 font-mono">12,450条</td>
                    <td className="py-4 px-6 font-mono">4.5w赞</td>
                    <td className="py-4 px-6 text-[#63A398] font-normal">整体讨论热度极高，新版本内容引发广泛关注。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 二、 核心议题 */}
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E5E5]">
            <h2 className="text-[18px] font-medium text-[#242424] mb-2 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#F0F4F8] text-[#7A9CCC] flex items-center justify-center mr-3 text-[14px] font-bold">2</span>
              核心议题（议题聚焦与数据表现）
            </h2>
            <p className="text-[14px] text-[#6B6B6B] mb-6 ml-11">提取不超过5个核心议题。必须用具体数据（声量/高赞特征）描述文章表现。</p>
            <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FBFBFA]">
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/5">核心议题</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/5">舆情重灾区(发酵文章)</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/3">典型原话与数据支撑</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">KOC引导方案 (可落地干预)</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#242424]">
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium">1. 外观配件拆卖争议</td>
                    <td className="py-4 px-6 text-[#6B6B6B]">[标题A] 全新版本「幻梦之境」</td>
                    <td className="py-4 px-6 leading-[1.6]">爆发极高，超1300赞复读机霸榜。“这期衣服好看是好看，但288真的有点割韭菜了，特效还不如上期的。”</td>
                    <td className="py-4 px-6 text-[#63A398]">组织KOC发布计算贴对比全套价格，强打性价比</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium">2. 日常任务减负诉求</td>
                    <td className="py-4 px-6 text-[#6B6B6B]">[标题C] 开发组答疑</td>
                    <td className="py-4 px-6 leading-[1.6]">讨论热度中等，800赞热评。“每天上班已经够累了，打个本还要坐牢两小时，能不能出个扫荡？”</td>
                    <td className="py-4 px-6 text-[#63A398]">发布"开发组减负计划"前瞻，安抚焦躁情绪</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 三、 用户画像 */}
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E5E5]">
            <h2 className="text-[18px] font-medium text-[#242424] mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#F4F0F8] text-[#9D8BB0] flex items-center justify-center mr-3 text-[14px] font-bold">3</span>
              用户画像
            </h2>
            <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FBFBFA]">
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/4">玩家大类</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/3">核心痛点/诉求</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">典型原话</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#242424]">
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium">外观党/风景党</td>
                    <td className="py-4 px-6 text-[#6B6B6B]">版型同质化，期望更多高自由度染色</td>
                    <td className="py-4 px-6 italic text-[#6B6B6B]">“只要衣服够仙，钱包拿去！这套白发绝美，已经冲了。”</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium">强度党/硬核玩家</td>
                    <td className="py-4 px-6 text-[#6B6B6B]">副本容错率低，野队体验极差</td>
                    <td className="py-4 px-6 italic text-[#6B6B6B]">“新本机制太恶心了，容错率极低，野队根本没法打，纯纯折磨人。”</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 四、 高频黑话 */}
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E5E5]">
            <h2 className="text-[18px] font-medium text-[#242424] mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#FFF5E6] text-[#D9A05B] flex items-center justify-center mr-3 text-[14px] font-bold">4</span>
              高频黑话
            </h2>
            <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FBFBFA]">
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/3">关键词</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/3">来源文章</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">需入库确认</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#242424]">
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium"><span className="bg-[#F5F5F4] px-2 py-1 rounded">明降暗升</span></td>
                    <td className="py-4 px-6 text-[#6B6B6B]">[标题A] 全新版本「幻梦之境」</td>
                    <td className="py-4 px-6"><span className="text-[#63A398] font-medium">是</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium"><span className="bg-[#F5F5F4] px-2 py-1 rounded">牢底坐穿</span></td>
                    <td className="py-4 px-6 text-[#6B6B6B]">[标题C] 开发组答疑</td>
                    <td className="py-4 px-6"><span className="text-[#63A398] font-medium">是</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 五、 情绪分布 */}
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E5E5]">
            <h2 className="text-[18px] font-medium text-[#242424] mb-2 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#FCE8E8] text-[#D96C6C] flex items-center justify-center mr-3 text-[14px] font-bold">5</span>
              情绪分布（含负面归因）
            </h2>
            <p className="text-[14px] text-[#6B6B6B] mb-6 ml-11">只展示正负面占比（中立诉求不展示）。必须用具体数据支撑负面主因。</p>
            <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FBFBFA]">
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/4">文章标题</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/6">正面占比</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/6">负面占比</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">负面主因及数据支撑</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#242424]">
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium">[标题A]</td>
                    <td className="py-4 px-6 text-[#63A398] font-mono font-medium">35%</td>
                    <td className="py-4 px-6 text-[#D96C6C] font-mono font-medium">45%</td>
                    <td className="py-4 px-6 leading-[1.6] text-[#6B6B6B]">约50%的负面评价源自大量复制文案“停止价格明降暗升”，系高度组织化的玩家维权。</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-medium">[标题C]</td>
                    <td className="py-4 px-6 text-[#63A398] font-mono font-medium">20%</td>
                    <td className="py-4 px-6 text-[#D96C6C] font-mono font-medium">60%</td>
                    <td className="py-4 px-6 leading-[1.6] text-[#6B6B6B]">超30%负面评价直指“女号像破布条”，严重审美疲劳导致差评激增。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 六、 异常帖定向干预 */}
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E5E5]">
            <h2 className="text-[18px] font-medium text-[#242424] mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#E8F5F5] text-[#63A398] flex items-center justify-center mr-3 text-[14px] font-bold">6</span>
              异常帖定向干预
            </h2>
            <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FBFBFA]">
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/5">异常分类</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/5">对应文章</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5] w-1/3">异常表现与数据</th>
                    <th className="py-4 px-6 text-[14px] font-medium text-[#6B6B6B] border-b border-[#E5E5E5]">落地干预方案</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#242424]">
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-bold text-[#D96C6C]">负面主导帖</td>
                    <td className="py-4 px-6 text-[#6B6B6B]">[标题A]</td>
                    <td className="py-4 px-6 leading-[1.6]">关于漏肤的负面评论在该帖霸榜，赞评比异常</td>
                    <td className="py-4 px-6 text-[#63A398]">避开正面争论，用大量绝美高自由度染色UGC铺满前排对冲</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                    <td className="py-4 px-6 font-bold text-[#D9A05B]">藏雷正向帖</td>
                    <td className="py-4 px-6 text-[#6B6B6B]">[标题B]</td>
                    <td className="py-4 px-6 leading-[1.6]">大盘平稳，但某几条高赞热评在带拆卖节奏</td>
                    <td className="py-4 px-6 text-[#63A398]">点赞拉踩友商高物价的护航评论，将其顶上热评第一压制负面</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 七、 洞察总结 */}
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E5E5]">
            <h2 className="text-[18px] font-medium text-[#242424] mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#F0F4F8] text-[#7A9CCC] flex items-center justify-center mr-3 text-[14px] font-bold">7</span>
              洞察总结
            </h2>
            <div className="space-y-4 text-[14px] text-[#242424] leading-[1.6]">
              <p>
                当前玩家群体的核心矛盾集中在<strong>“高品质内容预期”与“高成本体验（肝/氪）”的落差</strong>上。虽然新版本的美术表现和玩法设计获得了部分玩家的认可，但底层机制（如副本难度、日常耗时、掉落概率）带来的负反馈正在迅速消耗这份好感。
              </p>
              <p>
                特别是“牢底坐穿”和“背刺”等黑话的高频出现，表明玩家对官方的信任度处于较低水平，容易将正常的商业化设计解读为“割韭菜”。
              </p>
              <p>
                <strong>建议策略：</strong>短期内需通过官方渠道（如策划信、直播）释放明确的“减负”信号，并对争议较大的副本难度进行动态调整；长期来看，需重新评估外观定价策略与福利发放节奏，重建玩家信任。
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-[#E8F5F5] rounded-[16px] border border-[#E5E5E5]">
              <div className="text-[12px] font-semibold text-[#63A398] uppercase tracking-wider mb-2">一句话总结</div>
              <div className="text-[16px] font-medium text-[#242424] leading-snug">
                "优质美术难掩底层体验痛点，亟需实质性减负与真诚沟通以挽回信任危机。"
              </div>
            </div>
          </section>

        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full bg-[#FBFBFA]">
      {renderInsightConsole()}
      {renderDynamicCanvas()}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#242424] text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 border border-[#E5E5E5]">
            <CheckCircle2 className="w-5 h-5 text-[#63A398]" />
            <span className="text-[14px] font-medium">精美长图报告已生成并开始下载</span>
          </div>
        </div>
      )}
    </div>
  );
}
