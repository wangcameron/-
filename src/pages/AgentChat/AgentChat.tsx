import React, { useState, useRef, useEffect } from 'react';
import { Plus, Check, Wrench, FileText, Globe, BarChart, Settings, X, Send, Bot, ArrowRight } from 'lucide-react';

const MODELS = [
  { id: 'gpt-5.2', name: 'Gpt 5.2', desc: 'OpenAI 旗舰模型，综合能力最强' },
  { id: 'gemini-3.0', name: 'Gemini 3.0', desc: 'Google 核心模型，支持超长上下文' },
  { id: 'kimi-2.5', name: 'Kimi 2.5', desc: '月之暗面最新模型，长文本处理优秀' },
  { id: 'doubao-2.0', name: 'Doubao 2.0', desc: '字节跳动主力模型，响应速度极快' },
];

const PLACEHOLDERS = [
  "帮我分析一下昨天逆水寒官号抖音平台的内容发布情况...",
  "帮我创作一条基于逆水寒新版本公告的口播稿...",
  "总结一下近期竞品游戏在各大社媒的更新动向...",
  "今天想干点什么？"
];

const AVAILABLE_SKILLS = [
  { id: 'report_analyzer', name: '报告深度分析', icon: <FileText className="w-4 h-4" />, desc: '自动提取长文档、PDF、数据报告的核心洞察' },
  { id: 'web_search', name: '实时联网搜索', icon: <Globe className="w-4 h-4" />, desc: '获取全网最新资讯和竞品动态' },
  { id: 'chart_generator', name: '数据图表生成', icon: <BarChart className="w-4 h-4" />, desc: '将枯燥的数据转化为直观的可视化图表' },
];

