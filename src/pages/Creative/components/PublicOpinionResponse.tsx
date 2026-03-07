import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Copy, 
  Send, 
  MessageSquare, 
  X, 
  ChevronRight, 
  Loader2,
  Save,
  RefreshCw,
  MoreHorizontal,
  Flame
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { GoogleGenAI } from "@google/genai";
import { globalStore } from '../../../store';

// --- Interfaces ---

interface Project {
  id: string;
  name: string;
  createdAt: string;
  status: 'draft' | 'completed';
  file?: File;
  analysis?: AnalysisResult;
  articles: Article[];
}

interface AnalysisResult {
  summary: string;
  viewpoints: string[];
}

interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: 'generated' | 'published';
}

interface GenerationConfig {
  brand: string;
  length: 'short' | 'medium' | 'long';
  count: number;
  selectedViewpoints: string[];
  knowledgeFolders: number[];
}

// --- Mock Data ---

const MOCK_BRANDS = ['逆水寒手游', '蛋仔派对', '永劫无间', '阴阳师'];
const KNOWLEDGE_FOLDERS = [
  { id: 1, name: '游戏世界观设定' },
  { id: 4, name: '角色四视图资产' },
  { id: 5, name: '品牌 Logo 与 VI' },
  { id: 6, name: '写作 Skills 手册' }
];

// --- Component ---

