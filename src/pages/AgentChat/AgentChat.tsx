import React, { useState, useRef, useEffect } from 'react';
import { Plus, Settings, X, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const PLACEHOLDERS = [
  "帮我分析一下昨天逆水寒官号抖音平台的内容发布情况...",
  "帮我创作一条基于逆水寒新版本公告的口播稿...",
  "总结一下近期竞品游戏在各大社媒的更新动向...",
  "今天想干点什么？"
];

export default function AgentChat({ onNavigateToAnalysis }: { onNavigateToAnalysis?: () => void }) {
  const [inputValue, setInputValue] = useState('');
  
  // Chat state
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: React.ReactNode}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Skills state
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Files selected:', files);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      // Build conversation history for context
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: typeof msg.content === 'string' ? msg.content : '...' }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: {
          systemInstruction: `你是一个专属的SaaS软件智能体专家（Uten SaaS平台助手）。你拥有该SaaS软件接入的所有知识，并且知道如何用最合适的方式回答用户的问题。
你的回答范围仅限于：
1. 该SaaS软件的功能、使用方法和相关业务。
2. 专业的数据分析、品牌知识库、小红书文案创作等平台内置能力。
3. 与用户进行友好的日常寒暄和打招呼。

请注意：
- 对于超出此范围的问题（例如：实时天气、与业务无关的常识、新闻等），请委婉地拒绝，并引导用户询问与SaaS平台、数据分析或内容创作相关的问题。
- 不要瞎编乱造，确保回答的专业性和准确性。
- 展现出你是这个SaaS软件专家的自信和专业度。

此外，你还具备以下专业技能配置供参考（仅在用户需要数据分析时使用）：\n${customSkillMarkdown}`,
        }
      });

      // Send history first if any (Gemini SDK chat handles history internally if we pass it, but here we just send the latest message. For simplicity, we'll just use generateContent with history if needed, or just send the current message since the user just wants it to be smart).
      // Actually, let's just use generateContent with history.
      const contents = [
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: typeof msg.content === 'string' ? msg.content : '...' }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: contents as any,
        config: {
          systemInstruction: `你是一个专属的SaaS软件智能体专家（Uten SaaS平台助手）。你拥有该SaaS软件接入的所有知识，并且知道如何用最合适的方式回答用户的问题。
你的回答范围仅限于：
1. 该SaaS软件的功能、使用方法和相关业务。
2. 专业的数据分析、品牌知识库、小红书文案创作等平台内置能力。
3. 与用户进行友好的日常寒暄和打招呼。

请注意：
- 对于超出此范围的问题（例如：实时天气、与业务无关的常识、新闻等），请委婉地拒绝，并引导用户询问与SaaS平台、数据分析或内容创作相关的问题。
- 不要瞎编乱造，确保回答的专业性和准确性。
- 展现出你是这个SaaS软件专家的自信和专业度。

此外，你还具备以下专业技能配置供参考（仅在用户需要数据分析时使用）：\n${customSkillMarkdown}`,
        }
      });
      
      setIsAnalyzing(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: (
          <div className="prose prose-sm max-w-none text-[#242424] leading-relaxed">
            <Markdown>{response.text || ''}</Markdown>
          </div>
        )
      }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setIsAnalyzing(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: (
          <div className="text-red-500">
            抱歉，调用大模型时发生错误，请稍后再试。
          </div>
        )
      }]);
    }
  };

  // Typewriter effect logic
  useEffect(() => {
    const currentString = PLACEHOLDERS[placeholderIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentString.length) {
      timeoutId = setTimeout(() => {
        setPlaceholderText(currentString.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      timeoutId = setTimeout(() => {
        setPlaceholderText(currentString.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else if (!isDeleting && charIndex === currentString.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, placeholderIndex]);

  return (
    <div className="h-full w-full flex flex-col bg-[#FBFBFA] relative overflow-hidden">
      <div className="w-full flex-1 flex flex-col items-center h-full relative z-10">
        
        {/* Scrollable Area for Messages */}
        {messages.length > 0 ? (
          <div className="w-full flex-1 overflow-y-auto flex flex-col items-center pt-[10vh] pb-6 scrollbar-thin scrollbar-thumb-[#E5E5E5]">
            <div className="w-full max-w-4xl px-6 flex flex-col space-y-8">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-4 shrink-0 mt-1">
                      <img 
                        src="https://img13.360buyimg.com/ddimg/jfs/t1/397796/18/15600/3603/69aa73ebF123b0366/00150b50b56e352c.jpg" 
                        alt="AI Avatar" 
                        className="w-6 h-6 object-contain mix-blend-darken"
                        style={{ mixBlendMode: 'darken' }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-[#F4F4F4] text-[#4A4A4A] rounded-[24px] px-6 py-4' 
                      : 'text-[#242424] py-2'
                  }`}>
                    {typeof msg.content === 'string' ? (
                      <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              
              {isAnalyzing && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-4 shrink-0 mt-1">
                    <img 
                      src="https://img13.360buyimg.com/ddimg/jfs/t1/397796/18/15600/3603/69aa73ebF123b0366/00150b50b56e352c.jpg" 
                      alt="AI Avatar" 
                      className="w-6 h-6 object-contain mix-blend-darken animate-pulse"
                      style={{ mixBlendMode: 'darken' }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="w-full flex flex-col items-center pt-[20vh]">
            <div className="mb-12 flex flex-col items-center justify-center">
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
          </div>
        )}

        {/* Input Box */}
        <div className={`w-full max-w-4xl px-6 pb-8 ${messages.length === 0 ? 'mt-0' : 'mt-4 shrink-0'}`}>
          <div className="w-full bg-white rounded-[24px] shadow-sm border border-[#E5E5E5] overflow-visible transition-all focus-within:border-[#242424]/30 focus-within:shadow-md">
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
            
            <div className="px-4 py-3 flex items-center justify-between bg-white rounded-b-[24px]">
              <div className="flex items-center space-x-1">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                />
                <button 
                  onClick={handleFileUploadClick}
                  className="p-2 text-[#6B6B6B] hover:text-[#242424] hover:bg-[#F4F4F4] rounded-full transition-colors"
                  title="上传文件和图片"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsSkillConfigModalOpen(true)}
                  className="p-2 text-[#6B6B6B] hover:text-[#242424] hover:bg-[#F4F4F4] rounded-full transition-colors"
                  title="配置技能"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isAnalyzing}
                  className={`p-3 rounded-full transition-colors flex items-center justify-center ${
                    inputValue.trim() && !isAnalyzing
                      ? 'bg-[#242424] text-white hover:bg-black shadow-md' 
                      : 'bg-[#F5F5F4] text-[#6B6B6B] cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
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
