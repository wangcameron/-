import React, { useState, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  MessageSquare, 
  Heart, 
  Share2,
  AlertCircle,
  Flame,
  Database,
  ChevronDown,
  Calendar,
  Filter,
  Building2,
  UserCircle,
  ArrowRight,
  FileText,
  Smile,
  Meh,
  Frown,
  Activity,
  Bot,
  Tag,
  HelpCircle,
  Download,
  CheckCircle2,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  ReferenceLine
} from 'recharts';
import html2canvas from 'html2canvas';

const BRANDS = ["崩坏：因缘精灵", "原神", "坦克世界", "逆水寒手游", "界外狂潮", "第五人格"];
const PLATFORMS = ["全部", "小红书", "抖音", "微博", "微信公众号"];
const TIME_RANGES = ["今天", "昨天", "近7天", "近30天", "自定义"];

const TREND_DATA = [
  { date: '02-13', 小红书: 2100, 抖音: 1200, 微博: 1500, 微信公众号: 300 },
  { date: '02-14', 小红书: 2800, 抖音: 1800, 微博: 1600, 微信公众号: 320 },
  { date: '02-15', 小红书: 3200, 抖音: 2100, 微博: 1800, 微信公众号: 350 },
  { date: '02-16', 小红书: 2900, 抖音: 1900, 微博: 1700, 微信公众号: 330 },
  { date: '02-17', 小红书: 3500, 抖音: 2500, 微博: 2000, 微信公众号: 380 },
  { date: '02-18', 小红书: 4100, 抖音: 3100, 微博: 2200, 微信公众号: 400 },
  { date: '02-19', 小红书: 3800, 抖音: 2800, 微博: 2100, 微信公众号: 390 },
  { date: '02-20', 小红书: 4000, 抖音: 2400, 微博: 2300, 微信公众号: 410 },
  { date: '02-21', 小红书: 3000, 抖音: 1398, 微博: 1900, 微信公众号: 360 },
  { date: '02-22', 小红书: 2000, 抖音: 9800, 微博: 2500, 微信公众号: 450 },
  { date: '02-23', 小红书: 2780, 抖音: 3908, 微博: 1800, 微信公众号: 380 },
  { date: '02-24', 小红书: 1890, 抖音: 4800, 微博: 2100, 微信公众号: 400 },
  { date: '02-25', 小红书: 2390, 抖音: 3800, 微博: 1900, 微信公众号: 350 },
  { date: '02-26', 小红书: 3490, 抖音: 4300, 微博: 2400, 微信公众号: 420 },
];

const PIE_DATA = [
  { name: '抖音', value: 4500 },
  { name: '小红书', value: 3800 },
  { name: '微博', value: 2100 },
  { name: '微信公众号', value: 400 },
];

const COLORS = ['#111111', '#639FAB', '#82A7A6', '#B4C5C6'];

const TOPICS = [
  { rank: 1, tag: '#春季新版本#', heat: '98.5w', trend: 'up' },
  { rank: 2, tag: '#新角色爆料#', heat: '75.2w', trend: 'up' },
  { rank: 3, tag: '#游戏优化建议#', heat: '45.1w', trend: 'down' },
  { rank: 4, tag: '#周年庆活动#', heat: '32.8w', trend: 'up' },
  { rank: 5, tag: '#新手攻略#', heat: '28.4w', trend: 'same' },
  { rank: 6, tag: '#剧情讨论#', heat: '25.1w', trend: 'up' },
  { rank: 7, tag: '#门派平衡#', heat: '22.3w', trend: 'down' },
  { rank: 8, tag: '#外观穿搭#', heat: '19.8w', trend: 'same' },
  { rank: 9, tag: '#副本开荒#', heat: '15.6w', trend: 'up' },
  { rank: 10, tag: '#同人创作#', heat: '12.4w', trend: 'same' },
];