export default function AgentChat({ onNavigateToAnalysis }: { onNavigateToAnalysis?: () => void }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-5.2');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: React.ReactNode}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Skills state
  const [activeSkills, setActiveSkills] = useState<string[]>(['report_analyzer']);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const [isSkillConfigModalOpen, setIsSkillConfigModalOpen] = useState(false);
  const [customSkillMarkdown, setCustomSkillMarkdown] = useState(`# 单平台分析技能配置

## 1. 分析维度
- **流量表现**：播放量、点赞量、评论量、转发量
- **受众画像**：年龄、性别、地域分布
- **内容特征**：视频时长、BGM类型、话题标签

## 2. 分析规则
1. 必须先提取核心数据，用表格呈现。
2. 针对异常数据（如突然爆火或遇冷）进行归因分析。
3. 结论部分必须包含至少3条可执行的优化建议。`);
  
  // Typewriter effect state
  const [placeholderText, setPlaceholderText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Files selected:', files);
      // Handle file upload logic here
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    setIsAnalyzing(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      setIsAnalyzing(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[14px] text-[#63A398] bg-[#E8F5F5] px-4 py-2 rounded-full w-fit font-medium">
              <Bot className="w-4 h-4" />
              <span>已调用【单平台分析】技能</span>
            </div>
            
            <div className="prose prose-sm max-w-none text-[#242424]">
              <h3 className="text-[18px] font-medium text-[#242424] mb-4">📊 小红书单平台昨日数据分析报告</h3>
              
              <h4 className="text-[16px] font-medium text-[#242424] mt-6 mb-3">1. 核心数据表现 (流量维度)</h4>
              <p className="mb-3 text-[14px] text-[#6B6B6B] leading-[1.6]">昨日共发布 7 篇笔记，整体流量呈现“头部爆款带动，中尾部评论倒挂”的特征。核心数据提取如下：</p>
              <div className="overflow-x-auto border border-[#E5E5E5] rounded-[16px] mb-6 shadow-sm">
                <table className="min-w-full divide-y divide-[#E5E5E5] text-[14px]">
                  <thead className="bg-[#FBFBFA]">
                    <tr>
                      <th className="px-6 py-3 text-left text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">作品标题</th>
                      <th className="px-6 py-3 text-left text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">点赞数</th>
                      <th className="px-6 py-3 text-left text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">评论数</th>
                      <th className="px-6 py-3 text-left text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">流量特征</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#E5E5E5]">
                    <tr className="hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-[#242424] font-medium">【逆水寒x唐诗逸】一袭霓裳...</td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#63A398] font-mono">1677</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#242424] font-mono">230</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#63A398]">👍 点赞最高</td>
                    </tr>
                    <tr className="hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-[#242424] font-medium">一衣双态，演绎敦煌美学</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#242424] font-mono">954</td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#D96C6C] font-mono">684</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#D9A05B]">⚠️ 高争议/高分享</td>
                    </tr>
                    <tr className="hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-[#242424] font-medium">【新战令】换上新衣...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#242424] font-mono">474</td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#D96C6C] font-mono">662</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#D96C6C]">⚠️ 严重倒挂 (评&gt;赞)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-[16px] font-medium text-[#242424] mt-6 mb-3">2. 异常数据归因分析</h4>
              <ul className="list-disc pl-5 space-y-2 mb-6 text-[14px] text-[#6B6B6B] leading-[1.6]">
                <li><strong className="text-[#242424]">正面爆火归因（唐诗逸联动）：</strong>国家级舞者联动，自带破圈效应和高质感。受众对“绝美古风”认可度极高。</li>
                <li><strong className="text-[#242424]">负面遇冷/高争议归因（新祥瑞、新战令）：</strong>评论区高频出现“288”、“吃相难看”。男号设计引发众怒（“雷霆发型”），女号服装被吐槽“破布条子”、“同质化严重”。</li>
              </ul>

              <h4 className="text-[16px] font-medium text-[#242424] mt-6 mb-3">3. 可执行优化建议</h4>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-[14px] text-[#6B6B6B] leading-[1.6]">
                <li><strong className="text-[#242424]">男号舆情紧急避险与补偿：</strong>暂时减少争议男号视角的露出，下个版本紧急增加男号专属的“免费优质配饰”。</li>
                <li><strong className="text-[#242424]">调整定价宣发策略：</strong>主动释放“低价位外观返场投票”或“发放半价券”的活动预告。</li>
                <li><strong className="text-[#242424]">祥瑞坐骑动作紧急优化：</strong>针对“新祥瑞罚站”的吐槽，紧急评估增加一个“坐姿”或“待机交互动作”。</li>
              </ol>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <button 
                onClick={() => {
                  if (onNavigateToAnalysis) {
                    onNavigateToAnalysis();
                  }
                }}
                className="flex items-center justify-center space-x-2 w-full py-3.5 bg-[#242424] hover:bg-black text-white rounded-[16px] transition-all font-medium shadow-sm"
              >
                <BarChart className="w-4 h-4" />
                <span>点击进入数据分析大屏查看详情</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )
      }]);
    }, 1500);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModelDropdownOpen(false);
        setIsSkillsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    const currentString = PLACEHOLDERS[placeholderIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentString.length) {
      // Typing
      timeoutId = setTimeout(() => {
        setPlaceholderText(currentString.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80); // Typing speed
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeoutId = setTimeout(() => {
        setPlaceholderText(currentString.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40); // Deleting speed
    } else if (!isDeleting && charIndex === currentString.length) {
      // Pause at the end of typing
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2500); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      // Move to next string
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, placeholderIndex]);

  return (
    <div className="h-full w-full flex flex-col items-center pt-[20vh] bg-[#FBFBFA] relative overflow-hidden">


      <div className="w-full max-w-[48rem] px-4 flex flex-col items-center h-full pb-8 relative z-10">
        {/* Greeting - Only show if no messages */}
        {messages.length === 0 && (
          <div className="mb-12 flex flex-col items-center justify-center mt-10">
            <div className="flex items-center justify-center gap-3">
              <img 
                src="https://img13.360buyimg.com/ddimg/jfs/t1/397796/18/15600/3603/69aa73ebF123b0366/00150b50b56e352c.jpg" 
                alt="Logo" 
                className="w-8 h-8 object-contain mix-blend-darken"
                style={{ mixBlendMode: 'darken' }}
                referrerPolicy="no-referrer"
              />
              <h1 className="text-[32px] font-serif text-[#242424] tracking-tight">
                洞悉数据 生成未来
              </h1>
            </div>
          </div>
        )}

        {/* Chat Messages Area */}
        {messages.length > 0 && (
          <div className="w-full flex-1 overflow-y-auto mb-6 space-y-6 pr-2 scrollbar-thin scrollbar-thumb-[#E5E5E5]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-[24px] px-6 py-4 ${
                  msg.role === 'user' 
                    ? 'bg-[#242424] text-white shadow-sm' 
                    : 'bg-[#E8F5F5] text-[#242424] shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isAnalyzing && (
              <div className="flex justify-start">
                <div className="bg-[#E8F5F5] shadow-sm rounded-[24px] px-6 py-4 flex items-center space-x-4 min-w-[200px]">
                  <div className="w-full h-2 rounded-full overflow-hidden bg-[#F0F9F9]">
                    <div className="w-full h-full skeleton-wave"></div>
                  </div>
                  <span className="text-[14px] text-[#6B6B6B] whitespace-nowrap">正在分析...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Box */}
        <div className={`w-full bg-white rounded-[16px] shadow-sm border border-[#E5E5E5] overflow-visible transition-all focus-within:border-[#242424]/30 focus-within:shadow-md ${messages.length === 0 ? 'mt-0' : 'mt-auto'}`}>
          <div className="px-6 pt-5 pb-0">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={placeholderText}
              className="w-full resize-none outline-none text-[#242424] placeholder-[#6B6B6B] min-h-[84px] text-[15px] bg-transparent leading-[1.6]"
              rows={1}
            />
          </div>
          
          <div className="px-3 py-2 flex items-center justify-between bg-white rounded-b-[16px]">
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
              />
              <button 
                onClick={handleFileUploadClick}
                className="p-2 text-[#6B6B6B] hover:text-[#242424] hover:bg-[rgba(0,0,0,0.04)] rounded-full transition-colors"
                title="上传文件和图片"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
              <div className="flex items-center space-x-2 text-[12px] text-[#6B6B6B] mr-2">
                <span className="flex items-center"><Bot className="w-3.5 h-3.5 mr-1" /> Gemini 3.1 Pro</span>
                <span className="w-1 h-1 rounded-full bg-[#E5E5E5]"></span>
                <span>Nano Banana Pro</span>
              </div>

              {/* Send Button */}
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isAnalyzing}
                className={`ml-2 p-2.5 rounded-full transition-colors flex items-center justify-center ${
                  inputValue.trim() && !isAnalyzing
                    ? 'bg-[#242424] text-white hover:bg-black shadow-sm' 
                    : 'bg-[#F5F5F4] text-[#6B6B6B] cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Configuration Modal */}
      {isSkillConfigModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E5E5]">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-[#242424]" />
                <h2 className="text-[18px] font-medium text-[#242424]">自定义技能配置</h2>
              </div>
              <button 
                onClick={() => setIsSkillConfigModalOpen(false)}
                className="p-2 text-[#6B6B6B] hover:text-[#242424] hover:bg-[rgba(0,0,0,0.04)] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto bg-[#FBFBFA]">
              <div className="mb-6">
                <p className="text-[14px] text-[#6B6B6B] leading-[1.6]">
                  您可以在下方粘贴您的 <code className="bg-[#E5E5E5] px-1.5 py-0.5 rounded text-[#242424] font-mono">.md</code> 格式的技能配置文件。
                  AI 将在执行相关分析（如“单平台分析”）时，严格遵循您在此处定义的维度和规则。
                </p>
              </div>
              
              <div className="bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm">
                <div className="bg-[#FBFBFA] px-4 py-3 border-b border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-[12px] font-mono text-[#6B6B6B]">skills.md</span>
                  <span className="text-[12px] text-[#6B6B6B]">Markdown 支持</span>
                </div>
                <textarea
                  value={customSkillMarkdown}
                  onChange={(e) => setCustomSkillMarkdown(e.target.value)}
                  className="w-full h-64 p-5 resize-none outline-none text-[14px] font-mono text-[#242424] leading-[1.6] bg-transparent"
                  placeholder="在此粘贴您的 Markdown 规则..."
                />
              </div>
            </div>
            
            <div className="px-8 py-5 border-t border-[#E5E5E5] bg-white flex justify-end space-x-4">
              <button 
                onClick={() => setIsSkillConfigModalOpen(false)}
                className="px-6 py-2.5 text-[14px] font-medium text-[#6B6B6B] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#242424] rounded-full transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => setIsSkillConfigModalOpen(false)}
                className="px-6 py-2.5 text-[14px] font-medium text-white bg-[#242424] hover:bg-black rounded-full transition-colors shadow-sm"
              >
                保存并启用
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
