import { useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Wand2, 
  Download, 
  Plus,
  Layers
} from 'lucide-react';

export default function VisualGeneration() {
  const [activeTab, setActiveTab] = useState('角色四视图提取');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">视觉生成</h1>
          <p className="text-sm text-gray-500 mt-1">专注于游戏角色的资产提取与场景重构</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['角色四视图提取', '场景人物无缝替换', '局部精准修改'].map(tab => (
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
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left: Control Panel */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-base font-bold text-[#111111] mb-4">资产提取配置</h3>
            
            <div className="space-y-6 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">上传单张游戏角色图片</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#4A6B82]/10 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-[#4A6B82]" />
                  </div>
                  <p className="text-sm font-medium text-[#111111] mb-1">点击或拖拽图片至此</p>
                  <p className="text-xs text-gray-500">支持 JPG, PNG, WEBP 格式，最大 10MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">生成设置</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-gray-700">生成视角</span>
                    <span className="text-sm font-medium text-[#111111]">正面、侧面、背面、特写 (2x2)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-gray-700">背景处理</span>
                    <select className="text-sm font-medium text-[#111111] bg-transparent focus:outline-none">
                      <option>自动抠除背景 (纯白底)</option>
                      <option>保留原背景</option>
                      <option>替换为绿幕</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center mt-6"
            >
              {isGenerating ? (
                <Wand2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Wand2 className="w-4 h-4 mr-2" />
              )}
              {isGenerating ? 'AI 智能推演中...' : '开始提取四视图'}
            </button>
          </div>
        </div>

        {/* Right: Preview Canvas */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-bold text-[#111111]">预览画布</h3>
            <div className="flex items-center space-x-2">
              <button type="button" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button type="button" className="px-4 py-2 bg-[#4A6B82] text-white rounded-lg text-sm font-medium hover:bg-[#3A5A70] transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-1" />
                归档入库
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto bg-[#F8F9FA] flex items-center justify-center">
            {showResult ? (
              <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char1/500/500" alt="正面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">正面</div>
                </div>
                <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char2/500/500" alt="侧面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">侧面</div>
                </div>
                <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char3/500/500" alt="背面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">背面</div>
                </div>
                <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char4/500/500" alt="特写" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">特写</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 space-y-4">
                <Layers className="w-12 h-12 text-gray-300" />
                <p>上传图片并点击生成，AI 将为您推演角色四视图</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
