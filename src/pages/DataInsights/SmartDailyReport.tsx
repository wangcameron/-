import React, { useState, useEffect } from 'react';
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
  Share2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell,
  PieChart as RechartsPieChart,
  Pie
} from 'recharts';

interface SmartDailyReportProps {
  initialDate?: string | null;
}

const PLATFORMS = ['全平台', '小红书', '抖音', '微博', '微信公众号'];

export default function SmartDailyReport({ initialDate }: SmartDailyReportProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('全平台');
  const [selectedDate, setSelectedDate] = useState(initialDate || '2023-10-15');
  const [viewMode, setViewMode] = useState<'overview' | 'post_analysis'>('overview');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [postTab, setPostTab] = useState<'ai_analysis' | 'comments'>('ai_analysis');
  const [showToast, setShowToast] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [contentListPlatform, setContentListPlatform] = useState('全部');

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const handleGenerateReport = () => {
    setShowPreviewModal(true);
  };

  const confirmGenerateReport = () => {
    setShowPreviewModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderAnalysisTemplate = () => (
    <div className="space-y-8">
      {/* 一、基础数据 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-6 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2 text-[#4A6B82]" />
          一、基础数据
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">总评论数</div>
            <div className="text-xl font-black text-[#111111]">3,421</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">时间范围</div>
            <div className="text-sm font-bold text-[#111111] mt-1">10-15 10:00<br/>至 10-16 09:30</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">最高点赞数</div>
            <div className="text-xl font-black text-[#111111]">1.2w</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">平均/中位数点赞</div>
            <div className="text-xl font-black text-[#111111]">45 / 12</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">IP分布 Top 5</div>
            <div className="text-sm font-bold text-[#111111] mt-1">广东, 浙江, 江苏, 四川, 北京</div>
          </div>
        </div>
      </div>

      {/* 二、核心议题 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-6 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-[#4A6B82]" />
          二、核心议题
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">议题</th>
                <th className="p-3 font-medium">频次</th>
                <th className="p-3 font-medium w-1/3">典型观点（原话摘录）</th>
                <th className="p-3 font-medium rounded-tr-lg">可转化的传播角度</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">新时装美术风格</td>
                <td className="p-3 text-[#4A6B82] font-medium">1,250</td>
                <td className="p-3 text-gray-600">"这次的美术真的绝了，疯狂打call！"<br/>"买爆！这衣服太仙了"</td>
                <td className="p-3 text-gray-600">从"国风审美"角度切入，强调游戏美术的文化底蕴。</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">日常任务肝度</td>
                <td className="p-3 text-[#4A6B82] font-medium">890</td>
                <td className="p-3 text-gray-600">"这日常任务也太肝了吧，每天上班一样"<br/>"能不能出个扫荡功能？"</td>
                <td className="p-3 text-gray-600">收集玩家减负建议，作为后续"听劝"人设的素材。</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">客户端稳定性</td>
                <td className="p-3 text-[#4A6B82] font-medium">420</td>
                <td className="p-3 text-gray-600">"更新后疯狂闪退，打个本掉线三次"<br/>"优化是怎么做的？"</td>
                <td className="p-3 text-gray-600">发布技术优化进度说明，安抚情绪。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 三、玩家/用户画像 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-6 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-[#4A6B82]" />
          三、玩家/用户画像
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">群体</th>
                <th className="p-3 font-medium">立场</th>
                <th className="p-3 font-medium rounded-tr-lg">典型表达（原话摘录）</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">外观党/风景党</td>
                <td className="p-3 text-green-600 font-medium">极度认可</td>
                <td className="p-3 text-gray-600">"谁能拒绝这么好看的小裙子！"、"为了这套衣服回坑了"</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">强度党/副本玩家</td>
                <td className="p-3 text-red-500 font-medium">不满/焦虑</td>
                <td className="p-3 text-gray-600">"光出衣服不修bug是吧"、"新本机制太恶心了，牢底坐穿"</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">微氪/零氪玩家</td>
                <td className="p-3 text-yellow-600 font-medium">观望/吐槽</td>
                <td className="p-3 text-gray-600">"福利给的太少了，白嫖党活不下去"、"这期战令性价比不高"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 四、高频关键词/梗 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-[#111111] flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[#4A6B82]" />
            四、高频关键词/梗
          </h3>
          <a href="https://dcnre1vzubju.feishu.cn/wiki/EOsMwtrabiWkS3kFsEocffmLnFD?fromScene=spaceOverview&table=tbluKm6D8jd6WtsX&view=vewT4Ez58R" target="_blank" rel="noreferrer" className="text-xs text-[#4A6B82] hover:underline flex items-center">
            社区黑话名词库 <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs text-yellow-800 flex items-start">
          <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
          <div>
            <strong>注意：</strong> 本模块识别出的新黑话/关键词，在填写进"社区黑话名词库"多维表格前，<strong>必须先与用户确认</strong>。带有 <span className="inline-block w-2 h-2 rounded-full bg-red-500 mx-1"></span> 标记的为新发现词汇。
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">关键词</th>
                <th className="p-3 font-medium rounded-tr-lg">含义/解释</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111] flex items-center">
                  牢底坐穿 <span className="ml-2 w-2 h-2 rounded-full bg-red-500" title="新发现词汇，待确认"></span>
                </td>
                <td className="p-3 text-gray-600">形容在新副本中反复开荒失败，耗费大量时间，像坐牢一样。</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">血河小狗</td>
                <td className="p-3 text-gray-600">指代游戏中血河流派的某种宠物或特定外观，因其独特的"贱萌"斜眼bug而爆火出圈。</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111] flex items-center">
                  背刺 <span className="ml-2 w-2 h-2 rounded-full bg-red-500" title="新发现词汇，待确认"></span>
                </td>
                <td className="p-3 text-gray-600">指官方突然推出更优惠的活动或更强力的道具，导致之前投入的玩家感到利益受损。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 五、情绪分布 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-6 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-[#4A6B82]" />
          五、情绪分布
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">情绪</th>
                <th className="p-3 font-medium">占比估算</th>
                <th className="p-3 font-medium rounded-tr-lg">典型表达</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#65a381]">正面认可</td>
                <td className="p-3 text-[#111111] font-medium">65%</td>
                <td className="p-3 text-gray-600">"这波必须赞一个！"、"美工加鸡腿"</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#D96C6C]">负面吐槽</td>
                <td className="p-3 text-[#111111] font-medium">20%</td>
                <td className="p-3 text-gray-600">"又肝又氪"、"优化是怎么做的？"</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#9CA3AF]">中立吃瓜/疑问</td>
                <td className="p-3 text-[#111111] font-medium">10%</td>
                <td className="p-3 text-gray-600">"等实际上线体验一下再说"、"有没有大佬出个攻略？"</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-orange-500">自嘲调侃</td>
                <td className="p-3 text-[#111111] font-medium">5%</td>
                <td className="p-3 text-gray-600">"我是韭菜我先冲"、"又到了我最喜欢的坐牢环节"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 六、洞察总结 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-6 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[#4A6B82]" />
          六、洞察总结
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-[#111111] mb-3 bg-gray-100 inline-block px-3 py-1 rounded">核心洞察</h4>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p>
                <strong>外观党与强度党的诉求割裂加剧。</strong> 评论区呈现出明显的两极分化：一方面，外观党对新时装的美术表现给予了极高评价，"买爆"、"仙气"等词汇高频出现，展现出强烈的付费意愿；另一方面，强度党对日常任务的"肝度"和新副本的难度表达了强烈不满，"上班"、"牢底坐穿"等负面情绪蔓延。这种割裂提示我们在后续运营中，需要平衡不同圈层玩家的体验，避免"顾此失彼"。
              </p>
              <p>
                <strong>"听劝"人设面临信任危机。</strong> 针对客户端闪退和卡顿问题，玩家的负面情绪不仅停留在技术层面，更上升到了对官方态度的质疑。部分高赞评论提到"光出衣服不修bug"，反映出玩家认为官方在商业化和基础体验优化上存在资源分配不均。这说明前期的"听劝"人设正在被消耗，亟需一次真诚的技术优化沟通来挽回信任。
              </p>
              <p>
                <strong>"血河小狗"效应的启示：缺陷美学带来的意外破圈。</strong> 评论区多次提到"我不玩逆水寒但在用血河小狗表情包"——这说明影响力已脱离游戏本体。血河小狗的核心竞争力不是"萌"，而是"贱"。这种斜眼bug让血河小狗从"可爱"升维到"有趣"，后者的传播力远大于前者。企鹅圈圈眼的遗憾说明玩家社区对"bug转正"的态度非常宽容，甚至期待。未来如果出现类似的"可爱bug"，官方应该更谨慎地评估是否修复。
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#111111] mb-3 bg-gray-100 inline-block px-3 py-1 rounded">一句话总结</h4>
            <div className="text-base font-bold text-[#4A6B82] bg-blue-50 p-4 rounded-lg border border-blue-100 italic">
              "新时装的'美'掩盖不了基础体验的'痛'，在利用'血河小狗'等意外IP破圈的同时，亟需通过实质性的减负和优化来弥合玩家圈层的割裂。"
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => {
    const isAll = selectedPlatform === '全平台';
    const platformsToRender = isAll ? ['小红书', '抖音', '微博', '微信公众号'] : [selectedPlatform];

    return (
    <div className="space-y-6">
      {/* Anchor Nav */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button type="button" onClick={() => document.getElementById('data-section')?.scrollIntoView({ behavior: 'smooth' })} className="pb-3 text-sm font-bold text-[#4A6B82] border-b-2 border-[#4A6B82]">展示数据</button>
        <button type="button" onClick={() => document.getElementById('content-list-section')?.scrollIntoView({ behavior: 'smooth' })} className="pb-3 text-sm font-medium text-gray-500 hover:text-[#111111] transition-colors">发布内容列表</button>
      </div>

      <div id="data-section" className="space-y-6">
        {isAll ? (
          <>
            {/* 概览 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-[#111111] mb-6 flex items-center">
                <BarChart2 className="w-5 h-5 mr-2 text-[#4A6B82]" />
                概览
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 mb-2">发布内容总数</div>
                  <div className="text-3xl font-black text-[#111111] mb-2">24<span className="text-sm font-medium text-gray-500 ml-1">条</span></div>
                  <div className="text-xs text-gray-600 bg-white/60 px-2 py-1 rounded inline-block">
                    小红书 10 · 抖音 8 · 微博 4 · 微信公众号 2
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 mb-2">平台互动总量</div>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-3xl font-black text-[#111111]">12.5w</span>
                    <span className="flex items-center text-xs font-bold text-[#65a381] bg-white/60 px-1.5 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> 15%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">相比前日同期</div>
                </div>
                <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 mb-2">情绪变化趋势</div>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-3xl font-black text-[#65a381]">向好</span>
                    <span className="flex items-center text-xs font-bold text-[#65a381] bg-white/60 px-1.5 py-0.5 rounded">
                      正面占比 +5%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">相比前日同期</div>
                </div>
                <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 mb-2">新增热点话题</div>
                  <div className="text-lg font-black text-[#111111] truncate mb-2">#新版本福利#</div>
                  <div className="text-xs text-gray-600 bg-white/60 px-2 py-1 rounded inline-block">讨论量 5.2w</div>
                </div>
              </div>

              {/* 需关注事项 */}
              <div className="bg-white p-6 rounded-xl border border-[#D96C6C]/30 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D96C6C]"></div>
                <h2 className="text-lg font-bold text-[#111111] mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-[#D96C6C]" />
                  需关注事项
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D96C6C] mt-1.5 shrink-0"></span>
                    <span><strong>高赞负面评论预警：</strong>微博平台出现一条关于“暗改掉率”的评论，点赞数已突破 5000，需尽快核实并回应。</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D96C6C] mt-1.5 shrink-0"></span>
                    <span><strong>互动量异常下降：</strong>小红书昨日发布的图文互动量较平均水平下降 40%，建议分析内容是否偏离受众喜好。</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 平台分析 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-[#111111] mb-6 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-[#4A6B82]" />
                  平台分析
                </h2>
                <div className="space-y-4 h-[320px] overflow-y-auto pr-2">
                  {platformsToRender.map((platform, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 border border-gray-100 rounded-lg cursor-pointer hover:border-[#4A6B82] hover:shadow-md transition-all group"
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[#111111] group-hover:text-[#4A6B82] transition-colors">{platform}</span>
                        <span className="text-xs text-gray-500">发布 {5 - idx} 条内容</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        <span className="font-medium text-gray-800">内容摘要：</span>
                        主要围绕新版本预热、角色立绘首曝及转发抽奖活动展开。
                      </p>
                      <div className="text-sm text-gray-600 bg-blue-50/50 p-2 rounded">
                        <span className="font-medium text-blue-800">智能分析：</span>
                        该平台今日共发布{5 - idx}篇文章，累计获得{3.2 - idx * 0.5}w互动量，整体表现优异。玩家对新角色立绘满意度极高，但部分玩家对抽奖机制表示疑虑。
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 玩家核心诉求Top5 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-[#111111] mb-6 flex items-center">
                  <ThumbsUp className="w-5 h-5 mr-2 text-[#4A6B82]" />
                  玩家核心诉求 Top 5
                </h2>
                <div className="space-y-4 h-[320px] overflow-y-auto pr-2">
                  {[
                    { demand: '修复安卓端闪退问题', count: 1250 },
                    { demand: '增加日常任务一键扫荡', count: 980 },
                    { demand: '提升抽卡爆率', count: 850 },
                    { demand: '优化新角色技能手感', count: 620 },
                    { demand: '出更多男角色外观', count: 430 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx < 3 ? 'bg-[#4A6B82] text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-800">{item.demand}</span>
                      </div>
                      <span className="text-xs text-gray-500">提及 {item.count} 次</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 玩家情绪总览 & 玩家关注点归类 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 玩家情绪总览 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-[#111111] mb-6 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-[#4A6B82]" />
                  玩家情绪总览
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center justify-center h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: '正面 65%', value: 65, color: '#65a381' },
                            { name: '中性 20%', value: 20, color: '#9CA3AF' },
                            { name: '负面 15%', value: 15, color: '#D96C6C' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {
                            [
                              { name: '正面 65%', value: 65, color: '#65a381' },
                              { name: '中性 20%', value: 20, color: '#9CA3AF' },
                              { name: '负面 15%', value: 15, color: '#D96C6C' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))
                          }
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}%`, '占比']} />
                        <Legend verticalAlign="bottom" height={36}/>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">高赞评论 Top 5</h3>
                    <div className="space-y-3 h-[220px] overflow-y-auto pr-2">
                      <div className="text-xs text-gray-700 bg-white p-2 rounded shadow-sm border-l-2 border-[#65a381]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-[#65a381] font-bold"><Smile className="w-3 h-3 mr-1" /> 正面</span>
                          <span className="text-gray-400">👍 1.2w</span>
                        </div>
                        "新出的时装太美了吧！这波美术真的可以封神了，买爆！"
                      </div>
                      <div className="text-xs text-gray-700 bg-white p-2 rounded shadow-sm border-l-2 border-[#D96C6C]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-[#D96C6C] font-bold"><Frown className="w-3 h-3 mr-1" /> 负面</span>
                          <span className="text-gray-400">👍 9.8k</span>
                        </div>
                        "这日常任务也太肝了吧，每天上班一样，能不能出个扫荡功能？"
                      </div>
                      <div className="text-xs text-gray-700 bg-white p-2 rounded shadow-sm border-l-2 border-[#65a381]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-[#65a381] font-bold"><Smile className="w-3 h-3 mr-1" /> 正面</span>
                          <span className="text-gray-400">👍 8.5k</span>
                        </div>
                        "这次的剧情演出绝了，看得我热血沸腾，给文案加鸡腿！"
                      </div>
                      <div className="text-xs text-gray-700 bg-white p-2 rounded shadow-sm border-l-2 border-[#D96C6C]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-[#D96C6C] font-bold"><Frown className="w-3 h-3 mr-1" /> 负面</span>
                          <span className="text-gray-400">👍 7.5k</span>
                        </div>
                        "更新后疯狂闪退，打个本掉线三次，这优化是怎么做的？"
                      </div>
                      <div className="text-xs text-gray-700 bg-white p-2 rounded shadow-sm border-l-2 border-[#9CA3AF]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center text-gray-500 font-bold"><Meh className="w-3 h-3 mr-1" /> 中性</span>
                          <span className="text-gray-400">👍 4.1k</span>
                        </div>
                        "新副本机制有点复杂，有没有大佬出个详细的图文攻略？"
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 玩家关注点归类 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-[#111111] mb-6 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#4A6B82]" />
                  玩家关注点归类
                </h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: '玩法', count: 3200 },
                        { category: '美术', count: 2800 },
                        { category: '活动', count: 2100 },
                        { category: 'BUG', count: 1500 },
                        { category: '剧情', count: 900 },
                        { category: '运营', count: 600 },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: 'transparent'}} formatter={(value: number) => [value, '提及次数']} />
                      <Bar dataKey="count" fill="#4A6B82" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : (
          renderAnalysisTemplate()
        )}
      </div>

      {/* 发布内容列表 */}
      <div id="content-list-section" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-8 scroll-mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#111111]">发布内容列表</h2>
          {isAll && (
            <div className="flex space-x-2">
              {['全部', '小红书', '抖音', '微博', '微信公众号'].map(p => (
                <button 
                  type="button"
                  key={p} 
                  onClick={() => setContentListPlatform(p)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    contentListPlatform === p 
                      ? 'bg-[#111111] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="pb-4 font-medium">日期</th>
                <th className="pb-4 font-medium">平台</th>
                <th className="pb-4 font-medium">封面/标题</th>
                <th className="pb-4 font-medium">发布时间</th>
                <th className="pb-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: 1, platform: '小红书', title: '全新版本「幻梦之境」即将开启！福利大放送' },
                { id: 2, platform: '抖音', title: '新角色技能演示，这也太帅了吧！' },
                { id: 3, platform: '微博', title: '制作人面对面：关于近期优化的答疑' },
                { id: 4, platform: '微信公众号', title: '【深度解析】新版本剧情背后的故事' },
                { id: 5, platform: '小红书', title: '春季穿搭分享｜这件外套真的太绝了' }
              ]
              .filter(item => contentListPlatform === '全部' || item.platform === contentListPlatform)
              .map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-5 text-gray-600">2023-10-15</td>
                  <td className="py-5">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {item.platform}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center space-x-4">
                      <img src={`https://picsum.photos/seed/post${item.id}/100/100`} alt="cover" className="w-14 h-14 rounded-lg object-cover flex-shrink-0 shadow-sm" referrerPolicy="no-referrer" />
                      <span className="font-medium text-[#111111] line-clamp-2 max-w-md">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-5 text-gray-600">10:00:00</td>
                  <td className="py-5 text-right">
                    <button 
                      type="button"
                      onClick={() => {
                        setSelectedPost({ id: item.id, title: item.title, date: '2023-10-15 10:00:00' });
                        setViewMode('post_analysis');
                      }}
                      className="text-white bg-[#4A6B82] hover:bg-[#3A5A72] font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm whitespace-nowrap"
                    >
                      查看分析
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  };

  const renderPostAnalysis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          type="button"
          onClick={() => setViewMode('overview')}
          className="flex items-center text-gray-500 hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> 返回列表
        </button>
        <button type="button" className="flex items-center text-sm text-[#4A6B82] hover:underline">
          查看原文链接 <ExternalLink className="w-3 h-3 ml-1" />
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start space-x-6">
        <img src="https://picsum.photos/seed/post1/200/200" alt="cover" className="w-28 h-28 rounded-xl object-cover flex-shrink-0 shadow-sm" referrerPolicy="no-referrer" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#111111] mb-3">{selectedPost?.title}</h2>
          <div className="flex items-center space-x-6 mb-4">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{selectedPlatform === '全平台' ? '小红书' : selectedPlatform}</span>
            <span className="text-sm text-gray-500">{selectedPost?.date}</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center"><Heart className="w-4 h-4 mr-1.5 text-gray-400" /> 1.2w</div>
            <div className="flex items-center"><MessageSquare className="w-4 h-4 mr-1.5 text-gray-400" /> 342</div>
            <div className="flex items-center"><Share2 className="w-4 h-4 mr-1.5 text-gray-400" /> 156</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            type="button"
            className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${postTab === 'ai_analysis' ? 'text-[#4A6B82] border-b-2 border-[#4A6B82] bg-blue-50/30' : 'text-gray-500 hover:text-[#111111] hover:bg-gray-50'}`}
            onClick={() => setPostTab('ai_analysis')}
          >
            详细AI分析输出
          </button>
          <button 
            type="button"
            className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${postTab === 'comments' ? 'text-[#4A6B82] border-b-2 border-[#4A6B82] bg-blue-50/30' : 'text-gray-500 hover:text-[#111111] hover:bg-gray-50'}`}
            onClick={() => setPostTab('comments')}
          >
            查看玩家评论区原文
          </button>
        </div>

        <div className="p-6">
          {postTab === 'ai_analysis' ? (
            renderAnalysisTemplate()
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20">
                    <option>按点赞排序</option>
                    <option>按时间排序</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button type="button" className="flex items-center text-sm text-gray-600 hover:text-[#111111] px-3 py-1.5 border border-gray-200 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4 mr-1.5" /> 刷新评论
                  </button>
                  <button type="button" className="flex items-center text-sm text-gray-600 hover:text-[#111111] px-3 py-1.5 border border-gray-200 rounded-lg transition-colors">
                    <Download className="w-4 h-4 mr-1.5" /> 导出列表
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="p-5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <img src={`https://picsum.photos/seed/user${item}/50/50`} alt="avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                        <div>
                          <div className="text-sm font-bold text-[#111111]">玩家_Nickname_{item}</div>
                          <div className="text-xs text-gray-500 mt-0.5">2023-10-15 10:30:00</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-100">
                        <ThumbsUp className="w-4 h-4 mr-1.5" /> {1000 - item * 100}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 ml-14 leading-relaxed">
                      这次更新的内容真的很不错，特别是新角色的剧情，非常感人。希望后续能保持这个质量！
                    </p>
                    <div className="ml-14 mt-3 text-xs text-[#4A6B82] font-medium cursor-pointer hover:underline inline-flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" /> 查看 3 条回复
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-8 pb-12 pt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-500 mb-1">官号运营</span>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-black text-[#111111]">逆水寒手游</span>
            <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded">智能日报</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-sm font-medium text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>
          <button 
            type="button"
            onClick={handleGenerateReport}
            className="flex items-center bg-[#4A6B82] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#3A5B72] transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            一键生成日报
          </button>
        </div>
      </div>

      {viewMode === 'overview' && (
        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-gray-500 whitespace-nowrap">平台</span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((platform) => (
              <button
                type="button"
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  selectedPlatform === platform
                    ? 'bg-[#111111] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'overview' ? (
        renderOverview()
      ) : (
        renderPostAnalysis()
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#111111] text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[#65a381]" />
            <span className="text-sm font-medium">精美长图报告已生成并开始下载</span>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-[#F8FAFC] w-full max-w-4xl max-h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#111111] flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#4A6B82]" />
                日报预览 ({selectedDate})
              </h3>
              <button 
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              <div className="max-w-2xl mx-auto bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                {/* Report Header */}
                <div className="bg-gradient-to-br from-[#4A6B82] to-[#3A5A72] p-8 text-white text-center">
                  <h1 className="text-3xl font-black mb-2 tracking-tight">
                    逆水寒手游 - {viewMode === 'overview' ? selectedPlatform : selectedPost?.title} 日报
                  </h1>
                  <p className="text-white/80 font-medium">{selectedDate}</p>
                </div>
                
                {/* Report Content Preview */}
                <div className="p-8 space-y-8">
                  {/* Overview Section */}
                  <section>
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-5 bg-[#4A6B82] rounded-full mr-3"></div>
                      <h2 className="text-lg font-bold text-[#111111]">今日概览</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">发布内容</div>
                        <div className="text-xl font-black text-[#111111]">24<span className="text-xs font-medium text-gray-500 ml-1">条</span></div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">互动总量</div>
                        <div className="text-xl font-black text-[#111111]">12.5w</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">情绪趋势</div>
                        <div className="text-xl font-black text-[#65a381]">向好</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">新增热点</div>
                        <div className="text-sm font-bold text-[#111111] truncate">#新版本福利#</div>
                      </div>
                    </div>
                  </section>

                  {/* Platform Analysis Section */}
                  {viewMode === 'overview' && (
                    <section>
                      <div className="flex items-center mb-4">
                        <div className="w-1 h-5 bg-[#4A6B82] rounded-full mr-3"></div>
                        <h2 className="text-lg font-bold text-[#111111]">重点平台分析</h2>
                      </div>
                      <div className="space-y-4">
                        {['小红书', '抖音'].map((platform, idx) => (
                          <div key={idx} className="border border-gray-100 rounded-lg p-4">
                            <div className="font-bold text-[#111111] mb-2">{platform}</div>
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium text-gray-800">内容摘要：</span>
                              主要围绕新版本预热、角色立绘首曝及转发抽奖活动展开。
                            </p>
                            <div className="text-sm text-gray-600 bg-blue-50/50 p-2 rounded">
                              <span className="font-medium text-blue-800">AI评论分析：</span>
                              玩家对新角色立绘满意度极高，但部分玩家对抽奖机制表示疑虑。
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Core Demands Section */}
                  <section>
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-5 bg-[#4A6B82] rounded-full mr-3"></div>
                      <h2 className="text-lg font-bold text-[#111111]">玩家核心诉求 Top 3</h2>
                    </div>
                    <div className="space-y-3">
                      {[
                        { demand: '优化安卓端发热掉帧问题', freq: 1250, category: 'BUG' },
                        { demand: '增加日常任务产出', freq: 890, category: '玩法' },
                        { demand: '新角色立绘优化', freq: 650, category: '美术' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              idx === 0 ? 'bg-red-100 text-red-600' : 
                              idx === 1 ? 'bg-orange-100 text-orange-600' : 
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="text-sm font-medium text-[#111111]">{item.demand}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">{item.category}</span>
                            <span className="text-xs font-medium text-gray-500">{item.freq} 次</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end space-x-3">
              <button 
                onClick={confirmGenerateReport}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                下载为图片
              </button>
              <button 
                onClick={confirmGenerateReport}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4A6B82] hover:bg-[#3A5B72] rounded-lg transition-colors flex items-center shadow-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                推送至飞书
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
