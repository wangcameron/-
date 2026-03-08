import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Save,
  Trash2,
  Table as TableIcon,
  AlignLeft,
  CheckCircle2,
  Edit3,
  Clock,
  User,
  AlertTriangle,
  X,
  Bot,
  Link as LinkIcon,
  MessageSquare,
  History,
  Wand2,
  LayoutGrid,
  Tag,
  AlertCircle,
  Check,
  ChevronRight,
  MoreVertical,
  FileText
} from 'lucide-react';

const CATEGORIES = [
  { id: 'slang', name: '社区黑话名词库', type: 'table', icon: MessageSquare, pendingCount: 2 },
  { id: 'sensitive', name: '敏感舆情专项词', type: 'table', icon: AlertTriangle },
  { id: 'facts', name: '碎片化客观事实', type: 'card', icon: LayoutGrid },
  { id: 'storyline', name: '逆水寒主线剧情', type: 'card', icon: BookOpen },
  { id: 'updates', name: '版本更新', type: 'card', icon: Clock },
  { id: 'npc', name: '重要NPC人设及剧情', type: 'card', icon: User },
  { id: 'insights', name: '已确认社区生态洞察', type: 'card', icon: FileText },
];

const INITIAL_DATA = {
  slang: [
    { id: 1, title: '媚代', content: '游戏官方讨好"代入党"（把自己代入主角的玩家），与"媚钱"相对', notes: '乙游语境下的逆水寒官方立场讨论', allowAIUse: false, status: 'approved' },
    { id: 2, title: '嗑代梦一体机', content: '既能嗑CP（嗑），又能代入（代），还能梦女（梦）的玩家', notes: '乙游语境下的逆水寒玩家状态描述', allowAIUse: false, status: 'approved' },
    { id: 3, title: '血河小狗', content: '因bug（圈圈眼/斜视）而意外走红的宠物', notes: '逆水寒育宠顶流IP', allowAIUse: true, status: 'approved' },
    { id: 4, title: '门客', content: '逆水寒AI NPC系统，玩家可自定义外貌、性格、声音，与玩家恋爱互动', notes: '对比乙游的核心卖点', allowAIUse: true, status: 'approved' },
    { id: 5, title: '圈地', content: '乙游玩家用乙游规则（如禁止嗑CP、必须代入）规范其他玩家的行为', notes: '乙游 vs MMO冲突', allowAIUse: false, status: 'approved' },
    { id: 6, title: '牢底坐穿', content: '指在新副本中反复团灭，耗费大量时间却无法通关的痛苦体验。', notes: '系统自动发现：近期高频出现', allowAIUse: false, status: 'pending' },
    { id: 7, title: '背刺', content: '指刚花原价购买了道具或外观，官方马上出折扣活动或更优替代品。', notes: '系统自动发现：负面情绪关联', allowAIUse: false, status: 'pending' },
  ],
  sensitive: [
    { id: 1, title: '暗改掉率', content: '玩家怀疑官方在未公告的情况下降低了稀有物品的掉落概率', notes: '极易引发信任危机，需用数据自证', action: 'block' },
    { id: 2, title: '逼氪', content: '活动设计被认为强制玩家消费才能获得核心体验', notes: '需注意活动文案的引导方式', action: 'avoid' },
  ],
  facts: [
    { id: 1, title: '非遗布老虎舆情', content: '玩家针对外观挖洞/擦边已形成固定认知\n审美惯性：过度依赖露肤/挖洞/碎布条\n惯例：男号少挖洞，女号槽点多\n长期问题，非单次事件', tags: ['外观', '玩家反馈', '负面预警'], version: '2.0版本', isExpired: false },
    { id: 2, title: '侠缘高赞贴的相关总结', content: '侠缘聊天归属于侠缘玩法，卖点是"侠缘会像 AI 模型一样对你有记忆"\n"没有共享男友"精准击中乙游玩家痛点，AI 差异化让每个玩家的侠缘性格不同\n"吐槽式喜爱"是最有价值的内容形态，玩家像吐槽真男友一样吐槽 AI\n零负面+自发安利是优质种草帖标志，AI 差异化制造 UGC 传播', tags: ['侠缘', 'AI', '正面口碑'], version: '长期有效', isExpired: false },
    { id: 3, title: '血河小狗 IP 的客观事实', content: '起源：眼睛渲染 bug（斜视/圈圈眼），非官方设计\n官方原本主推宠物：福宝宝（被血河小狗抢风头）\n同期对比案例：绵羊小企鹅（同类型圈圈眼 bug，但很快被修复，玩家意难平）\n破圈形式：表情包传播 > 游戏内认知', tags: ['宠物', '出圈事件', '玩家造梗'], version: '1.2版本', isExpired: true }
  ],
  storyline: [
    { id: 1, title: '第一卷：东京梦华', content: '核心事件：初入汴京，结识神侯府众人，卷入连环迷案。\n关键转折：顾惜朝的背叛与连云寨的覆灭。', tags: ['神侯府', '顾惜朝', '连云寨'], version: '公测版本', isExpired: false },
    { id: 2, title: '第二卷：剑起江南', content: '核心事件：下江南追查线索，结识谪仙岛、药王谷等江湖势力。\n关键转折：雷卷之死，主角身世初露端倪。', tags: ['谪仙岛', '药王谷', '雷卷'], version: '公测版本', isExpired: false }
  ],
  updates: [
    { id: 1, title: '新春版本「幻梦之境」', content: '新增地图：幻梦之境（包含全新探索机制与解谜玩法）\n新增角色：流派「玄机」全流派转职开放\n福利活动：签到送288自选时装，首充双倍重置', tags: ['新地图', '新流派', '福利'], version: '2026-01-15', isExpired: false },
    { id: 2, title: '冬日版本「雪落无痕」', content: '新增副本：风雪铁牢关（12人团本）\n系统优化：日常任务一键减负功能上线', tags: ['新副本', '系统优化'], version: '2025-12-20', isExpired: true }
  ],
  npc: [
    { id: 1, title: '方承意', content: '明面上是朝廷权臣，暗中与主角合作，多次在危急时刻以意想不到的方式（通常是砸钱或动用特权）解围。', tags: ['腹黑', '多金', '权臣', '钞能力'], version: '常驻', isExpired: false },
    { id: 2, title: '无情', content: '神侯府大捕头，外冷内热，在与主角共同办案的过程中逐渐敞开心扉，对主角有着深沉但不轻易表露的保护欲。', tags: ['清冷', '傲娇', '轮椅', '暗器宗师'], version: '常驻', isExpired: false }
  ],
  insights: [
    { id: 1, title: 'MMO品类衰退认知', content: '玩家主流认知是“MMO 品类整体衰退”，并非逆水寒独有问题。新游分流被认为是结构性原因，玩家接受度较高。', tags: ['品类认知', '流失归因'], version: '2026-03', isExpired: false },
    { id: 2, title: '代入感的本质', content: '逆水寒代入感强的秘密是"让主控成为玩家想成为的人"——不是空心人，而是有魅力的理想自我。', tags: ['代入感', '角色塑造'], version: '2026-02', isExpired: false },
    { id: 3, title: '产能与消费解耦', content: '产能的"可看性"与"可买性"可以解耦，纯粹的更新频率也能带来社区活跃度。', tags: ['产能', '活跃度'], version: '2026-02', isExpired: false },
    { id: 4, title: '边骂边买现象', content: '存在相当比例的"收集癖"玩家和"惯性消费"玩家，无论品质如何都会买。', tags: ['消费心理', '舆情反差'], version: '2026-02', isExpired: false }
  ]
};