const FREQUENT_TOPICS = [
  { rank: 1, opinion: '日常任务减负，增加扫荡功能', interactions: '12.5w', sentiment: '负面' },
  { rank: 2, opinion: '新角色技能机制设计优秀，特效华丽', interactions: '10.2w', sentiment: '正面' },
  { rank: 3, opinion: '客户端频繁闪退，严重影响体验', interactions: '8.4w', sentiment: '负面' },
  { rank: 4, opinion: '希望推出更多现代风格的休闲外观', interactions: '7.1w', sentiment: '中性' },
  { rank: 5, opinion: '周年庆福利丰厚，官方诚意满满', interactions: '6.8w', sentiment: '正面' },
  { rank: 6, opinion: 'PVP职业平衡性需要进一步调整', interactions: '5.5w', sentiment: '负面' },
  { rank: 7, opinion: '主线剧情更新太慢，催更', interactions: '4.9w', sentiment: '中性' },
  { rank: 8, opinion: '新副本难度适中，机制有趣', interactions: '4.2w', sentiment: '正面' },
  { rank: 9, opinion: '交易行物价波动过大，建议管控', interactions: '3.8w', sentiment: '负面' },
  { rank: 10, opinion: '同人创作激励计划很棒，支持', interactions: '3.1w', sentiment: '正面' },
];

interface GlobalDashboardProps {
  onNavigateToReport?: (date: string) => void;
}

