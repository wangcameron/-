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
          <h1 className="text-[24px] font-medium text-[#242424]">视觉生成</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-1">专注于游戏角色的资产提取与场景重构</p>
        </div>
        <div className="flex bg-[#F5F5F4] p-1 rounded-[12px]">
          {['角色四视图提取', '场景人物无缝替换', '局部精准修改'].map(tab => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[14px] font-medium rounded-[8px] transition-colors ${
                activeTab === tab 
                  ? 'bg-white text-[#242424] shadow-sm' 
                  : 'text-[#6B6B6B] hover:text-[#242424]'
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
          <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E5E5] flex flex-col">
            <h3 className="text-[16px] font-medium text-[#242424] mb-4">资产提取配置</h3>
            
            <div className="space-y-6 flex-1">
              <div>
                <label className="block text-[14px] font-medium text-[#242424] mb-2">上传单张游戏角色图片</label>
                <div className="border-2 border-dashed border-[#E5E5E5] rounded-[16px] p-8 flex flex-col items-center justify-center text-center hover:bg-[rgba(0,0,0,0.04)] transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#F5F5F4] rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-[#242424]" />
                  </div>
                  <p className="text-[14px] font-medium text-[#242424] mb-1">点击或拖拽图片至此</p>
                  <p className="text-[12px] text-[#6B6B6B]">支持 JPG, PNG, WEBP 格式，最大 10MB</p>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#242424] mb-2">生成设置</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-[12px]">
                    <span className="text-[14px] text-[#242424]">生成视角</span>
                    <span className="text-[14px] font-medium text-[#242424]">正面、侧面、背面、特写 (2x2)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-[12px]">
                    <span className="text-[14px] text-[#242424]">背景处理</span>
                    <select className="text-[14px] font-medium text-[#242424] bg-transparent focus:outline-none">
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
              className="w-full py-3 bg-[#242424] text-white rounded-[12px] text-[14px] font-medium hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center mt-6"
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
        <div className="w-full lg:w-2/3 bg-white rounded-[16px] shadow-sm border border-[#E5E5E5] flex flex-col relative overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FBFBFA]/50">
            <h3 className="text-[16px] font-medium text-[#242424]">预览画布</h3>
            <div className="flex items-center space-x-2">
              <button type="button" className="p-2 text-[#6B6B6B] hover:text-[#242424] hover:bg-[rgba(0,0,0,0.04)] rounded-[12px] transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button type="button" className="px-4 py-2 bg-[#242424] text-white rounded-[12px] text-[14px] font-medium hover:bg-black transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-1" />
                归档入库
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto bg-[#F8F9FA] flex items-center justify-center">
            {showResult ? (
              <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                <div className="aspect-square bg-white rounded-[16px] border border-[#E5E5E5] overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char1/500/500" alt="正面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[12px] rounded backdrop-blur-sm">正面</div>
                </div>
                <div className="aspect-square bg-white rounded-[16px] border border-[#E5E5E5] overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char2/500/500" alt="侧面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[12px] rounded backdrop-blur-sm">侧面</div>
                </div>
                <div className="aspect-square bg-white rounded-[16px] border border-[#E5E5E5] overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char3/500/500" alt="背面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[12px] rounded backdrop-blur-sm">背面</div>
                </div>
                <div className="aspect-square bg-white rounded-[16px] border border-[#E5E5E5] overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/char4/500/500" alt="特写" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[12px] rounded backdrop-blur-sm">特写</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-[#6B6B6B] space-y-4">
                <Layers className="w-12 h-12 text-[#E5E5E5]" />
                <p>上传图片并点击生成，AI 将为您推演角色四视图</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
