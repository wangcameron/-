import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ShieldAlert,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { globalStore, Asset } from '../../store';

const FOLDERS = [
  { id: 1, name: '游戏世界观设定', count: 12, type: 'text' },
  { id: 4, name: '角色四视图资产', count: 24, type: 'visual' },
  { id: 5, name: '品牌 Logo 与 VI', count: 6, type: 'visual' },
  { id: 6, name: '写作 Skills 手册', count: 0, type: 'text' },
];

export default function BrandKnowledgeBase() {
  const [activeTab, setActiveTab] = useState('文本资产');
  const [selectedFolder, setSelectedFolder] = useState<number | null>(1);
  const [assets, setAssets] = useState<Asset[]>(globalStore.getAssets());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = globalStore.subscribe(() => {
      setAssets(globalStore.getAssets());
    });
    return unsubscribe;
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || selectedFolder === null) return;

    const newAssets: Asset[] = await Promise.all(Array.from(files).map(async (file: File, index: number) => {
      const isMd = file.name.endsWith('.md');
      const isImage = file.type.startsWith('image/');
      let type = 'unknown';
      if (isMd) type = 'md';
      else if (file.name.endsWith('.pdf')) type = 'pdf';
      else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) type = 'word';
      else if (isImage) type = 'image';

      let content = '';
      if (isMd || file.name.endsWith('.txt')) {
        content = await file.text();
      }

      return {
        id: Date.now() + index,
        name: file.name,
        type: type,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        date: new Date().toISOString().split('T')[0],
        folderId: selectedFolder,
        url: isImage ? URL.createObjectURL(file) : undefined,
        content
      };
    }));

    globalStore.addAssets(newAssets);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (folderInputRef.current) {
      folderInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerFolderUpload = () => {
    folderInputRef.current?.click();
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">品牌知识库</h1>
          <p className="text-sm text-gray-500 mt-1">根治 AI 幻觉的唯一解药，提供最精准的上下文</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['文本资产', '视觉与 VI 资产'].map(tab => (
            <button
              type="button"
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedFolder(tab === '文本资产' ? 1 : 4);
              }}
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
        {/* Left: Folder Tree */}
        <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col flex-shrink-0">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-bold text-[#111111]">分类目录</h3>
            <button type="button" className="p-1 text-gray-400 hover:text-[#111111] transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto">
            {FOLDERS.filter(f => activeTab === '文本资产' ? f.type === 'text' : f.type === 'visual').map((folder) => (
              <button
                type="button"
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedFolder === folder.id 
                    ? 'bg-gray-100 text-[#111111] font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Folder className={`w-4 h-4 ${selectedFolder === folder.id ? 'text-[#111111]' : 'text-gray-400'}`} />
                  <span className="truncate">{folder.name}</span>
                </div>
                <span className="text-xs text-gray-400">{folder.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Content Area */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center space-x-4">
                <h3 className="text-base font-bold text-[#111111]">
                  {FOLDERS.find(f => f.id === selectedFolder)?.name || '未选择目录'}
                </h3>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="搜索资产..." 
                    className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B82]/20 focus:border-[#4A6B82] w-64"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button type="button" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <LinkIcon className="w-4 h-4 mr-1.5" />
                  导入网址
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                  accept={activeTab === '文本资产' ? ".pdf,.docx,.doc,.txt,.md" : "image/*"}
                />
                <input 
                  type="file" 
                  ref={folderInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  {...({ webkitdirectory: "true", directory: "true" } as any)}
                />
                <button 
                  type="button" 
                  onClick={triggerFolderUpload}
                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Folder className="w-4 h-4 mr-1.5" />
                  上传文件夹
                </button>
                <button 
                  type="button" 
                  onClick={triggerFileUpload}
                  className="px-3 py-1.5 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center"
                >
                  <Upload className="w-4 h-4 mr-1.5" />
                  上传文件
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === '文本资产' ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <div className="col-span-6">文件名</div>
                    <div className="col-span-2">大小</div>
                    <div className="col-span-3">上传时间</div>
                    <div className="col-span-1 text-right">操作</div>
                  </div>
                  {assets.filter(a => a.folderId === selectedFolder).map((asset) => (
                    <div key={asset.id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
                      <div className="col-span-6 flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-[#4A6B82]/10 flex items-center justify-center text-[#4A6B82]">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-[#111111] truncate">{asset.name}</span>
                      </div>
                      <div className="col-span-2 text-sm text-gray-500">{asset.size}</div>
                      <div className="col-span-3 text-sm text-gray-500">{asset.date}</div>
                      <div className="col-span-1 text-right">
                        <button type="button" className="p-1 text-gray-400 hover:text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {assets.filter(a => a.folderId === selectedFolder).length === 0 && (
                    <div className="text-center py-12 text-gray-500 text-sm">
                      该目录下暂无资产
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {assets.filter(a => a.folderId === selectedFolder).map((asset) => (
                    <div key={asset.id} className="group cursor-pointer">
                      <div className="aspect-square rounded-xl bg-gray-100 border border-gray-200 overflow-hidden relative mb-2">
                        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" className="px-3 py-1.5 bg-white text-[#111111] text-xs font-bold rounded-lg shadow-sm">
                            查看详情
                          </button>
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-[10px] rounded backdrop-blur-sm">
                          {asset.type.toUpperCase()}
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-[#111111] truncate" title={asset.name}>{asset.name}</h4>
                      <p className="text-xs text-gray-500">{asset.date} · {asset.size}</p>
                    </div>
                  ))}
                  {assets.filter(a => a.folderId === selectedFolder).length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500 text-sm">
                      该目录下暂无视觉资产
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
