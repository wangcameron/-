import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SmartDailyReport from './pages/DataInsights/SmartDailyReport';
import XiaohongshuWriter from './pages/Creative/XiaohongshuWriter';
import VisualGeneration from './pages/SmartCreation/VisualGeneration';
import VideoGeneration from './pages/SmartCreation/VideoGeneration';
import AgentBuilder from './pages/SmartCreation/AgentBuilder';
import BrandKnowledgeBase from './pages/AssetCenter/BrandKnowledgeBase';
import ChannelAuthorization from './pages/AssetCenter/ChannelAuthorization';
import AgentChat from './pages/AgentChat/AgentChat';

export default function App() {
  const [activeNav, setActiveNav] = useState('Agent');
  const [reportDate, setReportDate] = useState<string | null>(null);
  const [writerParams, setWriterParams] = useState<any>(null);
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        try {
          // Add a 2-second timeout to prevent hanging on the Loading screen
          const selected = await Promise.race([
            // @ts-ignore
            window.aistudio.hasSelectedApiKey(),
            new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 2000))
          ]);
          setHasKey(selected);
        } catch (e) {
          setHasKey(true);
        }
      } else {
        setHasKey(true); // Fallback if not in AI Studio
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume success to mitigate race condition
    }
  };

  if (hasKey === null) {
    return <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">Loading...</div>;
  }

  if (!hasKey) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F8F9FA]">
        <div className="bg-white p-8 rounded-[24px] shadow-lg max-w-md text-center">
          <h1 className="text-[24px] font-medium mb-4">需要配置 API Key</h1>
          <p className="text-[#6B6B6B] mb-6 text-[14px] leading-[1.6]">
            为了使用高级 AI 模型（如高质量视频生成、长文本分析等），请选择您的 Google Cloud API Key。
            <br/><br/>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[#242424] hover:underline font-medium">
              了解如何获取和配置计费 API Key
            </a>
          </p>
          <button
            onClick={handleSelectKey}
            className="bg-[#242424] text-white px-6 py-3 rounded-[16px] font-medium hover:bg-black transition-colors shadow-sm"
          >
            选择 API Key
          </button>
        </div>
      </div>
    );
  }

  const handleNavigateToReport = (date: string) => {
    setReportDate(date);
    setActiveNav('数据分析');
  };

  const handleNavigateToWriter = (params: any) => {
    setWriterParams(params);
    setActiveNav('智能创作');
  };

  const renderContent = () => {
    const pages = [
      '数据分析', '智能创作', '资产记忆', 'Agent'
    ];

    return (
      <>
        <div className={activeNav === 'Agent' ? 'h-full' : 'hidden'}>
          <AgentChat onNavigateToAnalysis={() => setActiveNav('数据分析')} />
        </div>
        <div className={activeNav === '数据分析' ? 'h-full' : 'hidden'}>
          <SmartDailyReport initialDate={reportDate} onNavigateToWriter={handleNavigateToWriter} />
        </div>
        <div className={activeNav === '智能创作' ? 'h-full' : 'hidden'}>
          <XiaohongshuWriter initialParams={writerParams} />
        </div>
        <div className={activeNav === '资产记忆' ? 'h-full' : 'hidden'}>
          <BrandKnowledgeBase />
        </div>
        {!pages.includes(activeNav) && (
          <div className="flex items-center justify-center h-full text-[#6B6B6B]">
            {activeNav} 模块开发中...
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex h-screen w-full bg-white text-[#242424] font-sans overflow-hidden">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
