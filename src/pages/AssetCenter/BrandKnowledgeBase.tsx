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
  X
} from 'lucide-react';

const CATEGORIES = [
  { id: 'slang', name: '社区黑话名词库', type: 'table', icon: TableIcon },
  { id: 'sensitive', name: '敏感舆情专项词', type: 'table', icon: TableIcon },
  { id: 'facts', name: '碎片化客观事实', type: 'text', icon: AlignLeft },
  { id: 'storyline', name: '逆水寒主线剧情', type: 'text', icon: AlignLeft },
  { id: 'updates', name: '版本更新', type: 'text', icon: AlignLeft },
  { id: 'npc', name: '重要npc人设及剧情', type: 'text', icon: AlignLeft },
  { id: 'insights', name: '已确认社区生态洞察', type: 'text', icon: AlignLeft },
];

const INITIAL_DATA = {
  slang: [
    { id: 1, col1: '媚代', col2: '游戏官方讨好"代入党"（把自己代入主角的玩家），与"媚钱"相对', col3: '乙游语境下的逆水寒官方立场讨论' },
    { id: 2, col1: '嗑代梦一体机', col2: '既能嗑CP（嗑），又能代入（代），还能梦女（梦）的玩家', col3: '乙游语境下的逆水寒玩家状态描述' },
    { id: 3, col1: '血河小狗', col2: '因bug（圈圈眼/斜视）而意外走红的宠物', col3: '逆水寒育宠顶流IP' },
    { id: 4, col1: '门客', col2: '逆水寒AI NPC系统，玩家可自定义外貌、性格、声音，与玩家恋爱互动', col3: '对比乙游的核心卖点' },
    { id: 5, col1: '圈地', col2: '乙游玩家用乙游规则（如禁止嗑CP、必须代入）规范其他玩家的行为', col3: '乙游 vs MMO冲突' },
  ],
  sensitive: [
    { id: 1, col1: '暗改掉率', col2: '玩家怀疑官方在未公告的情况下降低了稀有物品的掉落概率', col3: '极易引发信任危机，需用数据自证' },
    { id: 2, col1: '逼氪', col2: '活动设计被认为强制玩家消费才能获得核心体验', col3: '需注意活动文案的引导方式' },
  ],
  facts: `关于非遗布老虎舆情节奏：
- 玩家针对外观挖洞/擦边已形成固定认知
- 审美惯性：过度依赖露肤/挖洞/碎布条
- 惯例：男号少挖洞，女号槽点多
- 长期问题，非单次事件

关于侠缘高赞贴的相关总结：
- 侠缘聊天归属于侠缘玩法，卖点是"侠缘会像 AI 模型一样对你有记忆"
- "没有共享男友"精准击中乙游玩家痛点，AI 差异化让每个玩家的侠缘性格不同
- "吐槽式喜爱"是最有价值的内容形态，玩家像吐槽真男友一样吐槽 AI
- 零负面+自发安利是优质种草帖标志，AI 差异化制造 UGC 传播

关于血河小狗 IP 的客观事实：
- 起源：眼睛渲染 bug（斜视/圈圈眼），非官方设计
- 官方原本主推宠物：福宝宝（被血河小狗抢风头）
- 同期对比案例：绵羊小企鹅（同类型圈圈眼 bug，但很快被修复，玩家意难平）
- 破圈形式：表情包传播 > 游戏内认知`,
  storyline: `【第一卷：东京梦华】
- 核心事件：初入汴京，结识神侯府众人，卷入连环迷案。
- 关键转折：顾惜朝的背叛与连云寨的覆灭。

【第二卷：剑起江南】
- 核心事件：下江南追查线索，结识谪仙岛、药王谷等江湖势力。
- 关键转折：雷卷之死，主角身世初露端倪。`,
  updates: `【2026-01-15】新春版本「幻梦之境」
- 新增地图：幻梦之境（包含全新探索机制与解谜玩法）
- 新增角色：流派「玄机」全流派转职开放
- 福利活动：签到送288自选时装，首充双倍重置

【2025-12-20】冬日版本「雪落无痕」
- 新增副本：风雪铁牢关（12人团本）
- 系统优化：日常任务一键减负功能上线`,
  npc: `【方承意】
- 人设标签：腹黑、多金、权臣、"钞能力"
- 核心剧情：明面上是朝廷权臣，暗中与主角合作，多次在危急时刻以意想不到的方式（通常是砸钱或动用特权）解围。

【无情】
- 人设标签：清冷、傲娇、轮椅、暗器宗师
- 核心剧情：神侯府大捕头，外冷内热，在与主角共同办案的过程中逐渐敞开心扉，对主角有着深沉但不轻易表露的保护欲。`,
  insights: `- 玩家主流认知是“MMO 品类整体衰退”，并非逆水寒独有问题。
- 新游分流被认为是结构性原因，玩家接受度较高。
- 逆水寒代入感强的秘密是"让主控成为玩家想成为的人"——不是空心人，而是有魅力的理想自我。
- 产能的"可看性"与"可买性"可以解耦，纯粹的更新频率也能带来社区活跃度。
- "边骂边买"现象：存在相当比例的"收集癖"玩家和"惯性消费"玩家，无论品质如何都会买。`
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

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);

  const handleSave = () => {
    // Update metadata on save
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    setMetadata({
      ...metadata,
      [activeCategory]: {
        lastUpdated: formattedDate,
        lastEditedBy: '当前用户 (我)'
      }
    });

    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2000);
  };

  const handleTableChange = (id: number, field: string, value: string) => {
    const newData = { ...data };
    const list = newData[activeCategory];
    const index = list.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      list[index][field] = value;
      setData(newData);
    }
  };

  const handleAddRow = () => {
    const newData = { ...data };
    const list = newData[activeCategory];
    const newId = list.length > 0 ? Math.max(...list.map((item: any) => item.id)) + 1 : 1;
    list.push({ id: newId, col1: '', col2: '', col3: '' });
    setData(newData);
  };

  const confirmDelete = (id: number) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = () => {
    if (deleteConfirmId !== null) {
      const newData = { ...data };
      newData[activeCategory] = newData[activeCategory].filter((item: any) => item.id !== deleteConfirmId);
      setData(newData);
      setDeleteConfirmId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newData = { ...data };
    newData[activeCategory] = e.target.value;
    setData(newData);
  };

  const renderTableEditor = () => {
    const list = data[activeCategory] || [];
    const filteredList = list.filter((item: any) => 
      item.col1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.col2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.col3.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索词条..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20 focus:border-[#4A6B82] w-64"
            />
          </div>
          <button 
            onClick={handleAddRow}
            className="flex items-center px-3 py-2 bg-white border border-gray-200 text-[#111111] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            新增词条
          </button>
        </div>
        <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium w-1/4">关键词</th>
                <th className="px-4 py-3 font-medium w-2/4">名词解释 / 描述</th>
                <th className="px-4 py-3 font-medium w-1/4">备注 / 建议</th>
                <th className="px-4 py-3 font-medium w-16 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredList.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2">
                    <input 
                      type="text" 
                      value={item.col1} 
                      onChange={(e) => handleTableChange(item.id, 'col1', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 p-1 text-[#111111] font-medium"
                      placeholder="输入关键词"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <textarea 
                      value={item.col2} 
                      onChange={(e) => handleTableChange(item.id, 'col2', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 p-1 text-gray-600 resize-none h-10"
                      placeholder="输入解释或描述"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="text" 
                      value={item.col3} 
                      onChange={(e) => handleTableChange(item.id, 'col3', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 p-1 text-gray-500"
                      placeholder="输入备注"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button 
                      onClick={() => confirmDelete(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    没有找到匹配的词条
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTextEditor = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-[#111111] hover:bg-gray-200 rounded transition-colors"><Edit3 className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <span className="text-xs text-gray-500 font-medium">支持 Markdown 语法</span>
          </div>
          <textarea
            value={data[activeCategory] || ''}
            onChange={handleTextChange}
            className="flex-1 w-full p-6 bg-transparent border-none focus:ring-0 text-gray-700 leading-relaxed resize-none font-sans"
            placeholder="在此输入内容..."
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col relative">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">品牌知识库</h1>
          <p className="text-sm text-gray-500 mt-1">结构化管理品牌资产，为 AI 提供精准的上下文参考</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Save className="w-4 h-4 mr-2" />
          保存更改
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left: Category List */}
        <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col flex-shrink-0">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-bold text-[#111111]">知识库分类</h3>
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto pr-1">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSearchTerm('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-[#4A6B82]/10 text-[#4A6B82] font-bold' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${activeCategory === category.id ? 'text-[#4A6B82]' : 'text-gray-400'}`} />
                    <span className="truncate">{category.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-[#111111] flex items-center">
              {currentCategory?.name}
              <span className="ml-3 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded">
                {currentCategory?.type === 'table' ? '表格编辑' : '文本编辑'}
              </span>
            </h2>
            
            {/* Version History Info */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                <span>最后更新：{metadata[activeCategory]?.lastUpdated}</span>
              </div>
              <div className="w-px h-3 bg-gray-300"></div>
              <div className="flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                <span>编辑人：{metadata[activeCategory]?.lastEditedBy}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-h-0">
            {currentCategory?.type === 'table' ? renderTableEditor() : renderTextEditor()}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-[#111111]">确认删除词条？</h3>
              </div>
              <p className="text-sm text-gray-600 ml-13 leading-relaxed">
                删除后该词条将从知识库中移除，且无法恢复。确定要继续吗？
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3 border-t border-gray-100">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={executeDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4 z-50">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">已成功保存至品牌知识库</span>
        </div>
      )}
    </div>
  );
}
