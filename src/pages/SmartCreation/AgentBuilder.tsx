import { useState } from 'react';
import { 
  Bot, 
  Plus, 
  Settings, 
  Database, 
  ShieldAlert, 
  FileText, 
  Image as ImageIcon,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2
} from 'lucide-react';

const AGENTS = [
  {
    id: 1,
    name: '小红书种草专家',
    desc: '擅长撰写带有情绪价值的种草文案，熟练使用 Emoji 和网感词汇。',
    type: '文案生成',
    status: 'active',
    assets: ['春季新品资料库', '历代爆款文案库'],
    skills: ['真实玩家口吻', 'Emoji 排版', '违禁词过滤']
  },
  {
    id: 2,
    name: '官方公关发言人',
    desc: '严肃、专业、诚恳的官方回应风格，严格遵守品牌红线。',
    type: '观点回应',
    status: 'active',
    assets: ['公关 Q&A 手册', '品牌红线词典'],
    skills: ['官方通告格式', '情绪安抚', '绝对违禁词阻断']
  },
  {
    id: 3,
    name: '游戏角色原画师',
    desc: '熟悉《逆水寒》世界观与画风，擅长角色资产提取与场景融合。',
    type: '视觉生成',
    status: 'active',
    assets: ['游戏世界观设定', '神相角色四视图'],
    skills: ['国风水墨渲染', '光影透视修正']
  },
  {
    id: 4,
    name: '短视频分镜导演',
    desc: '精通短视频完播率密码，擅长将长文本拆解为高燃分镜。',
    type: '视频生成',
    status: 'draft',
    assets: ['爆款短视频结构库'],
    skills: ['前3秒抓手', '卡点剪辑逻辑']
  }
];

export default function AgentBuilder() {
  const [activeTab, setActiveTab] = useState('全部智能体');

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">智能体配置</h1>
          <p className="text-sm text-gray-500 mt-1">定义并管理所有生成任务的规矩与调性</p>
        </div>
        <button type="button" className="px-4 py-2 bg-[#4A6B82] text-white rounded-lg text-sm font-medium hover:bg-[#3A5A70] transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          新建智能体
        </button>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-lg w-fit mb-6">
        {['全部智能体', '文案生成', '视觉生成', '视频生成'].map(tab => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto">
        {AGENTS.filter(a => activeTab === '全部智能体' || a.type === activeTab).map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative group">
            <button type="button" className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
              <MoreVertical className="w-4 h-4" />
            </button>
            
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#4A6B82]/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-[#4A6B82]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-base font-bold text-[#111111]">{agent.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    agent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {agent.status === 'active' ? '已启用' : '草稿'}
                  </span>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                  {agent.type}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-6 line-clamp-2 min-h-[40px]">
              {agent.desc}
            </p>
            
            <div className="space-y-4 mt-auto">
              <div>
                <div className="flex items-center text-xs font-bold text-gray-700 mb-2">
                  <Database className="w-3.5 h-3.5 mr-1.5" />
                  挂载资产与知识库
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.assets.map((asset, idx) => (
                    <span key={idx} className="px-2 py-1 bg-[#4A6B82]/10 text-[#4A6B82] border border-[#4A6B82]/20 rounded text-xs flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center text-xs font-bold text-gray-700 mb-2">
                  <Settings className="w-3.5 h-3.5 mr-1.5" />
                  技能与约束 (SKILLs)
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded text-xs flex items-center">
                      {skill.includes('违禁') ? <ShieldAlert className="w-3 h-3 mr-1 text-red-500" /> : <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">最后更新: 2026-02-26</span>
              <div className="flex items-center space-x-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[#4A6B82] hover:bg-[#4A6B82]/10 rounded transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-[#D96C6C] hover:bg-[#D96C6C]/10 rounded transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Agent Card */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:bg-gray-100 transition-colors cursor-pointer min-h-[320px]">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-base font-bold text-[#111111] mb-1">创建新智能体</h3>
          <p className="text-sm text-gray-500">配置专属的知识库与技能</p>
        </div>
      </div>
    </div>
  );
}