const INITIAL_METADATA = {
  slang: { lastUpdated: '2026-03-03 14:30:00', lastEditedBy: '运营_张三' },
  sensitive: { lastUpdated: '2026-03-02 09:15:00', lastEditedBy: '运营_李四' },
  facts: { lastUpdated: '2026-03-04 10:00:00', lastEditedBy: '运营_王五' },
  storyline: { lastUpdated: '2026-03-01 16:45:00', lastEditedBy: '运营_张三' },
  updates: { lastUpdated: '2026-03-03 11:20:00', lastEditedBy: '运营_李四' },
  npc: { lastUpdated: '2026-02-28 15:10:00', lastEditedBy: '运营_王五' },
  insights: { lastUpdated: '2026-03-04 09:30:00', lastEditedBy: '运营_张三' },
};

export default function BrandKnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [data, setData] = useState<any>(INITIAL_DATA);
  const [metadata, setMetadata] = useState<any>(INITIAL_METADATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [showPlayground, setShowPlayground] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  
  // Level 2 Edit State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);

  const updateMetadata = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setMetadata({
      ...metadata,
      [activeCategory]: {
        lastUpdated: formattedDate,
        lastEditedBy: '当前用户 (我)'
      }
    });
  };

  const handleSaveItem = (itemToSave: any) => {
    const newData = { ...data };
    const list = newData[activeCategory];
    
    if (isAdding) {
      const newId = list.length > 0 ? Math.max(...list.map((item: any) => item.id)) + 1 : 1;
      list.unshift({ ...itemToSave, id: newId });
    } else {
      const index = list.findIndex((item: any) => item.id === itemToSave.id);
      if (index !== -1) {
        list[index] = itemToSave;
      }
    }
    
    setData(newData);
    updateMetadata();
    setEditingItem(null);
    setIsAdding(false);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2000);
  };

  const handleApproveSlang = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newData = { ...data };
    const list = newData.slang;
    const index = list.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      list[index].status = 'approved';
      setData(newData);
      updateMetadata();
    }
  };

  const confirmDelete = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const executeDelete = () => {
    if (deleteConfirmId !== null) {
      const newData = { ...data };
      newData[activeCategory] = newData[activeCategory].filter((item: any) => item.id !== deleteConfirmId);
      setData(newData);
      updateMetadata();
      setDeleteConfirmId(null);
      if (editingItem && editingItem.id === deleteConfirmId) {
        setEditingItem(null);
        setIsAdding(false);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const openAddPanel = () => {
    setIsAdding(true);
    setEditingItem({
      title: '',
      content: '',
      notes: '',
      tags: [],
      version: '',
      isExpired: false,
      allowAIUse: false,
      action: 'avoid',
      status: 'approved'
    });
  };

  const openEditPanel = (item: any) => {
    setIsAdding(false);
    setEditingItem({ ...item });
  };

  const closeEditPanel = () => {
    setEditingItem(null);
    setIsAdding(false);
  };

  // --- Level 1 Views ---

  const renderTableList = () => {
    const list = data[activeCategory] || [];
    const filteredList = list.filter((item: any) => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pendingList = activeCategory === 'slang' ? filteredList.filter((item: any) => item.status === 'pending') : [];
    const approvedList = activeCategory === 'slang' ? filteredList.filter((item: any) => item.status === 'approved') : filteredList;

    return (
      <div className="flex-1 overflow-auto bg-white rounded-[16px] border border-[#E5E5E5]">
        <table className="w-full text-[14px] text-left">
          <thead className="text-[12px] text-[#6B6B6B] bg-[#F8F9FA] sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 font-medium w-1/4">关键词</th>
              <th className="px-6 py-4 font-medium w-1/2">简述</th>
              <th className="px-6 py-4 font-medium w-1/4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {activeCategory === 'slang' && pendingList.length > 0 && (
              <>
                <tr className="bg-yellow-50/50">
                  <td colSpan={3} className="px-6 py-2 text-[12px] font-medium text-yellow-700">
                    <div className="flex items-center">
                      <Wand2 className="w-4 h-4 mr-1.5" />
                      系统自动发现待审核词条 ({pendingList.length})
                    </div>
                  </td>
                </tr>
                {pendingList.map((item: any) => (
                  <tr key={item.id} onClick={() => openEditPanel(item)} className="bg-yellow-50/30 hover:bg-yellow-50/80 transition-colors border-l-2 border-yellow-400 cursor-pointer">
                    <td className="px-6 py-4 font-medium text-[#242424] flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-[#6B6B6B] truncate max-w-md">{item.content}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={(e) => handleApproveSlang(item.id, e)} className="px-2 py-1 bg-green-100 text-green-700 text-[12px] font-medium rounded hover:bg-green-200 transition-colors">
                          确认入库
                        </button>
                        <button onClick={(e) => confirmDelete(item.id, e)} className="p-1.5 text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr><td colSpan={3} className="h-2 bg-[#F8F9FA]"></td></tr>
              </>
            )}

            {approvedList.map((item: any) => (
              <tr key={item.id} onClick={() => openEditPanel(item)} className="hover:bg-[#F8F9FA]/80 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-medium text-[#242424]">{item.title}</td>
                <td className="px-6 py-4 text-[#6B6B6B] truncate max-w-md">{item.content}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-[#6B6B6B] hover:text-[#242424] hover:bg-[#F8F9FA] rounded transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => confirmDelete(item.id, e)} className="p-1.5 text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredList.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-[#6B6B6B]">
                  没有找到匹配的词条
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCardList = () => {
    const list = data[activeCategory] || [];
    const filteredList = list.filter((item: any) => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="flex-1 overflow-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item: any) => (
            <div 
              key={item.id} 
              onClick={() => openEditPanel(item)}
              className={`bg-white border ${item.isExpired ? 'border-red-200 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]' : 'border-[#E5E5E5]'} rounded-[16px] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative group flex flex-col h-48`}
            >
              {item.isExpired && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-medium px-2 py-1 rounded-bl-lg rounded-tr-xl flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> 已过期
                </div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-[14px] font-medium text-[#242424] line-clamp-1 pr-6">{item.title}</h3>
                <button 
                  onClick={(e) => confirmDelete(item.id, e)}
                  className="absolute top-4 right-4 p-1.5 text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.version && (
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${item.isExpired ? 'bg-red-50 text-red-600' : 'bg-[#F8F9FA] text-[#6B6B6B]'}`}>
                    {item.version}
                  </span>
                )}
                {item.tags?.slice(0, 2).map((tag: string, i: number) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#F8F9FA] text-[#242424] font-medium">
                    {tag}
                  </span>
                ))}
                {item.tags?.length > 2 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F8F9FA] text-[#6B6B6B] font-medium">
                    +{item.tags.length - 2}
                  </span>
                )}
              </div>

              <p className="text-[12px] text-[#6B6B6B] line-clamp-3 leading-relaxed flex-1 whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          ))}
        </div>
        {filteredList.length === 0 && (
          <div className="text-center py-12 text-[#6B6B6B]">
            没有找到匹配的卡片
          </div>
        )}
      </div>
    );
  };

  // --- Level 2 Edit Panel ---

  const renderEditPanel = () => {
    if (!editingItem) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
        <div className="bg-white rounded-[24px] shadow-2xl border border-[#E5E5E5] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#F8F9FA]/50">
            <h3 className="text-[18px] font-medium text-[#242424]">
              {isAdding ? '新增词条' : '编辑词条'}
            </h3>
            <button onClick={closeEditPanel} className="p-2 text-[#6B6B6B] hover:text-[#242424] hover:bg-[#E5E5E5] rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Common Fields */}
            <div>
              <label className="block text-[14px] font-medium text-[#444444] mb-2">
                {currentCategory?.type === 'table' ? '关键词' : '主题 / 标题'}
              </label>
              <input 
                type="text" 
                value={editingItem.title}
                onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                className="w-full bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-2.5 text-[14px] font-medium text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424]"
                placeholder="输入标题..."
              />
            </div>

            {/* Card Specific Fields */}
            {currentCategory?.type === 'card' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#444444] mb-2">时效 / 版本</label>
                  <input 
                    type="text" 
                    value={editingItem.version}
                    onChange={(e) => setEditingItem({...editingItem, version: e.target.value})}
                    className="w-full bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424]"
                    placeholder="如：2.0版本"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#444444] mb-2">关联标签 (逗号分隔)</label>
                  <input 
                    type="text" 
                    value={editingItem.tags?.join(', ') || ''}
                    onChange={(e) => setEditingItem({...editingItem, tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean)})}
                    className="w-full bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424]"
                    placeholder="如：外观, 负面"
                  />
                </div>
              </div>
            )}

            {/* Content Field */}
            <div>
              <label className="block text-[14px] font-medium text-[#444444] mb-2">
                {currentCategory?.type === 'table' ? '名词解释 / 描述' : '详细内容'}
              </label>
              <textarea 
                value={editingItem.content}
                onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                className="w-full h-48 bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-3 text-[14px] text-[#444444] leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424]"
                placeholder="输入详细内容..."
              />
            </div>

            {/* Table Specific Fields */}
            {currentCategory?.type === 'table' && (
              <div>
                <label className="block text-[14px] font-medium text-[#444444] mb-2">备注 / 建议</label>
                <input 
                  type="text" 
                  value={editingItem.notes}
                  onChange={(e) => setEditingItem({...editingItem, notes: e.target.value})}
                  className="w-full bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424]"
                  placeholder="输入备注..."
                />
              </div>
            )}

            {/* Prompt Engineering Controls */}
            {activeCategory === 'slang' && (
              <div className="bg-[#F8F9FA] border border-[#E5E5E5] rounded-[16px] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-[#242424] mb-1">允许 AI 主动使用</h4>
                    <p className="text-[12px] text-[#6B6B6B]">开启后，AI 在生成日常文案时会主动尝试使用该黑话词汇。</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={editingItem.allowAIUse} onChange={(e) => setEditingItem({...editingItem, allowAIUse: e.target.checked})} />
                    <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E5E5E5] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#242424]"></div>
                  </label>
                </div>
              </div>
            )}

            {activeCategory === 'sensitive' && (
              <div className="bg-orange-50/50 border border-orange-100 rounded-[16px] p-4">
                <h4 className="text-[14px] font-medium text-[#242424] mb-3">AI 控制指令</h4>
                <select 
                  value={editingItem.action} 
                  onChange={(e) => setEditingItem({...editingItem, action: e.target.value})}
                  className="w-full bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-2.5 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424]"
                >
                  <option value="block">绝对阻断 (禁止生成任何相关内容)</option>
                  <option value="avoid">最高优避坑 (尽量绕行，不主动提及)</option>
                </select>
              </div>
            )}

            {currentCategory?.type === 'card' && (
              <div className="bg-red-50/50 border border-red-100 rounded-[16px] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-red-800 mb-1">标记为已过期</h4>
                    <p className="text-[12px] text-red-600/80">过期后，AI 将不再使用此设定的内容生成新文案。</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={editingItem.isExpired} onChange={(e) => setEditingItem({...editingItem, isExpired: e.target.checked})} />
                    <div className="w-11 h-6 bg-red-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E5E5E5] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-[#E5E5E5] bg-[#F8F9FA]/50 flex items-center justify-between">
            {!isAdding ? (
              <button 
                onClick={() => confirmDelete(editingItem.id)}
                className="px-4 py-2 text-[14px] font-medium text-red-600 hover:bg-red-50 rounded-[12px] transition-colors"
              >
                删除词条
              </button>
            ) : <div></div>}
            <div className="flex space-x-3">
              <button 
                onClick={closeEditPanel}
                className="px-6 py-2 text-[14px] font-medium text-[#444444] bg-white border border-[#E5E5E5] rounded-[12px] hover:bg-[#F8F9FA] transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => handleSaveItem(editingItem)}
                className="px-6 py-2 text-[14px] font-medium text-white bg-[#242424] rounded-[12px] hover:bg-[#242424] transition-colors shadow-sm"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#FBFBFA]">
      <div className="px-6 lg:px-10 pt-8 pb-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-[24px] font-medium text-[#242424]">品牌知识库</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center px-4 py-2 bg-white border border-[#E5E5E5] text-[#242424] rounded-[12px] text-[14px] font-medium hover:bg-[#F8F9FA] transition-colors shadow-sm"
          >
            <Wand2 className="w-4 h-4 mr-2 text-[#242424]" />
            AI 辅助录入
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 pb-8 flex-1 flex flex-col lg:flex-row gap-6 min-h-0 relative">
        {/* Left: Category List */}
        <div className="w-full lg:w-64 bg-white rounded-[16px] shadow-sm border border-[#E5E5E5] p-4 flex flex-col flex-shrink-0 z-10">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[14px] font-medium text-[#242424]">知识库分类</h3>
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto pr-1">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const pendingCount = category.id === 'slang' ? data.slang.filter((i:any) => i.status === 'pending').length : 0;
              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSearchTerm('');
                    closeEditPanel();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[12px] text-[14px] transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-[#F8F9FA] text-[#242424] font-medium' 
                      : 'text-[#6B6B6B] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${activeCategory === category.id ? 'text-[#242424]' : 'text-[#6B6B6B]'}`} />
                    <span className="truncate">{category.name}</span>
                  </div>
                  {pendingCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Main Content Area (Level 1) */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FA]/30 rounded-[16px] p-1 relative z-10">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
            <div className="flex items-center space-x-4">
              <h2 className="text-[18px] font-medium text-[#242424] flex items-center">
                {currentCategory?.name}
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B6B6B]" />
                <input 
                  type="text" 
                  placeholder="搜索..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-white border border-[#E5E5E5] rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424] w-64 shadow-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Version History Info */}
              <div className="hidden lg:flex items-center space-x-4 text-[12px] text-[#6B6B6B] bg-white px-3 py-1.5 rounded-[12px] border border-[#E5E5E5] shadow-sm">
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#6B6B6B]" />
                  <span>最后更新：{metadata[activeCategory]?.lastUpdated}</span>
                </div>
                <div className="w-px h-3 bg-[#E5E5E5]"></div>
                <div className="flex items-center">
                  <User className="w-3.5 h-3.5 mr-1.5 text-[#6B6B6B]" />
                  <span>{metadata[activeCategory]?.lastEditedBy}</span>
                </div>
              </div>
              <button 
                onClick={openAddPanel}
                className="flex items-center px-3 py-1.5 bg-[#242424] text-white rounded-[12px] text-[14px] font-medium hover:bg-[#242424] transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                新增
              </button>
            </div>
          </div>
          
          <div className="flex-1 min-h-0 flex flex-col">
            {currentCategory?.type === 'table' ? renderTableList() : renderCardList()}
          </div>
        </div>

        {/* Overlay for Edit Panel */}
        {editingItem && (
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 transition-opacity"
            onClick={closeEditPanel}
          ></div>
        )}

        {/* Level 2 Edit Panel */}
        {renderEditPanel()}
      </div>

      {/* Floating RAG Playground Button */}
      <button
        onClick={() => setShowPlayground(!showPlayground)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#242424] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40"
        title="检索沙箱 (RAG Playground)"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* RAG Playground Panel */}
      {showPlayground && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-[24px] shadow-2xl border border-[#E5E5E5] overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-8">
          <div className="bg-[#242424] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-medium text-[14px]">检索沙箱 (RAG Playground)</span>
            </div>
            <button onClick={() => setShowPlayground(false)} className="text-[#6B6B6B] hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-4 bg-[#F8F9FA] h-80 overflow-y-auto space-y-4">
            <div className="flex flex-col space-y-1 items-end">
              <div className="bg-[#242424] text-white px-4 py-2 rounded-[24px] rounded-tr-sm text-[14px] max-w-[85%]">
                帮我写个关于“血河小狗”的文案
              </div>
            </div>
            <div className="flex flex-col space-y-1 items-start">
              <div className="bg-white border border-[#E5E5E5] text-[#242424] px-4 py-3 rounded-[24px] rounded-tl-sm text-[14px] max-w-[90%] leading-relaxed shadow-sm">
                听说大家都在找那只因为<span className="bg-[#F8F9FA] text-[#242424] px-1 rounded cursor-help group relative">圈圈眼bug意外走红<div className="absolute bottom-full left-0 mb-2 w-48 bg-[#242424] text-white text-[12px] p-2 rounded shadow-lg hidden group-hover:block z-50">引用自：碎片化客观事实 &gt; 血河小狗 IP 的客观事实</div></span>的血河小狗？官方主推的<span className="bg-[#F8F9FA] text-[#242424] px-1 rounded cursor-help group relative">福宝宝<div className="absolute bottom-full left-0 mb-2 w-48 bg-[#242424] text-white text-[12px] p-2 rounded shadow-lg hidden group-hover:block z-50">引用自：碎片化客观事实 &gt; 血河小狗 IP 的客观事实</div></span>都要吃醋啦！快来游戏里看看这只新晋顶流吧！🐶
              </div>
              <span className="text-[10px] text-[#6B6B6B] ml-1">AI 已调用知识库生成，带高亮背景为引用溯源</span>
            </div>
          </div>
          <div className="p-3 bg-white border-t border-[#E5E5E5]">
            <div className="relative">
              <input type="text" placeholder="测试知识库调用..." className="w-full bg-[#F8F9FA] border-none rounded-full pl-4 pr-10 py-2 text-[14px] focus:ring-2 focus:ring-[#242424]/20" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#242424] p-1">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-xl border border-[#E5E5E5] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center">
              <h3 className="text-[18px] font-medium text-[#242424] flex items-center">
                <Wand2 className="w-5 h-5 mr-2 text-[#242424]" />
                AI 辅助录入知识
              </h3>
              <button onClick={() => setShowImportModal(false)} className="text-[#6B6B6B] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#444444] mb-2">粘贴外部链接 (公众号/小红书/公告)</label>
                <div className="flex space-x-2">
                  <input type="text" placeholder="https://" className="flex-1 border border-[#E5E5E5] rounded-[12px] px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#242424]/20" />
                  <button className="bg-[#242424] text-white px-4 py-2 rounded-[12px] text-[14px] font-medium hover:bg-[#242424]">解析</button>
                </div>
              </div>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#E5E5E5]"></div>
                <span className="flex-shrink-0 mx-4 text-[#6B6B6B] text-[12px]">或</span>
                <div className="flex-grow border-t border-[#E5E5E5]"></div>
              </div>
              <div className="border-2 border-dashed border-[#E5E5E5] rounded-[16px] p-8 text-center hover:bg-[#F8F9FA] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-[#242424]" />
                </div>
                <p className="text-[14px] font-medium text-[#444444]">点击或拖拽文件上传</p>
                <p className="text-[12px] text-[#6B6B6B] mt-1">支持 Word, PDF, Excel, TXT</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-xl border border-[#E5E5E5] w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-[18px] font-medium text-[#242424]">确认删除词条？</h3>
              </div>
              <p className="text-[12px] text-[#6B6B6B] ml-13 leading-relaxed">
                删除后该词条将从知识库中移除，且无法恢复。确定要继续吗？
              </p>
            </div>
            <div className="bg-[#F8F9FA] px-6 py-4 flex items-center justify-end space-x-3 border-t border-[#E5E5E5]">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 text-[14px] font-medium text-[#444444] bg-white border border-[#E5E5E5] rounded-[12px] hover:bg-[#F8F9FA] transition-colors"
              >
                取消
              </button>
              <button 
                onClick={executeDelete}
                className="px-4 py-2 text-[14px] font-medium text-white bg-red-600 rounded-[12px] hover:bg-red-700 transition-colors shadow-sm"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 bg-[#242424] text-white px-4 py-3 rounded-[12px] shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4 z-60">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-[14px] font-medium">已成功保存至品牌知识库</span>
        </div>
      )}
    </div>
  );
}
