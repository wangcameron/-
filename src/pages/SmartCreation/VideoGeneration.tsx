import { useState } from 'react';
import { 
  FileText, 
  Lightbulb, 
  Film, 
  Upload, 
  Wand2, 
  Play, 
  CheckCircle2,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Settings
} from 'lucide-react';

export default function VideoGeneration() {
  const [activeTab, setActiveTab] = useState('自有剧本直出');
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep(2);
    }, 2000);
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#242424]">视频生成</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">标准化的影视工业管线，解决分镜不连贯痛点</p>
        </div>
        <div className="flex bg-[#F5F5F4] p-1 rounded-lg">
          {['自有剧本直出', '脑暴共创直出', '视频二创仿写'].map(tab => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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

      {/* Pipeline Steps */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-[#E5E5E5]">
        {[
          { num: 1, title: '剧本输入与解析' },
          { num: 2, title: '资产选角绑定' },
          { num: 3, title: '导演控制台 (分镜)' },
          { num: 4, title: '切片生成与合成' }
        ].map((step, idx) => (
          <div key={step.num} className="flex items-center flex-1">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              currentStep >= step.num 
                ? 'bg-[#242424] text-white' 
                : 'bg-[#F5F5F4] text-[#6B6B6B]'
            }`}>
              {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
            </div>
            <span className={`ml-3 text-sm font-medium ${
              currentStep >= step.num ? 'text-[#242424]' : 'text-[#6B6B6B]'
            }`}>
              {step.title}
            </span>
            {idx < 3 && (
              <div className={`flex-1 h-px mx-4 ${
                currentStep > step.num ? 'bg-[#242424]' : 'bg-[#E5E5E5]'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {currentStep === 1 && (
          <div className="w-full bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-8 flex flex-col">
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#F5F5F4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[#242424]" />
                </div>
                <h2 className="text-xl font-bold text-[#242424] mb-2">输入脚本文案</h2>
                <p className="text-sm text-[#6B6B6B]">AI 将自动分析时长并拆解剧情梗概、角色列表、分镜描述</p>
              </div>
              
              <div className="flex-1 flex flex-col">
                <textarea 
                  placeholder="在此粘贴您的脚本文案..." 
                  className="flex-1 w-full p-6 bg-[#FBFBFA] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424] resize-none mb-6"
                ></textarea>
                
                <button 
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full py-4 bg-[#242424] text-white rounded-xl text-base font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <Wand2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-5 h-5 mr-2" />
                  )}
                  {isAnalyzing ? 'AI 正在拆解剧本...' : '开始解析剧本'}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Left: Script Analysis Result */}
            <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6 flex flex-col">
              <h3 className="text-base font-bold text-[#242424] mb-4 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-[#242424]" />
                剧本解析结果
              </h3>
              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                <div className="p-4 bg-[#FBFBFA] rounded-lg">
                  <h4 className="text-sm font-bold text-[#242424] mb-2">剧情梗概</h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    主角在春季樱花林中漫步，展示新款春装的轻盈感，随后遇到好友，两人一起在咖啡馆享受下午茶，突出产品的日常百搭属性。
                  </p>
                </div>
                <div className="p-4 bg-[#FBFBFA] rounded-lg">
                  <h4 className="text-sm font-bold text-[#242424] mb-2">预估时长</h4>
                  <p className="text-2xl font-bold text-[#242424] font-mono">15s</p>
                </div>
                <div className="p-4 bg-[#FBFBFA] rounded-lg">
                  <h4 className="text-sm font-bold text-[#242424] mb-2">角色列表 (2)</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-[#242424]">主角 (女，20-25岁)</span>
                      <span className="px-2 py-0.5 bg-[#F5F5F4] text-[#242424] rounded text-xs font-medium">待绑定</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-[#242424]">好友 (女，20-25岁)</span>
                      <span className="px-2 py-0.5 bg-[#F5F5F4] text-[#242424] rounded text-xs font-medium">待绑定</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Asset Binding */}
            <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-[#242424] flex items-center">
                  <Users className="w-4 h-4 mr-2 text-[#242424]" />
                  资产选角绑定
                </h3>
                <button type="button" className="text-sm text-[#242424] font-medium hover:underline">
                  从视觉资产库导入
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                {/* Character 1 */}
                <div className="border border-[#E5E5E5] rounded-xl p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-[#242424]">主角</h4>
                    <span className="text-xs text-[#6B6B6B]">女，20-25岁</span>
                  </div>
                  <div className="flex-1 border-2 border-dashed border-[#E5E5E5] rounded-lg flex flex-col items-center justify-center text-center hover:bg-[rgba(0,0,0,0.04)] transition-colors cursor-pointer mb-4">
                    <ImageIcon className="w-8 h-8 text-[#6B6B6B] mb-2" />
                    <p className="text-sm font-medium text-[#6B6B6B]">点击绑定四视图资产</p>
                  </div>
                </div>

                {/* Character 2 */}
                <div className="border border-[#E5E5E5] rounded-xl p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-[#242424]">好友</h4>
                    <span className="text-xs text-[#6B6B6B]">女，20-25岁</span>
                  </div>
                  <div className="flex-1 border-2 border-dashed border-[#E5E5E5] rounded-lg flex flex-col items-center justify-center text-center hover:bg-[rgba(0,0,0,0.04)] transition-colors cursor-pointer mb-4">
                    <ImageIcon className="w-8 h-8 text-[#6B6B6B] mb-2" />
                    <p className="text-sm font-medium text-[#6B6B6B]">点击绑定四视图资产</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-[#242424] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
                >
                  确认绑定，进入导演控制台
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Left: Storyboard */}
            <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-[#E5E5E5] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FBFBFA]/50">
                <h3 className="text-base font-bold text-[#242424]">导演控制台 (Storyboard)</h3>
                <span className="text-sm font-medium text-[#6B6B6B]">共 3 个分镜</span>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8F9FA]">
                {[
                  { id: 1, duration: '0-5s', desc: '全景：主角在樱花林中漫步，微风吹过，花瓣飘落。', camera: '平移镜头，跟随主角', prompt: 'A young woman walking in a cherry blossom forest, spring, cinematic lighting, wide shot' },
                  { id: 2, duration: '5-10s', desc: '中景：主角转身微笑，展示外套的轻盈感。', camera: '固定镜头，慢动作', prompt: 'A young woman turning around and smiling, wearing a light spring jacket, medium shot, slow motion' },
                  { id: 3, duration: '10-15s', desc: '近景：主角与好友在咖啡馆碰杯，两人相视而笑。', camera: '特写镜头', prompt: 'Two young women clinking coffee cups in a cafe, smiling at each other, close up' }
                ].map((shot) => (
                  <div key={shot.id} className="bg-white p-4 rounded-xl shadow-sm border border-[#E5E5E5] flex gap-4">
                    <div className="w-32 h-24 bg-[#F5F5F4] rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden group cursor-pointer">
                      <ImageIcon className="w-6 h-6 text-[#6B6B6B]" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-medium">生成预览</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-1 bg-[#F5F5F4] text-[#242424] rounded">镜头 {shot.id}</span>
                        <span className="text-xs font-mono text-[#6B6B6B]">{shot.duration}</span>
                      </div>
                      <p className="text-sm text-[#242424] font-medium mb-1">{shot.desc}</p>
                      <p className="text-xs text-[#6B6B6B] mb-2">运镜：{shot.camera}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[#6B6B6B]">AI Prompt:</span>
                        <p className="text-xs text-[#6B6B6B] truncate flex-1">{shot.prompt}</p>
                        <button type="button" className="text-xs text-[#242424] hover:underline">编辑</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Assistant */}
            <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-[#E5E5E5] flex flex-col">
              <div className="p-4 border-b border-[#E5E5E5] flex items-center space-x-2">
                <Bot className="w-5 h-5 text-[#242424]" />
                <h3 className="text-base font-bold text-[#242424]">AI 导演助理</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F4] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#242424]" />
                  </div>
                  <div className="bg-[#FBFBFA] p-3 rounded-lg rounded-tl-none text-sm text-[#242424]">
                    剧本已拆解完毕，共 3 个分镜。您可以直接在左侧修改分镜描述，或者告诉我您的修改意见。例如："把镜头2的背景换成海边"。
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E5E5]">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="输入指令微调分镜..." 
                    className="w-full pl-4 pr-10 py-2 bg-[#FBFBFA] border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424]"
                  />
                  <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-[#242424] hover:bg-[rgba(0,0,0,0.04)] rounded-md transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="w-full mt-4 py-3 bg-[#242424] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
                >
                  确认分镜，生成宫格定调
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="w-full bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-8 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full text-center space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#242424] mb-2">多宫格分镜总览</h2>
                <p className="text-sm text-[#6B6B6B]">请确认人物与场景画风一致，确认后将逐一生成动态视频</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-video bg-[#F5F5F4] rounded-xl overflow-hidden relative">
                  <img src="https://picsum.photos/seed/vid1/640/360" alt="分镜1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">镜头 1</div>
                </div>
                <div className="aspect-video bg-[#F5F5F4] rounded-xl overflow-hidden relative">
                  <img src="https://picsum.photos/seed/vid2/640/360" alt="分镜2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">镜头 2</div>
                </div>
                <div className="aspect-video bg-[#F5F5F4] rounded-xl overflow-hidden relative">
                  <img src="https://picsum.photos/seed/vid3/640/360" alt="分镜3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">镜头 3</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 pt-8">
                <button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-4 bg-white text-[#242424] border border-[#E5E5E5] rounded-xl text-base font-bold hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                >
                  返回修改
                </button>
                <button 
                  type="button"
                  className="px-12 py-4 bg-[#242424] text-white rounded-xl text-base font-bold hover:bg-black transition-colors shadow-lg shadow-black/20 flex items-center"
                >
                  <Film className="w-5 h-5 mr-2" />
                  一键合成视频
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Bot and Send icons
function Bot(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function Send(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