export default function GlobalDashboard({ onNavigateToReport }: GlobalDashboardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number, y: number } | null>(null);
  
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[3]);
  // Changed to array for multi-select
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['全部']);
  const [selectedTimeRange, setSelectedTimeRange] = useState(TIME_RANGES[2]);
  const [dataSource, setDataSource] = useState<'all' | 'official' | 'ugc'>('all');
  const [showToast, setShowToast] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const getTimeDimensionText = () => {
    const today = new Date();
    const formatDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    if (selectedTimeRange === '今天') {
      return `${formatDate(today)} 至 ${formatDate(today)}`;
    } else if (selectedTimeRange === '昨天') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return `${formatDate(yesterday)} 至 ${formatDate(yesterday)}`;
    } else if (selectedTimeRange === '近7天') {
      const past = new Date(today);
      past.setDate(past.getDate() - 6);
      return `${formatDate(past)} 至 ${formatDate(today)}`;
    } else if (selectedTimeRange === '近30天') {
      const past = new Date(today);
      past.setDate(past.getDate() - 29);
      return `${formatDate(past)} 至 ${formatDate(today)}`;
    } else {
      return '自定义时间段';
    }
  };

  const reportTitle = selectedPlatforms.length === 1 && selectedPlatforms[0] !== '全部'
    ? `逆水寒手游 - ${selectedPlatforms[0]}平台洞察报告`
    : `逆水寒手游 - 全局洞察报告`;

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;
    setShowToast(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${reportTitle}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to generate report image", error);
    }
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGenerateReport = () => {
    setShowPreviewModal(true);
  };

  const confirmGenerateReport = () => {
    setShowPreviewModal(false);
    if (onNavigateToReport) {
      onNavigateToReport('今天');
    }
  };

  const timeMultiplier = React.useMemo(() => {
    switch(selectedTimeRange) {
      case '今天': return 0.15;
      case '昨天': return 0.2;
      case '近7天': return 1;
      case '近30天': return 4.2;
      case '自定义': return 1.5;
      default: return 1;
    }
  }, [selectedTimeRange]);

  const chartData = React.useMemo(() => {
    return TREND_DATA.map(d => ({
      ...d,
      小红书: Math.floor(d.小红书 * timeMultiplier),
      抖音: Math.floor(d.抖音 * timeMultiplier),
      微博: Math.floor(d.微博 * timeMultiplier),
      微信公众号: Math.floor(d.微信公众号 * timeMultiplier),
    }));
  }, [timeMultiplier]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      setSelectedDate(data.activeLabel);
      if (data.activeCoordinate) {
        setTooltipPos({ x: data.activeCoordinate.x, y: data.activeCoordinate.y });
      } else {
        setTooltipPos({ x: 200, y: 150 });
      }
    }
  };

  const handleNavigateToReport = () => {
    if (selectedDate && onNavigateToReport) {
      onNavigateToReport(selectedDate);
    }
    setTooltipPos(null);
  };

  const togglePlatform = (platform: string) => {
    if (platform === '全部') {
      setSelectedPlatforms(['全部']);
      return;
    }

    let newPlatforms = [...selectedPlatforms];
    if (newPlatforms.includes('全部')) {
      newPlatforms = [];
    }

    if (newPlatforms.includes(platform)) {
      newPlatforms = newPlatforms.filter(p => p !== platform);
    } else {
      newPlatforms.push(platform);
    }

    if (newPlatforms.length === 0) {
      newPlatforms = ['全部'];
    }

    setSelectedPlatforms(newPlatforms);
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-8 pb-12 pt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-500 mb-1">官号运营</span>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-black text-[#111111]">逆水寒手游</span>
            <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded">全局洞察</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-gray-500 whitespace-nowrap">时间</span>
            <div className="relative">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]/20 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
              >
                {TIME_RANGES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            
            {selectedTimeRange === '自定义' && (
              <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-left-2 duration-300">
                <input type="datetime-local" className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#111111]/20 text-gray-600" />
                <span className="text-gray-400 font-medium">至</span>
                <input type="datetime-local" className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#111111]/20 text-gray-600" />
              </div>
            )}
          </div>

          <button 
            type="button"
            onClick={handleGenerateReport}
            className="flex items-center bg-[#111111] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            生成报告
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-sm font-bold text-gray-500 whitespace-nowrap">平台</span>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(p => {
            const isSelected = selectedPlatforms.includes(p);
            return (
              <button 
                type="button"
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  isSelected 
                    ? 'bg-[#111111] text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Core Metrics & Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: 总览 & Metrics */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-[#111111] flex items-center">总览</h3>
            </div>
            
            {/* Core Metrics Monitoring */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <MetricCard 
                title="总内容数" 
                value={formatNumber(45210 * timeMultiplier)} 
                trend="-3.2%" 
                isPositive={false} 
                tooltipContent={
                  <div className="space-y-1">
                    <p>所选平台和时段内，标题/正文/标签中出现了品牌关键词的内容的数量</p>
                  </div>
                }
                platformBreakdown={
                  selectedPlatforms.includes('全部') ? [
                    { name: '小红书', percentage: 45, valueText: `${formatNumber(20344 * timeMultiplier)}条` },
                    { name: '抖音', percentage: 30, valueText: `${formatNumber(13563 * timeMultiplier)}条` },
                    { name: '微博', percentage: 15, valueText: `${formatNumber(6781 * timeMultiplier)}条` },
                    { name: '微信公众号', percentage: 10, valueText: `${formatNumber(4522 * timeMultiplier)}条` }
                  ] : selectedPlatforms.map(p => ({
                    name: p,
                    percentage: Math.floor(100 / selectedPlatforms.length),
                    valueText: `${formatNumber(Math.floor(45210 * timeMultiplier / selectedPlatforms.length))}条`
                  }))
                }
              />
              <MetricCard 
                title="总互动量" 
                value={formatNumber(892104 * timeMultiplier)} 
                trend="+24.8%" 
                isPositive={true} 
                tooltipContent={
                  <div className="space-y-1">
                    <p><strong>【小红书】</strong>点赞+转发+评论</p>
                    <p><strong>【抖音】</strong>点赞+转发+评论+收藏</p>
                    <p><strong>【微信公众号】</strong>阅读+点赞+在看</p>
                    <p><strong>【微博】</strong>点赞+评论+转发</p>
                  </div>
                }
                platformBreakdown={
                  selectedPlatforms.includes('全部') ? [
                    { name: '小红书', percentage: 52, valueText: `${formatNumber(463894 * timeMultiplier)}次` },
                    { name: '抖音', percentage: 28, valueText: `${formatNumber(249789 * timeMultiplier)}次` },
                    { name: '微博', percentage: 12, valueText: `${formatNumber(107052 * timeMultiplier)}次` },
                    { name: '微信公众号', percentage: 8, valueText: `${formatNumber(71369 * timeMultiplier)}次` }
                  ] : selectedPlatforms.map(p => ({
                    name: p,
                    percentage: Math.floor(100 / selectedPlatforms.length),
                    valueText: `${formatNumber(Math.floor(892104 * timeMultiplier / selectedPlatforms.length))}次`
                  }))
                }
              />
              <MetricCard 
                title="爆款内容数" 
                value={formatNumber(1204 * timeMultiplier)} 
                trend="+12.5%" 
                isPositive={true} 
                tooltipContent={
                  <div className="space-y-1">
                    <p>点赞超过1000的内容数量</p>
                  </div>
                }
                platformBreakdown={
                  selectedPlatforms.includes('全部') ? [
                    { name: '小红书', percentage: 60, valueText: `${formatNumber(722 * timeMultiplier)}条` },
                    { name: '抖音', percentage: 25, valueText: `${formatNumber(301 * timeMultiplier)}条` },
                    { name: '微博', percentage: 10, valueText: `${formatNumber(120 * timeMultiplier)}条` },
                    { name: '微信公众号', percentage: 5, valueText: `${formatNumber(61 * timeMultiplier)}条` }
                  ] : selectedPlatforms.map(p => ({
                    name: p,
                    percentage: Math.floor(100 / selectedPlatforms.length),
                    valueText: `${formatNumber(Math.floor(1204 * timeMultiplier / selectedPlatforms.length))}条`
                  }))
                }
              />
              <MetricCard 
                title="社媒健康度" 
                value="78.5" 
                trend="+5.4%" 
                isPositive={true} 
                tooltipContent={
                  <div className="space-y-1">
                    <p>该值越大，品牌正面声誉越高</p>
                    <p>计算方式为 (正面内容数-负面内容数)/(正面内容数+负面内容数)</p>
                    <p className="text-gray-400 mt-2">注：需要完成品牌内容情感倾向分析才能得到准确数据。</p>
                  </div>
                }
                platformBreakdown={
                  selectedPlatforms.includes('全部') ? [
                    { name: '小红书', percentage: 82, valueText: '82.0' },
                    { name: '抖音', percentage: 75, valueText: '75.0' },
                    { name: '微博', percentage: 68, valueText: '68.0' },
                    { name: '微信公众号', percentage: 85, valueText: '85.0' }
                  ] : selectedPlatforms.map(p => ({
                    name: p,
                    percentage: 78,
                    valueText: '78.5'
                  }))
                }
              />
            </div>
          </div>

          {/* Right: Trend Chart Section */}
          <div className="lg:col-span-7 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8 relative">
            {tooltipPos && selectedDate && (
              <div 
                className="absolute z-50 bg-white border border-gray-200 shadow-xl rounded-xl p-4 flex flex-col items-center animate-in fade-in zoom-in-95"
                style={{ left: tooltipPos.x, top: tooltipPos.y - 80, transform: 'translate(-50%, -100%)' }}
              >
                <div className="text-sm font-bold text-gray-800 mb-3">{selectedDate} 数据异常波动</div>
                <button 
                  type="button"
                  onClick={handleNavigateToReport}
                  className="bg-[#111111] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors w-full flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>查看当日智能日报</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setTooltipPos(null)}
                  className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  关闭
                </button>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-[#111111]">声量趋势</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <select className="appearance-none pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#111111]/20 shadow-sm cursor-pointer">
                    <option>总内容数</option>
                    <option>总互动量</option>
                    <option>爆款内容数</option>
                    <option>社媒健康度</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData.slice(-7)}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  onClick={handleChartClick}
                >
                <defs>
                  <linearGradient id="colorXiaohongshu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B4C5C6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#B4C5C6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDouyin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#111111" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWeibo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82A7A6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#82A7A6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWechat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <Tooltip 
                  cursor={{ stroke: '#111111', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: '#111111', color: '#fff', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={48} iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('小红书')) && (
                  <Area type="monotone" dataKey="小红书" stroke="#B4C5C6" strokeWidth={2} fillOpacity={1} fill="url(#colorXiaohongshu)" activeDot={{ r: 6, strokeWidth: 0 }} isAnimationActive={false} />
                )}
                {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('抖音')) && (
                  <Area type="monotone" dataKey="抖音" stroke="#111111" strokeWidth={2} fillOpacity={1} fill="url(#colorDouyin)" activeDot={{ r: 6, strokeWidth: 0 }} isAnimationActive={false} />
                )}
                {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('微博')) && (
                  <Area type="monotone" dataKey="微博" stroke="#82A7A6" strokeWidth={2} fillOpacity={1} fill="url(#colorWeibo)" activeDot={{ r: 6, strokeWidth: 0 }} isAnimationActive={false} />
                )}
                {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('微信公众号')) && (
                  <Area type="monotone" dataKey="微信公众号" stroke="#9CA3AF" strokeWidth={2} fillOpacity={1} fill="url(#colorWechat)" activeDot={{ r: 6, strokeWidth: 0 }} isAnimationActive={false} />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>

      {/* Section 3: AI Analysis */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Sentiment */}
        <div className="flex flex-col pr-8 border-r border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-[#111111] flex items-center">
              <Heart className="w-5 h-5 text-[#639FAB] mr-2" />
              整体大盘情绪
            </h3>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="w-full h-3 rounded-full flex overflow-hidden mb-8 shadow-inner">
              <div className="h-full bg-[#65a381] transition-all duration-500" style={{ width: '65%' }}></div>
              <div className="h-full bg-gray-200 transition-all duration-500" style={{ width: '25%' }}></div>
              <div className="h-full bg-[#D96C6C] transition-all duration-500" style={{ width: '10%' }}></div>
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-[#65a381]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#65a381]/20 transition-colors">
                  <Smile className="w-5 h-5 text-[#65a381]" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-bold text-gray-800">正面情绪</span>
                    <span className="text-lg font-black tabular-nums text-[#65a381]">65%</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    玩家对<span className="font-medium text-gray-700">新角色技能设计</span>及<span className="font-medium text-gray-700">周年庆福利</span>反馈极佳，相关讨论占正面声量的 72%。
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                  <Meh className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-bold text-gray-800">中性情绪</span>
                    <span className="text-lg font-black tabular-nums text-gray-600">25%</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    主要集中在<span className="font-medium text-gray-700">新手攻略求助</span>与<span className="font-medium text-gray-700">外观穿搭分享</span>，属于常规社区交流，无明显情感倾向。
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-[#D96C6C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D96C6C]/20 transition-colors">
                  <Frown className="w-5 h-5 text-[#D96C6C]" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-bold text-gray-800">负面情绪</span>
                    <span className="text-lg font-black tabular-nums text-[#D96C6C]">10%</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    核心痛点为<span className="font-medium text-gray-700">日常任务过肝</span>与<span className="font-medium text-gray-700">客户端闪退</span>，这两类问题占负面声量的 85%，需重点关注。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Heat Ranking */}
        <div className="flex flex-col px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#111111] flex items-center">
              <Flame className="w-5 h-5 text-[#D96C6C] mr-2" />
              话题热度排行 Top 10
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[320px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {TOPICS.map((topic, idx) => {
              const heatNum = parseFloat(topic.heat);
              const adjustedHeat = (heatNum * timeMultiplier).toFixed(1) + 'w';
              return (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    idx === 0 ? 'bg-[#F5A623] text-white' : 
                    idx === 1 ? 'bg-[#9B9B9B] text-white' : 
                    idx === 2 ? 'bg-[#A0522D] text-white' : 
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {topic.rank}
                  </span>
                  <span className="text-sm font-bold text-[#111111] line-clamp-1">{topic.tag}</span>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <span className="text-sm tabular-nums text-gray-600">{adjustedHeat}</span>
                  {topic.trend === 'up' ? <TrendingUp className="w-4 h-4 text-[#D96C6C]" /> : 
                   topic.trend === 'down' ? <TrendingDown className="w-4 h-4 text-[#65a381]" /> : 
                   <div className="w-4 h-px bg-gray-400"></div>}
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Player Frequent Topics */}
        <div className="flex flex-col pl-8 border-l border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#111111] flex items-center">
              <MessageSquare className="w-5 h-5 text-[#111111] mr-2" />
              玩家频繁讨论话题 Top 10
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[320px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {FREQUENT_TOPICS.map((topic, idx) => {
              const intNum = parseFloat(topic.interactions);
              const adjustedInt = (intNum * timeMultiplier).toFixed(1) + 'w';
              return (
              <div 
                key={idx} 
                className="relative p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-start space-x-2 mb-2">
                  <span className="text-xs font-bold text-gray-400 mt-0.5">{idx + 1}.</span>
                  <span className="text-sm font-bold text-gray-800 leading-snug">
                    {topic.opinion}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 pl-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Heart className="w-3 h-3 mr-1" />
                    <span className="tabular-nums">{adjustedInt} 互动</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    topic.sentiment === '正面' ? 'bg-[#65a381]/10 text-[#65a381]' :
                    topic.sentiment === '负面' ? 'bg-[#D96C6C]/10 text-[#D96C6C]' :
                    'bg-gray-200 text-gray-600'
                  }`}>{topic.sentiment}</span>
                </div>
              </div>
            )})}
          </div>
        </div>
        </div>
      </div>

      {/* Drill-down Modal */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl max-h-[85vh] flex flex-col transform transition-all duration-300 scale-100 animate-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#111111]">{selectedDate} 热门贴文</h2>
              <button 
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-[#111111] rounded">小红书</span>
                    <span className="text-xs text-gray-400 tabular-nums">10:24</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2 line-clamp-2">
                    春季穿搭分享｜这件外套真的太绝了，完全长在我的审美上！
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 tabular-nums">
                    <span className="flex items-center"><Heart className="w-3 h-3 mr-1" /> 1.2w</span>
                    <span className="flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> 342</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#111111] text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[#65a381]" />
            <span className="text-sm font-medium">报告已生成并开始下载</span>
          </div>
        </div>
      )}

      {/* Report View Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-bold text-[#111111]">全局洞察报告</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {selectedTimeRange} · {selectedPlatforms.join(', ')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  onClick={handleDownloadReport}
                  className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  下载报告
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    // Mock push to Feishu
                    alert('已成功推送至飞书群组');
                  }}
                  className="flex items-center px-4 py-2 bg-[#111111] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors shadow-sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  推送至飞书
                </button>
                <button 
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
              <div ref={reportRef} className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-100 rounded-xl p-10 min-h-full">
                {/* Report Header */}
                <div className="text-center mb-12 border-b border-gray-100 pb-8">
                  <h1 className="text-3xl font-black text-[#111111] mb-2">{reportTitle}</h1>
                  <p className="text-gray-500">{getTimeDimensionText()}</p>
                </div>

                {/* Report Content - Visualized */}
                <div className="space-y-12">
                  {/* 1. Core Metrics */}
                  <section>
                    <h2 className="text-xl font-bold text-[#111111] mb-6 flex items-center">
                      <span className="w-1.5 h-6 bg-[#111111] rounded-full mr-3"></span>
                      总览
                    </h2>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500 mb-1">总内容数</div>
                        <div className="text-xl font-black text-[#111111]">{formatNumber(45210 * timeMultiplier)}</div>
                        <div className="text-xs text-red-500 mt-1 flex items-center justify-center">
                          <TrendingDown className="w-3 h-3 mr-1" /> 3.2%
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500 mb-1">总互动量</div>
                        <div className="text-xl font-black text-[#111111]">{formatNumber(892104 * timeMultiplier)}</div>
                        <div className="text-xs text-[#65a381] mt-1 flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 mr-1" /> 24.8%
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500 mb-1">爆款内容数</div>
                        <div className="text-xl font-black text-[#111111]">{formatNumber(1204 * timeMultiplier)}</div>
                        <div className="text-xs text-[#65a381] mt-1 flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 mr-1" /> 12.5%
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500 mb-1">社媒健康度</div>
                        <div className="text-xl font-black text-[#111111]">78.5</div>
                        <div className="text-xs text-[#65a381] mt-1 flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 mr-1" /> 5.4%
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 2. Volume Trend */}
                  <section>
                    <h2 className="text-xl font-bold text-[#111111] mb-6 flex items-center">
                      <span className="w-1.5 h-6 bg-[#111111] rounded-full mr-3"></span>
                      声量趋势
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-xl h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData.slice(-7)}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorXiaohongshu" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#B4C5C6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#B4C5C6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorDouyin" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#111111" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorWeibo" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82A7A6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#82A7A6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorWechat" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#111111', color: '#fff', borderRadius: '8px', border: 'none' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Legend verticalAlign="bottom" height={48} iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                          {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('小红书')) && (
                            <Area type="monotone" dataKey="小红书" stroke="#B4C5C6" strokeWidth={2} fillOpacity={1} fill="url(#colorXiaohongshu)" isAnimationActive={false} />
                          )}
                          {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('抖音')) && (
                            <Area type="monotone" dataKey="抖音" stroke="#111111" strokeWidth={2} fillOpacity={1} fill="url(#colorDouyin)" isAnimationActive={false} />
                          )}
                          {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('微博')) && (
                            <Area type="monotone" dataKey="微博" stroke="#82A7A6" strokeWidth={2} fillOpacity={1} fill="url(#colorWeibo)" isAnimationActive={false} />
                          )}
                          {(selectedPlatforms.includes('全部') || selectedPlatforms.includes('微信公众号')) && (
                            <Area type="monotone" dataKey="微信公众号" stroke="#9CA3AF" strokeWidth={2} fillOpacity={1} fill="url(#colorWechat)" isAnimationActive={false} />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </section>

                  {/* 3. Sentiment Analysis */}
                  <section>
                    <h2 className="text-xl font-bold text-[#111111] mb-6 flex items-center">
                      <span className="w-1.5 h-6 bg-[#111111] rounded-full mr-3"></span>
                      整体大盘情绪
                    </h2>
                    <div className="flex items-center space-x-8 bg-gray-50 p-6 rounded-xl">
                      <div className="w-40 h-40 flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: '正面', value: 65, color: '#65a381' },
                                { name: '中性', value: 25, color: '#9CA3AF' },
                                { name: '负面', value: 10, color: '#D96C6C' }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={50}
                              dataKey="value"
                            >
                              {[
                                { name: '正面', value: 65, color: '#65a381' },
                                { name: '中性', value: 25, color: '#9CA3AF' },
                                { name: '负面', value: 10, color: '#D96C6C' }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold text-[#65a381]">正面情绪 (65%)</span>
                          </div>
                          <p className="text-xs text-gray-600">玩家对新角色技能设计及周年庆福利反馈极佳。</p>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold text-[#D96C6C]">负面情绪 (10%)</span>
                          </div>
                          <p className="text-xs text-gray-600">核心痛点为日常任务过肝与客户端闪退，需重点关注。</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 4. Hot Topics */}
                  <section>
                    <h2 className="text-xl font-bold text-[#111111] mb-6 flex items-center">
                      <span className="w-1.5 h-6 bg-[#111111] rounded-full mr-3"></span>
                      话题热度排行 Top 10
                    </h2>
                    <div className="space-y-3">
                      {TOPICS.map((topic, idx) => {
                        const heatNum = parseFloat(topic.heat);
                        const adjustedHeat = (heatNum * timeMultiplier).toFixed(1) + 'w';
                        return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              idx === 0 ? 'bg-[#F5A623]' : idx === 1 ? 'bg-[#9B9B9B]' : idx === 2 ? 'bg-[#A0522D]' : 'bg-gray-300 text-gray-700'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="text-sm font-bold text-[#111111]">{topic.tag}</span>
                          </div>
                          <span className="text-sm text-gray-600">{adjustedHeat} 热度</span>
                        </div>
                      )})}
                    </div>
                  </section>

                  {/* 5. Player Frequent Topics */}
                  <section>
                    <h2 className="text-xl font-bold text-[#111111] mb-6 flex items-center">
                      <span className="w-1.5 h-6 bg-[#111111] rounded-full mr-3"></span>
                      玩家频繁讨论话题 Top 10
                    </h2>
                    <div className="space-y-3">
                      {FREQUENT_TOPICS.map((topic, idx) => {
                        const intNum = parseFloat(topic.interactions);
                        const adjustedInt = (intNum * timeMultiplier).toFixed(1) + 'w';
                        return (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex items-start space-x-3 mb-2">
                            <span className="text-sm font-bold text-gray-400 mt-0.5">{idx + 1}.</span>
                            <span className="text-sm font-bold text-[#111111] leading-snug">
                              {topic.opinion}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pl-6">
                            <span className="text-xs text-gray-500">{adjustedInt} 互动</span>
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                              topic.sentiment === '正面' ? 'bg-[#65a381]/10 text-[#65a381]' :
                              topic.sentiment === '负面' ? 'bg-[#D96C6C]/10 text-[#D96C6C]' :
                              'bg-gray-200 text-gray-600'
                            }`}>{topic.sentiment}</span>
                          </div>
                        </div>
                      )})}
                    </div>
                  </section>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
                  <p>生成时间：{new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, trend, isPositive, tooltipContent, platformBreakdown }: { title: string, value: string, trend: string, isPositive: boolean, tooltipContent?: React.ReactNode, platformBreakdown?: { name: string, percentage: number, valueText: string }[] }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">{title}</h3>
            {tooltipContent && (
              <div className="relative">
                <button 
                  type="button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
                {showTooltip && (
                  <div className="absolute z-20 w-64 p-3 mt-2 text-xs text-gray-600 bg-white border border-gray-100 rounded-lg shadow-xl -left-2 top-full animate-in fade-in zoom-in-95 pointer-events-none">
                    {tooltipContent}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-baseline space-x-3 mb-3">
          <span className="text-2xl font-bold text-[#111111] tabular-nums tracking-normal">{value}</span>
          <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-[#65a381]' : 'text-[#D96C6C]'} bg-opacity-10 px-1.5 py-0.5 rounded ${isPositive ? 'bg-[#65a381]/10' : 'bg-[#D96C6C]/10'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
            {trend}
          </div>
        </div>
        {platformBreakdown && (
          <div className="space-y-1.5 pt-3 border-t border-gray-50">
            {platformBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="text-gray-500">{item.name}</span>
                  <span className="font-medium text-gray-700 tabular-nums">{item.percentage}%</span>
                </div>
                <span className="text-gray-400 tabular-nums">{item.valueText}</span>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
