import { useState } from 'react';
import { 
  Link as LinkIcon, 
  Settings, 
  Send, 
  Bot, 
  CheckCircle2,
  Copy,
  RefreshCw,
  Share
} from 'lucide-react';

export default function Copywriting() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState<number[]>([1, 2]);

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowPoints(true);
    }, 1500);
  };

  const togglePoint = (id: number) => {
    if (selectedPoints.includes(id)) {
      setSelectedPoints(selectedPoints.filter(p => p !== id));
    } else {
      setSelectedPoints([...selectedPoints, id]);
    }
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">文案生成</h1>
          <p className="text-sm text-gray-500 mt-1">以链接驱动的工作流，主打“观点提炼”与“结构拆解”</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['观点回应', '爆款仿写'].map(tab => (
            <button
              type="button"
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === '观点回应' 
                  ? 'bg-white text-[#111111] shadow-sm' 
                  : 'text-gray-500 hover:text-[#111111]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left: Control Panel */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-base font-bold text-[#111111] mb-4">观点控制台</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">输入社交平台帖子 URL</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://xiaohongshu.com/..." 
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20 focus:border-[#4A6B82]"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={handleAnalyze}
                    disabled={!url || isAnalyzing}
                    className="px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : '解析'}
                  </button>
                </div>
              </div>
            </div>

            {showPoints && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-[#111111] flex items-center">
                    <Bot className="w-4 h-4 text-[#4A6B82] mr-1.5" />
                    AI 提炼观点
                  </h4>
                  <span className="text-xs text-gray-500">已选 {selectedPoints.length}/3</span>
                </div>
                
                {[
                  { id: 1, text: '产品包装设计过于简陋，缺乏质感', type: 'negative' },
                  { id: 2, text: '物流速度慢，超过承诺时效', type: 'negative' },
                  { id: 3, text: '客服响应不及时，态度敷衍', type: 'negative' }
                ].map((point) => (
                  <div 
                    key={point.id}
                    onClick={() => togglePoint(point.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedPoints.includes(point.id) 
                        ? 'border-[#4A6B82] bg-[#4A6B82]/10' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center ${
                        selectedPoints.includes(point.id) ? 'bg-[#4A6B82] border-[#4A6B82]' : 'border-gray-300'
                      }`}>
                        {selectedPoints.includes(point.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <p className="text-sm text-gray-800">{point.text}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">回应策略</label>
                    <textarea 
                      placeholder="简单输入回应方向，如：承认不足，承诺改进，提供补偿方案..." 
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20 focus:border-[#4A6B82] resize-none h-24"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">字数限制</label>
                      <select className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20 focus:border-[#4A6B82]">
                        <option>短图文 (200字内)</option>
                        <option>中长文 (500字内)</option>
                        <option>深度长文 (1000字内)</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="button" className="w-full py-2.5 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                    <Bot className="w-4 h-4 mr-2" />
                    生成回应草稿
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Content Canvas */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-bold text-[#111111]">内容沉浸画布</h3>
            <div className="flex items-center space-x-2">
              <button type="button" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Copy className="w-4 h-4" />
              </button>
              <button type="button" className="px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center">
                <Share className="w-4 h-4 mr-2" />
                一键发布
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto bg-[#F8F9FA]">
            {showPoints ? (
              <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#111111] mb-2">关于近期大家反馈的包装与物流问题的致歉与改进说明</h2>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">#品牌回应</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">#服务升级</span>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                  <p>亲爱的用户们，大家好：</p>
                  <p>近期，我们收到了许多关于产品包装简陋和物流延迟的反馈。首先，我们要向大家致以最诚挚的歉意！对不起，是我们没有做好，辜负了大家的期待。</p>
                  <p>针对大家提出的问题，我们内部已经进行了深刻的反思和紧急整改：</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>关于包装问题：</strong>我们已经紧急联系了新的包装供应商，全面升级了包装材质，增加了防震缓冲层，确保产品在运输过程中的安全。新包装预计将于下周全面投入使用。</li>
                    <li><strong>关于物流延迟：</strong>由于近期订单量激增，导致部分地区物流出现拥堵。我们已经增加了合作的物流公司，并加派了人手进行发货处理。对于已经超时未送达的订单，我们将主动联系您进行补偿。</li>
                  </ol>
                  <p>我们深知，每一次的信任都来之不易。感谢大家的批评与监督，正是因为你们的反馈，我们才能不断进步。我们将持续优化产品和服务，努力为大家带来更好的体验。</p>
                  <p>再次感谢大家的理解与支持！</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                <Bot className="w-12 h-12 text-gray-300" />
                <p>在左侧输入链接并解析，AI 将为您生成高质量文案</p>
              </div>
            )}
          </div>
          
          {/* Bottom AI Chat Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative max-w-3xl mx-auto">
              <input 
                type="text" 
                placeholder="输入指令微调内容，例如：语气再诚恳一点，把第一段精简一下..." 
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20 focus:border-[#4A6B82]"
                disabled={!showPoints}
              />
              <button 
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#4A6B82] hover:bg-[#4A6B82]/10 rounded-lg transition-colors disabled:opacity-50"
                disabled={!showPoints}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
