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

  const renderMultiPlatformReport = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-[#111111]">逆水寒多平台玩家舆情洞察报告</h2>
      </div>

      {/* 一、基础数据总览（矩阵对比） */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2 text-[#4A6B82]" />
          一、 基础数据总览（矩阵对比）
        </h3>
        <p className="text-sm text-gray-500 mb-6 italic">(自动提取数据源中声量最大的2-4个平台进行横向比对)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">维度</th>
                <th className="p-3 font-medium">抖音</th>
                <th className="p-3 font-medium">小红书</th>
                <th className="p-3 font-medium">B站</th>
                <th className="p-3 font-medium rounded-tr-lg">合计 / 均值概况</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">总作品发布数</td>
                <td className="p-3 text-gray-600">120</td>
                <td className="p-3 text-gray-600">85</td>
                <td className="p-3 text-gray-600">45</td>
                <td className="p-3 text-[#4A6B82] font-bold">250</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">总评论数</td>
                <td className="p-3 text-gray-600">12,450</td>
                <td className="p-3 text-gray-600">8,230</td>
                <td className="p-3 text-gray-600">5,120</td>
                <td className="p-3 text-[#4A6B82] font-bold">25,800</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">时间范围</td>
                <td className="p-3 text-gray-600">10-15 10:00 至 10-16 09:30</td>
                <td className="p-3 text-gray-600">10-15 10:00 至 10-16 09:30</td>
                <td className="p-3 text-gray-600">10-15 10:00 至 10-16 09:30</td>
                <td className="p-3 text-[#4A6B82] font-bold">24小时</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">最高点赞数</td>
                <td className="p-3 text-gray-600">4.5w</td>
                <td className="p-3 text-gray-600">1.2w</td>
                <td className="p-3 text-gray-600">8.9k</td>
                <td className="p-3 text-[#4A6B82] font-bold">4.5w (抖音)</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">平均点赞数</td>
                <td className="p-3 text-gray-600">125</td>
                <td className="p-3 text-gray-600">45</td>
                <td className="p-3 text-gray-600">82</td>
                <td className="p-3 text-[#4A6B82] font-bold">95</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 二、全网核心议题与平台温差（必须锁定5个） */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-[#4A6B82]" />
          二、 全网核心议题与平台温差（必须锁定5个）
        </h3>
        <p className="text-sm text-gray-500 mb-6 italic">(提取全网共性议题。如触发高危词，必须置顶于第一行并标红。)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">议题</th>
                <th className="p-3 font-medium">全网共识 / 综合结论</th>
                <th className="p-3 font-medium">抖音 关注点（典型原话）</th>
                <th className="p-3 font-medium">小红书 关注点（典型原话）</th>
                <th className="p-3 font-medium rounded-tr-lg">营销与应对策略</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50 bg-red-50/30">
                <td className="p-3 font-bold text-red-600 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  抽奖概率暗改 (高危触发)
                </td>
                <td className="p-3 text-gray-600">玩家普遍怀疑新卡池爆率暗改，引发信任危机，涉及315投诉风险。</td>
                <td className="p-3 text-gray-600">"这爆率绝对调了，我要去315投诉！"<br/>"几千块砸下去连个水花都没有"</td>
                <td className="p-3 text-gray-600">"避雷新卡池，姐妹们别抽了"<br/>"吃相太难看"</td>
                <td className="p-3 text-gray-600"><strong>最高警戒：</strong> 立即公布抽奖概率公示及后台数据自证，安排客服专线处理退款/补偿诉求。</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">新时装美术风格</td>
                <td className="p-3 text-gray-600">整体美术表现获高度认可，但对价格存在争议。</td>
                <td className="p-3 text-gray-600">"衣服好看是好看，就是太贵了"<br/>"特效拉满，这波可以"</td>
                <td className="p-3 text-gray-600">"绝美！疯狂打call！"<br/>"染色方案求分享~"</td>
                <td className="p-3 text-gray-600">小红书侧重推"绝美染色"UGC，抖音侧重推"平替搭配"或性价比分析。</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">日常任务肝度</td>
                <td className="p-3 text-gray-600">日常流程过长，玩家减负呼声强烈。</td>
                <td className="p-3 text-gray-600">"每天像上班一样，累了"<br/>"能不能出个一键扫荡？"</td>
                <td className="p-3 text-gray-600">"做日常做到睡着"<br/>"求一个快速清日常攻略"</td>
                <td className="p-3 text-gray-600">收集减负建议，官方发布"听劝"减负预告，缓解焦虑。</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">新副本机制</td>
                <td className="p-3 text-gray-600">机制复杂，开荒难度大，导致部分玩家产生挫败感。</td>
                <td className="p-3 text-gray-600">"牢底坐穿，这本根本不是给人打的"<br/>"野队没法玩"</td>
                <td className="p-3 text-gray-600">"找固定队开荒，婉拒压力怪"<br/>"机制太难背了"</td>
                <td className="p-3 text-gray-600">发布官方保姆级攻略，鼓励KOL产出"逃课"打法，降低门槛。</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">客户端稳定性</td>
                <td className="p-3 text-gray-600">更新后部分机型闪退频发，影响基础体验。</td>
                <td className="p-3 text-gray-600">"打本一半闪退，心态崩了"<br/>"优化负优化？"</td>
                <td className="p-3 text-gray-600">"苹果13疯狂发热闪退"<br/>"求解决闪退的方法"</td>
                <td className="p-3 text-gray-600">发布技术优化进度说明，并提供临时解决方案及补偿。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 三、玩家生态与画像分布（阵地对冲视角） */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-[#4A6B82]" />
          三、 玩家生态与画像分布（阵地对冲视角）
        </h3>
        <p className="text-sm text-gray-500 mb-6 italic">(打破单平台局限，描绘全网玩家群体的版图分布)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">群体切片（如硬核党/外观党）</th>
                <th className="p-3 font-medium">核心阵地归属</th>
                <th className="p-3 font-medium">核心诉求与立场</th>
                <th className="p-3 font-medium rounded-tr-lg">典型表达（原话摘录）</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">外观党/风景党</td>
                <td className="p-3 text-gray-600">小红书、微博</td>
                <td className="p-3 text-gray-600">极度认可美术，追求个性化表达，对价格敏感度相对较低。</td>
                <td className="p-3 text-gray-600">"为了这套衣服回坑了"、"谁能拒绝这么好看的小裙子！"</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">强度党/副本玩家</td>
                <td className="p-3 text-gray-600">B站、贴吧、抖音</td>
                <td className="p-3 text-gray-600">焦虑/不满，追求数值收益，对机制难度和掉率极度敏感。</td>
                <td className="p-3 text-gray-600">"光出衣服不修bug是吧"、"新本机制太恶心了，牢底坐穿"</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">微氪/零氪玩家</td>
                <td className="p-3 text-gray-600">抖音、快手</td>
                <td className="p-3 text-gray-600">观望/吐槽，关注福利发放和性价比，容易产生剥夺感。</td>
                <td className="p-3 text-gray-600">"福利给的太少了，白嫖党活不下去"、"这期战令性价比不高"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 四、高频梗与社区黑话破圈追踪 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-bold text-[#111111] flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[#4A6B82]" />
            四、 高频梗与社区黑话破圈追踪
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4 italic">(重点追踪跨平台流窜的热梗，新发现需提醒录入名词库)</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs text-yellow-800 flex items-start">
          <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
          <div>
            <strong>内部操作提示：</strong> 表格中标注为【新发现】的词汇，将在用户确认无误后录入《社区黑话名词库》。
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">关键词</th>
                <th className="p-3 font-medium">含义/解释</th>
                <th className="p-3 font-medium">传播状态（单平台自嗨 / 全网破圈）</th>
                <th className="p-3 font-medium rounded-tr-lg">词库状态（新发现 / 已有）</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">牢底坐穿</td>
                <td className="p-3 text-gray-600">形容在新副本中反复开荒失败，耗费大量时间，像坐牢一样。</td>
                <td className="p-3 text-gray-600">全网破圈 (B站发源，抖音/小红书蔓延)</td>
                <td className="p-3 text-red-500 font-bold flex items-center">
                  【新发现】 <span className="ml-1 w-2 h-2 rounded-full bg-red-500"></span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">血河小狗</td>
                <td className="p-3 text-gray-600">指代游戏中血河流派的某种宠物或特定外观，因其独特的"贱萌"斜眼bug而爆火出圈。</td>
                <td className="p-3 text-gray-600">全网破圈 (多平台表情包传播)</td>
                <td className="p-3 text-gray-500">已有</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">背刺</td>
                <td className="p-3 text-gray-600">指官方突然推出更优惠的活动或更强力的道具，导致之前投入的玩家感到利益受损。</td>
                <td className="p-3 text-gray-600">单平台自嗨 (主要在贴吧/微博讨论)</td>
                <td className="p-3 text-red-500 font-bold flex items-center">
                  【新发现】 <span className="ml-1 w-2 h-2 rounded-full bg-red-500"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 五、全局情绪与平台底色对比（温差矩阵） */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-[#4A6B82]" />
          五、 全局情绪与平台底色对比（温差矩阵）
        </h3>
        <p className="text-sm text-gray-500 mb-6 italic">(精准定义各平台的情绪底色标签，如：情绪战场、大局观市场、吃瓜阵地等)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                <th className="p-3 font-medium rounded-tl-lg">平台阵地</th>
                <th className="p-3 font-medium">情绪底色标签（高度概括）</th>
                <th className="p-3 font-medium">正向占比</th>
                <th className="p-3 font-medium">负向占比</th>
                <th className="p-3 font-medium">中立占比</th>
                <th className="p-3 font-medium rounded-tr-lg">核心情绪引爆点（为什么夸/为什么骂）</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">抖音</td>
                <td className="p-3 text-gray-600">情绪战场</td>
                <td className="p-3 text-[#65a381] font-medium">40%</td>
                <td className="p-3 text-[#D96C6C] font-medium">45%</td>
                <td className="p-3 text-[#9CA3AF] font-medium">15%</td>
                <td className="p-3 text-gray-600">骂：抽奖概率暗改疑云、日常太肝。<br/>夸：新时装特效炫酷。</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">小红书</td>
                <td className="p-3 text-gray-600">种草与避雷阵地</td>
                <td className="p-3 text-[#65a381] font-medium">65%</td>
                <td className="p-3 text-[#D96C6C] font-medium">20%</td>
                <td className="p-3 text-[#9CA3AF] font-medium">15%</td>
                <td className="p-3 text-gray-600">夸：时装绝美、拍照打卡点出片。<br/>骂：部分机型闪退影响拍照体验。</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-bold text-[#111111]">B站</td>
                <td className="p-3 text-gray-600">大局观与硬核考据</td>
                <td className="p-3 text-[#65a381] font-medium">35%</td>
                <td className="p-3 text-[#D96C6C] font-medium">35%</td>
                <td className="p-3 text-[#9CA3AF] font-medium">30%</td>
                <td className="p-3 text-gray-600">骂：新副本机制不合理、数值膨胀担忧。<br/>夸：剧情演出优秀、音乐好听。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 六、认知温差与营销策略落地（深度洞察） */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[#4A6B82]" />
          六、 认知温差与营销策略落地（深度洞察）
        </h3>
        <p className="text-sm text-gray-500 mb-6 italic">(用2-4段文字总结全盘生态，不谈买量，专攻社区沟通)</p>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-[#111111] mb-3 bg-gray-100 inline-block px-3 py-1 rounded">核心洞察</h4>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>认知温差检测：</strong> 官方想传递的"减负"信息与全网玩家实际解码的信息存在致命偏差。官方认为推出扫荡券是减负，但玩家认为获取扫荡券的过程本身就很"肝"。抖音平台偏差最大，玩家普遍认为这是"换皮逼肝"。
                </li>
                <li>
                  <strong>核心矛盾点：</strong> 跨越全网，玩家当下最强烈的不安全感来自"抽奖概率暗改"的传言。这种剥夺感不仅影响了付费意愿，更动摇了玩家对官方"听劝"人设的信任基础。
                </li>
                <li>
                  <strong>分阵地沟通策略：</strong> 接下来官方在抖音需重点安抚"概率暗改"情绪，通过直面回应和数据自证来平息风波；在小红书重点答疑"闪退"问题，并提供临时解决方案；全网绝口不提"新副本难度适中"等容易激化矛盾的话术。
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#111111] mb-3 bg-gray-100 inline-block px-3 py-1 rounded">玩家心智定调（一句话总结）</h4>
            <p className="text-sm text-gray-500 mb-2 italic">(用1句话精准概括这个周期内，全网玩家最核心的精神状态或诉求矛盾，可直接用于高管汇报)</p>
            <div className="text-base font-bold text-[#4A6B82] bg-blue-50 p-4 rounded-lg border border-blue-100 italic">
              "新时装的'美'掩盖不了基础体验的'痛'与概率暗改的'疑'，亟需通过真诚沟通和实质性减负来弥合玩家圈层的信任裂痕。"
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSinglePlatformReport = () => (
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
            <div className="text-3xl font-black text-[#111111] mb-2">10<span className="text-sm font-medium text-gray-500 ml-1">条</span></div>
          </div>
          <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm">
            <div className="text-sm font-bold text-gray-500 mb-2">平台互动总量</div>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-black text-[#111111]">4.5w</span>
              <span className="flex items-center text-xs font-bold text-[#65a381] bg-white/60 px-1.5 py-0.5 rounded">
                <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
              </span>
            </div>
            <div className="text-xs text-gray-600">相比前日同期</div>
          </div>
          <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm">
            <div className="text-sm font-bold text-gray-500 mb-2">情绪变化趋势</div>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-black text-[#65a381]">向好</span>
              <span className="flex items-center text-xs font-bold text-[#65a381] bg-white/60 px-1.5 py-0.5 rounded">
                正面占比 +3%
              </span>
            </div>
            <div className="text-xs text-gray-600">相比前日同期</div>
          </div>
          <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm">
            <div className="text-sm font-bold text-gray-500 mb-2">新增热点话题</div>
            <div className="text-lg font-black text-[#111111] truncate mb-2">#新版本福利#</div>
            <div className="text-xs text-gray-600 bg-white/60 px-2 py-1 rounded inline-block">讨论量 2.1w</div>
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
              <span><strong>高赞负面评论预警：</strong>出现一条关于“暗改掉率”的评论，点赞数已突破 1000，需尽快核实并回应。</span>
            </li>
            <li className="flex items-start space-x-2 text-sm text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96C6C] mt-1.5 shrink-0"></span>
              <span><strong>互动量异常下降：</strong>昨日发布的图文互动量较平均水平下降 40%，建议分析内容是否偏离受众喜好。</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </>
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
        {isAll ? renderMultiPlatformReport() : renderSinglePlatformReport()}
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
            renderSinglePlatformReport()
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
