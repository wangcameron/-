import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GlobalDashboard from './pages/DataInsights/GlobalDashboard';
import SmartDailyReport from './pages/DataInsights/SmartDailyReport';
import XiaohongshuWriter from './pages/Creative/XiaohongshuWriter';
import VisualGeneration from './pages/SmartCreation/VisualGeneration';
import VideoGeneration from './pages/SmartCreation/VideoGeneration';
import AgentBuilder from './pages/SmartCreation/AgentBuilder';
import BrandKnowledgeBase from './pages/AssetCenter/BrandKnowledgeBase';
import ChannelAuthorization from './pages/AssetCenter/ChannelAuthorization';

export default function App() {
  const [activeNav, setActiveNav] = useState('全局洞察');
  const [reportDate, setReportDate] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        // @ts-ignore
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
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
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">需要配置 API Key</h1>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            为了使用高级 AI 模型（如高质量视频生成、长文本分析等），请选择您的 Google Cloud API Key。
            <br/><br/>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[#4A6B82] hover:underline font-medium">
              了解如何获取和配置计费 API Key
            </a>
          </p>
          <button
            onClick={handleSelectKey}
            className="bg-[#4A6B82] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3A5B72] transition-colors shadow-sm"
          >
            选择 API Key
          </button>
        </div>
      </div>
    );
  }

  const handleNavigateToReport = (date: string) => {
    setReportDate(date);
    setActiveNav('智能日报');
  };

  const renderContent = () => {
    const pages = [
      '全局洞察', '智能日报', '小红书写手', '视觉生成', 
      '视频生成', '智能体配置', '品牌知识库', '渠道授权'
    ];

    return (
      <>
        <div className={activeNav === '全局洞察' ? 'h-full' : 'hidden'}>
          <GlobalDashboard onNavigateToReport={handleNavigateToReport} />
        </div>
        <div className={activeNav === '智能日报' ? 'h-full' : 'hidden'}>
          <SmartDailyReport initialDate={reportDate} />
        </div>
        <div className={activeNav === '小红书写手' ? 'h-full' : 'hidden'}>
          <XiaohongshuWriter />
        </div>
        <div className={activeNav === '视觉生成' ? 'h-full' : 'hidden'}>
          <VisualGeneration />
        </div>
        <div className={activeNav === '视频生成' ? 'h-full' : 'hidden'}>
          <VideoGeneration />
        </div>
        <div className={activeNav === '智能体配置' ? 'h-full' : 'hidden'}>
          <AgentBuilder />
        </div>
        <div className={activeNav === '品牌知识库' ? 'h-full' : 'hidden'}>
          <BrandKnowledgeBase />
        </div>
        <div className={activeNav === '渠道授权' ? 'h-full' : 'hidden'}>
          <ChannelAuthorization />
        </div>
        {!pages.includes(activeNav) && (
          <div className="flex items-center justify-center h-full text-gray-500">
            {activeNav} 模块开发中...
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] text-[#111111] font-sans overflow-hidden">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto py-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
