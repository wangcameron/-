import React from 'react';
import PublicOpinionResponse from './components/PublicOpinionResponse';

export default function XiaohongshuWriter({ initialParams }: { initialParams?: any }) {
  return (
    <div className="h-full flex flex-col bg-[#FBFBFA]">
      <PublicOpinionResponse initialParams={initialParams} />
    </div>
  );
}