export default function PublicOpinionResponse({ initialParams }: { initialParams?: any }) {
  // State
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [activeFunction, setActiveFunction] = useState<'response' | 'proposition'>('response');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: '新版本观点回应-0302',
      createdAt: '2026-03-02',
      status: 'completed',
      articles: []
    }
  ]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  
  // Detail View State
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'done'>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedViewpoints, setSelectedViewpoints] = useState<string[]>([]);
  const [config, setConfig] = useState<GenerationConfig>({
    brand: MOCK_BRANDS[0],
    length: 'medium',
    count: 1,
    selectedViewpoints: [],
    knowledgeFolders: [6]
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [chatInput, setChatInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle initialParams from cross-module navigation
  React.useEffect(() => {
    if (initialParams && initialParams.viewpoint) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: `联动生成: ${initialParams.viewpoint.substring(0, 15)}...`,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'draft',
        articles: [],
        analysis: {
          summary: '从智能日报联动导入的观点',
          viewpoints: [initialParams.viewpoint]
        }
      };
      setProjects(prev => [newProject, ...prev]);
      setCurrentProject(newProject);
      setView('detail');
      setUploadStatus('done');
      setAnalysisResult(newProject.analysis!);
      setSelectedViewpoints([initialParams.viewpoint]);
      setConfig(prev => ({ ...prev, selectedViewpoints: [initialParams.viewpoint] }));
    }
  }, [initialParams]);

  // --- Handlers ---

  const [isSaved, setIsSaved] = useState(false);

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
      articles: []
    };
    setProjects([newProject, ...projects]);
    setCurrentProject(newProject);
    setView('detail');
    setNewProjectName('');
    // Reset detail state
    setUploadStatus('idle');
    setAnalysisResult(null);
    setSelectedViewpoints([]);
    setConfig({
      brand: MOCK_BRANDS[0],
      length: 'medium',
      count: 1,
      selectedViewpoints: [],
      knowledgeFolders: [6]
    });
  };

  const processFile = async (file: File) => {
    setUploadStatus('uploading');
    
    try {
      // 1. Read file content
      let fileContent = '';
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        fileContent = JSON.stringify(jsonData);
      } else {
        // Fallback for text files
        fileContent = await file.text();
      }

      setUploadStatus('analyzing');

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY || '' });

      // 2. Call Gemini API for analysis
      const prompt = `
        你是一个专业的数据分析师和舆情专家。请分析以下数据（来自Excel或文本），并提供以下输出：
        1. 内容归纳总结（summary）：简要概括数据反映的主要问题、趋势或反馈。
        2. 提炼3个主要观点（viewpoints）：基于数据提炼出3个关键的、具体的观点或发现。

        数据内容：
        ${fileContent.substring(0, 50000)} // Limit content length to avoid token limits

        请以JSON格式返回结果，格式如下：
        {
          "summary": "...",
          "viewpoints": ["观点1...", "观点2...", "观点3..."]
        }
      `;

      let response;
      let retries = 3;
      let delay = 2000;

      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
              responseMimeType: "application/json"
            }
          });
          break; // Success, exit loop
        } catch (error: any) {
          console.warn(`API call failed. Retries left: ${retries - 1}`, error);
          retries--;
          if (retries === 0) {
            throw error; // Rethrow if out of retries
          }
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      }

      if (!response) throw new Error("Failed to get response from AI after retries");

      const resultText = response.text;
      if (!resultText) throw new Error("No response from AI");

      let result: AnalysisResult;
      try {
        // Attempt to parse JSON directly
        result = JSON.parse(resultText);
      } catch (e) {
        // If direct parsing fails, try to extract JSON from markdown code blocks
        const jsonMatch = resultText.match(/```json\n([\s\S]*?)\n```/) || resultText.match(/```([\s\S]*?)```/);
        if (jsonMatch && jsonMatch[1]) {
          result = JSON.parse(jsonMatch[1]);
        } else {
          throw new Error("Failed to parse AI response as JSON");
        }
      }

      // Ensure viewpoints is an array
      if (!Array.isArray(result.viewpoints)) {
        result.viewpoints = [];
      }

      setAnalysisResult(result);
      setUploadStatus('done');
      
      // Save to project
      if (currentProject) {
        const updatedProject = { ...currentProject, analysis: result, file: file };
        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      }

    } catch (error) {
      console.error("Analysis failed:", error);
      setUploadStatus('idle');
      alert("分析失败，请重试。");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleGenerate = async () => {
    if (selectedViewpoints.length === 0) {
      alert("请至少选择一个观点");
      return;
    }
    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY || '' });

      // Fetch knowledge base content
      const allAssets = globalStore.getAssets();
      const selectedAssets = allAssets.filter(a => config.knowledgeFolders.includes(a.folderId));
      
      let knowledgeContext = '';
      if (selectedAssets.length > 0) {
        knowledgeContext = '\n\n【品牌知识库参考内容】\n' + selectedAssets.map(a => {
          return `--- 文件: ${a.name} ---\n${a.content || '无文本内容'}\n`;
        }).join('\n');
      }

      const prompt = `
        你是一个专业的小红书KOL/KOC内容创作者。
        请根据以下设定的条件，为每个选中的观点写一篇小红书风格的种草/回应文章。
        
        业务背景：我们代表品牌方（${config.brand}），通过第三方KOL/KOC账号，从路人或influencer的角度去回应这些观点。
        如果观点是正面的，请多加传播和赞美；如果观点是负面的，请从正面的角度帮助品牌逆转负面舆情，进行合理的解释或安抚，语气要自然，符合人设。
        
        【重要要求】：
        请仔细阅读下方提供的【品牌知识库参考内容】（特别是 SKILL.md 等写作技巧手册）。
        在写作时，必须严格遵循手册中的技巧，例如“渐进式披露”（不要一次性抛出所有信息，像剥洋葱一样层层递进，先抛出悬念或痛点，再逐步给出解决方案和核心卖点）。
        
        设定条件：
        - 游戏品牌：${config.brand}
        - 写作人设：游戏玩家
        - 文章长度：${config.length === 'short' ? '100字以内' : config.length === 'medium' ? '100-300字' : '300字以上'}
        - 需要回应的观点：
        ${selectedViewpoints.map((v, i) => `${i + 1}. ${v}`).join('\n')}
        ${knowledgeContext}
        
        请生成 ${config.count} 篇文章。
        返回JSON格式，格式如下：
        {
          "articles": [
            {
              "title": "文章标题，吸引人，带有小红书风格的emoji",
              "content": "文章正文，包含适当的emoji，符合人设和长度要求",
              "tags": ["#标签1", "#标签2"]
            }
          ]
        }
      `;

      let response;
      let retries = 3;
      let delay = 2000;

      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
              responseMimeType: "application/json"
            }
          });
          break;
        } catch (error: any) {
          console.warn(`API call failed. Retries left: ${retries - 1}`, error);
          retries--;
          if (retries === 0) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        }
      }

      if (!response) throw new Error("Failed to get response from AI after retries");

      const resultText = response.text;
      if (!resultText) throw new Error("No response from AI");

      let result;
      try {
        result = JSON.parse(resultText);
      } catch (e) {
        const jsonMatch = resultText.match(/```json\n([\s\S]*?)\n```/) || resultText.match(/```([\s\S]*?)```/);
        if (jsonMatch && jsonMatch[1]) {
          result = JSON.parse(jsonMatch[1]);
        } else {
          throw new Error("Failed to parse AI response as JSON");
        }
      }

      const newArticles: Article[] = result.articles.map((a: any, i: number) => ({
        id: `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`,
        title: a.title,
        content: a.content,
        tags: a.tags || [],
        status: 'generated'
      }));
      
      if (currentProject) {
        const updatedProject = { ...currentProject, articles: [...currentProject.articles, ...newArticles] };
        setCurrentProject(updatedProject);
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
      }
    } catch (error) {
      console.error("Generation failed:", error);
      alert("生成失败，请重试。");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveViewpoints = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDeleteArticle = (articleId: string) => {
    if (!currentProject) return;
    const updatedArticles = currentProject.articles.filter(a => a.id !== articleId);
    const updatedProject = { ...currentProject, articles: updatedArticles };
    setCurrentProject(updatedProject);
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handlePublish = (articleId: string) => {
    // Mock publish
    alert('已生成发布二维码，请使用小红书APP扫码发布');
    if (!currentProject) return;
    const updatedArticles = currentProject.articles.map(a => 
      a.id === articleId ? { ...a, status: 'published' as const } : a
    );
    const updatedProject = { ...currentProject, articles: updatedArticles };
    setCurrentProject(updatedProject);
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  // --- Renderers ---

  const renderProjectList = () => (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-8 pb-12 pt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#6B6B6B] mb-1">智能创作</span>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-black text-[#111111]">小红书写手</span>
          </div>
        </div>
      </div>

      {/* Function Selection */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button type="button" className="pb-3 text-sm font-bold text-[#111111] border-b-2 border-[#111111]">观点回应</button>
        <button type="button" className="pb-3 text-sm font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors">命题文章</button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-[#111111]">项目列表</h2>
        <button 
          type="button"
          onClick={() => setView('create')}
          className="flex items-center bg-[#111111] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          新建项目
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div 
            key={project.id}
            onClick={() => {
              setCurrentProject(project);
              setView('detail');
              
              if (project.analysis) {
                 setUploadStatus('done');
                 setAnalysisResult(project.analysis);
              } else if (project.articles.length > 0) {
                 // Fallback for mock project
                 setUploadStatus('done');
                 setAnalysisResult({
                    summary: '文档主要反馈了玩家对于新版本“幻梦之境”中掉率过低的不满，同时也提到了新地图美术风格的认可。主要集中在副本掉落机制、日常任务繁琐以及客户端闪退三个方面。',
                    viewpoints: ['玩家普遍认为新副本掉率过低，投入产出比不合理。', '日常任务流程过长，希望增加扫荡功能。', '部分机型在进入新地图时存在严重闪退现象。']
                 });
              } else {
                 setUploadStatus('idle');
                 setAnalysisResult(null);
              }
              
              setSelectedViewpoints([]);
              setConfig({
                brand: MOCK_BRANDS[0],
                length: 'medium',
                count: 1,
                selectedViewpoints: [],
                knowledgeFolders: [6]
              });
            }}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#111111] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-lg text-[#111111]">
                <FileText className="w-6 h-6" />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-[#6B6B6B]'}`}>
                {project.status === 'completed' ? '已完成' : '进行中'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#3182CE] transition-colors">{project.name}</h3>
            <p className="text-sm text-[#6B6B6B] mb-4">创建时间：{project.createdAt}</p>
            <div className="flex items-center text-sm text-[#6B6B6B]">
              <FileText className="w-4 h-4 mr-1" />
              {project.articles.length} 篇文章
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-[#111111] mb-6">新建观点回应项目</h3>
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">项目名称</label>
            <input 
              type="text" 
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="例如：新版本掉率问题应对"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button 
            type="button"
            onClick={() => setView('list')}
            className="px-4 py-2 text-sm font-bold text-[#6B6B6B] hover:bg-gray-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button 
            type="button"
            onClick={handleCreateProject}
            disabled={!newProjectName.trim()}
            className="px-6 py-2 bg-[#111111] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            创建项目
          </button>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="flex h-full">
      {/* Left Panel: Configuration */}
      <div className="w-1/2 border-r border-gray-200 bg-white flex flex-col h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <button type="button" onClick={() => setView('list')} className="mr-4 text-[#6B6B6B] hover:text-[#111111]">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-[#111111]">{currentProject?.name}</h2>
              <span className="text-xs text-[#6B6B6B]">观点回应项目</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Step 1: Upload */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold mr-3">1</div>
              <h3 className="text-base font-bold text-[#111111]">上传文档</h3>
            </div>
            
            {uploadStatus === 'idle' ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#111111] hover:bg-gray-50 transition-all group"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept=".doc,.docx,.pdf,.txt,.xlsx"
                  onChange={handleFileUpload}
                />
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Upload className="w-6 h-6 text-[#6B6B6B] group-hover:text-[#111111]" />
                </div>
                <p className="text-sm font-bold text-gray-700 mb-1">点击上传文档</p>
                <p className="text-xs text-[#6B6B6B]">支持 Word, Excel, PDF, TXT 格式</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-[#111111] mr-3" />
                  <div>
                    <p className="text-sm font-bold text-[#111111]">观点提炼报告.docx</p>
                    <p className="text-xs text-[#6B6B6B]">
                      {uploadStatus === 'uploading' && '上传中...'}
                      {uploadStatus === 'analyzing' && 'AI 分析中...'}
                      {uploadStatus === 'done' && '分析完成'}
                    </p>
                  </div>
                </div>
                {uploadStatus === 'uploading' || uploadStatus === 'analyzing' ? (
                  <Loader2 className="w-5 h-5 text-[#111111] animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            )}
          </section>

          {/* Step 2: Analysis Result */}
          {analysisResult && (
            <section className="animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold mr-3">2</div>
                <h3 className="text-base font-bold text-[#111111]">AI 内容分析</h3>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">内容归纳总结</h4>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
                    {analysisResult.summary}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">提炼观点 (选择以生成文章)</h4>
                  <div className="space-y-2">
                    {analysisResult.viewpoints?.map((point, idx) => (
                      <label key={idx} className="flex items-start p-3 bg-white rounded-lg border border-gray-100 cursor-pointer hover:border-[#111111] transition-colors">
                        <input 
                          type="checkbox" 
                          className="mt-1 mr-3 rounded text-[#3182CE] focus:ring-[#3182CE]"
                          checked={selectedViewpoints.includes(point)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedViewpoints([...selectedViewpoints, point]);
                              setConfig({...config, selectedViewpoints: [...config.selectedViewpoints, point]});
                            } else {
                              setSelectedViewpoints(selectedViewpoints.filter(p => p !== point));
                              setConfig({...config, selectedViewpoints: config.selectedViewpoints.filter(p => p !== point)});
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">{point}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={handleSaveViewpoints}
                    className={`text-xs font-bold flex items-center transition-colors ${isSaved ? 'text-green-600' : 'text-[#3182CE] hover:text-[#2B6CB0]'}`}
                  >
                    {isSaved ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Save className="w-3 h-3 mr-1" />} 
                    {isSaved ? '已保存' : '保存观点'}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Generation Config */}
          {analysisResult && (
            <section className="animate-in slide-in-from-bottom-4 fade-in duration-500 delay-100">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold mr-3">3</div>
                <h3 className="text-base font-bold text-[#111111]">文章生成配置</h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6B6B6B] mb-1.5">游戏品牌</label>
                    <select 
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      value={config.brand}
                      onChange={(e) => setConfig({...config, brand: e.target.value})}
                    >
                      {MOCK_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B6B6B] mb-1.5">文章长度</label>
                    <select 
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      value={config.length}
                      onChange={(e) => setConfig({...config, length: e.target.value as any})}
                    >
                      <option value="short">100字以内</option>
                      <option value="medium">100-300字</option>
                      <option value="long">300字以上</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6B6B6B] mb-1.5">生成篇数 (1-10)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      value={config.count}
                      onChange={(e) => setConfig({...config, count: parseInt(e.target.value) || 1})}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-[#6B6B6B]">参考品牌知识库</label>
                    <span className="text-xs text-[#3182CE] hover:underline flex items-center cursor-pointer">
                      管理知识库 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {KNOWLEDGE_FOLDERS.map(folder => (
                      <button
                        key={folder.id}
                        onClick={() => {
                          if (config.knowledgeFolders.includes(folder.id)) {
                            setConfig({...config, knowledgeFolders: config.knowledgeFolders.filter(id => id !== folder.id)});
                          } else {
                            setConfig({...config, knowledgeFolders: [...config.knowledgeFolders, folder.id]});
                          }
                        }}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          config.knowledgeFolders.includes(folder.id)
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-[#6B6B6B] border-gray-200 hover:border-[#111111]'
                        }`}
                      >
                        {folder.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || selectedViewpoints.length === 0}
                  className="w-full py-3 bg-[#111111] text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg shadow-gray-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      AI 正在撰写中...
                    </>
                  ) : (
                    <>
                      <Flame className="w-5 h-5 mr-2" />
                      开始生成文章
                    </>
                  )}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Right Panel: Results */}
      <div className="w-1/2 bg-gray-50 h-full overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#111111]">生成结果</h2>
            <span className="text-sm text-[#6B6B6B]">共 {currentProject?.articles.length || 0} 篇文章</span>
          </div>

          {currentProject?.articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-[#6B6B6B] border-2 border-dashed border-gray-200 rounded-xl">
              <FileText className="w-16 h-16 mb-4 opacity-20" />
              <p>暂无生成文章，请在左侧配置并开始生成</p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentProject?.articles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-[#111111] leading-tight">{article.title}</h3>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setEditingArticle(article)}
                          className="p-1.5 text-[#6B6B6B] hover:text-[#111111] hover:bg-gray-100 rounded-lg transition-colors"
                          title="编辑/对话"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-1.5 text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-[#6B6B6B] mb-4 whitespace-pre-wrap line-clamp-4">
                      {article.content}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-xs text-[#111111] bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <div className="relative group/copy">
                          <button className="text-xs font-bold text-[#6B6B6B] hover:text-[#111111] flex items-center px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                            <Copy className="w-3 h-3 mr-1" /> 复制
                          </button>
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover/copy:flex flex-col bg-white shadow-lg rounded-lg border border-gray-100 py-1 min-w-[100px] z-10">
                            <button 
                              onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(article.title); }}
                              className="text-xs text-left px-3 py-2 hover:bg-gray-50 text-gray-700"
                            >
                              复制标题
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(article.content); }}
                              className="text-xs text-left px-3 py-2 hover:bg-gray-50 text-gray-700"
                            >
                              复制正文
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(article.tags.join(' ')); }}
                              className="text-xs text-left px-3 py-2 hover:bg-gray-50 text-gray-700"
                            >
                              复制话题
                            </button>
                          </div>
                        </div>
                        <button className="text-xs font-bold text-[#6B6B6B] hover:text-[#111111] flex items-center px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                          <Download className="w-3 h-3 mr-1" /> 下载
                        </button>
                      </div>
                      <button 
                        onClick={() => handlePublish(article.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center transition-colors ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-700 cursor-default' 
                            : 'bg-[#111111] text-white hover:bg-gray-800'
                        }`}
                      >
                        {article.status === 'published' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" /> 已发布
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3 mr-1" /> 一键发布
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#111111]">文章编辑与优化</h3>
              <button 
                onClick={() => setEditingArticle(null)}
                className="text-[#6B6B6B] hover:text-[#6B6B6B] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Article View */}
              <div className="w-1/2 p-8 overflow-y-auto border-r border-gray-200 bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-sm min-h-full">
                  <input 
                    className="text-2xl font-bold text-[#111111] mb-6 w-full border-none focus:ring-0 p-0"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                  />
                  <textarea 
                    className="w-full h-[500px] text-base text-gray-700 leading-relaxed border-none focus:ring-0 p-0 resize-none"
                    value={editingArticle.content}
                    onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                  />
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <input 
                      className="w-full text-sm text-[#111111] border-none focus:ring-0 p-0"
                      value={editingArticle.tags.join(' ')}
                      onChange={(e) => setEditingArticle({...editingArticle, tags: e.target.value.split(' ')})}
                    />
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="w-1/2 flex flex-col bg-white">
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 max-w-[80%]">
                      我是您的 AI 写作助手。您可以直接在左侧修改文章，或者告诉我您的修改建议，我会帮您重新润色。
                    </div>
                  </div>
                  {/* Mock Chat History */}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="例如：把语气改得更活泼一点..."
                      className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && chatInput.trim()) {
                          // Mock send
                          setChatInput('');
                          // Simulate AI response
                          setTimeout(() => {
                            // In real app, this would update the article content
                            alert('AI 已收到修改建议 (Mock)');
                          }, 1000);
                        }
                      }}
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-2 p-1.5 bg-[#111111] text-white rounded-lg hover:bg-black transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3 bg-gray-50">
              <button 
                type="button"
                onClick={() => setEditingArticle(null)}
                className="px-4 py-2 text-sm font-bold text-[#6B6B6B] hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button 
                type="button"
                onClick={() => {
                  // Save changes
                  if (currentProject) {
                    const updatedArticles = currentProject.articles.map(a => 
                      a.id === editingArticle.id ? editingArticle : a
                    );
                    const updatedProject = { ...currentProject, articles: updatedArticles };
                    setCurrentProject(updatedProject);
                    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
                  }
                  setEditingArticle(null);
                }}
                className="px-6 py-2 bg-[#111111] text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
              >
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full bg-[#F8F9FA]">
      {view === 'list' && renderProjectList()}
      {view === 'create' && renderCreateModal()}
      {view === 'detail' && renderDetailView()}
    </div>
  );
}
