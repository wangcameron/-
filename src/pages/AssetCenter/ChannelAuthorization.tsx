import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ShieldAlert
} from 'lucide-react';

const PLATFORMS = [
  { id: 'xhs', name: '小红书', count: 50, icon: 'https://picsum.photos/seed/xhs/40/40', color: '#ff2442' },
  { id: 'douyin', name: '抖音', count: 10, icon: 'https://picsum.photos/seed/douyin/40/40', color: '#242424' },
  { id: 'weibo', name: '微博', count: 5, icon: 'https://picsum.photos/seed/weibo/40/40', color: '#e6162d' },
  { id: 'bilibili', name: 'B站', count: 3, icon: 'https://picsum.photos/seed/bilibili/40/40', color: '#fb7299' },
];

const ACCOUNTS = [
  { id: 1, platform: 'xhs', name: '品牌官方账号', type: '官方号', status: 'active', lastSync: '10分钟前', roles: ['总监B', '运营C'] },
  { id: 2, platform: 'xhs', name: '种草小达人A', type: '达人矩阵', status: 'expired', lastSync: '2天前', roles: ['实习生A'] },
  { id: 3, platform: 'xhs', name: '种草小达人B', type: '达人矩阵', status: 'active', lastSync: '1小时前', roles: ['实习生A'] },
  { id: 4, platform: 'douyin', name: '品牌官方旗舰店', type: '官方号', status: 'active', lastSync: '5分钟前', roles: ['总监B'] },
  { id: 5, platform: 'weibo', name: '品牌官方微博', type: '官方号', status: 'warning', lastSync: '12小时前', roles: ['总监B', '运营C'] },
];

export default function ChannelAuthorization() {
  const [activePlatform, setActivePlatform] = useState('xhs');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const expiredCount = ACCOUNTS.filter(a => a.status === 'expired').length;

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[24px] font-medium text-[#242424]">渠道授权</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-1">全域矩阵账号绑定与权限健康监测</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowAuthModal(true)}
          className="px-4 py-2 bg-[#242424] text-white rounded-[12px] text-[14px] font-medium hover:bg-black transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加授权账号
        </button>
      </div>

      {expiredCount > 0 && (
        <div className="bg-[#D96C6C]/10 border border-[#D96C6C]/20 rounded-[16px] p-4 flex items-center justify-between">
          <div className="flex items-center text-[#D96C6C]">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span className="text-[14px] font-medium">⚠️ {expiredCount} 个账号授权已过期，可能导致数据漏抓或发布失败</span>
          </div>
          <button type="button" className="px-4 py-1.5 bg-white border border-[#D96C6C]/20 text-[#D96C6C] rounded-[12px] text-[14px] font-medium hover:bg-[#D96C6C]/5 transition-colors">
            一键重新授权
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORMS.map((platform) => (
          <div 
            key={platform.id}
            onClick={() => setActivePlatform(platform.id)}
            className={`bg-white rounded-[16px] p-4 shadow-sm border cursor-pointer transition-all ${
              activePlatform === platform.id 
                ? 'border-[#242424] ring-1 ring-[#242424]' 
                : 'border-[#E5E5E5] hover:border-[#242424]/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <img src={platform.icon} alt={platform.name} className="w-10 h-10 rounded-[12px] object-cover" referrerPolicy="no-referrer" />
              <div>
                <h3 className="text-[16px] font-medium text-[#242424]">{platform.name}</h3>
                <p className="text-[12px] text-[#6B6B6B]">已绑定 {platform.count} 个账号</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E5E5] flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FBFBFA]/50">
          <div className="flex items-center space-x-4">
            <h3 className="text-[16px] font-medium text-[#242424]">
              {PLATFORMS.find(p => p.id === activePlatform)?.name} 账号列表
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B6B6B]" />
              <input 
                type="text" 
                placeholder="搜索账号名称..." 
                className="pl-9 pr-4 py-1.5 bg-white border border-[#E5E5E5] rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#242424]/20 focus:border-[#242424] w-64"
              />
            </div>
          </div>
          <button type="button" className="p-2 text-[#6B6B6B] hover:text-[#242424] hover:bg-[rgba(0,0,0,0.04)] rounded-[12px] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FBFBFA]/50 border-b border-[#E5E5E5] text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">账号信息</th>
                <th className="px-6 py-3 font-medium">账号类型</th>
                <th className="px-6 py-3 font-medium">授权状态</th>
                <th className="px-6 py-3 font-medium">最后同步</th>
                <th className="px-6 py-3 font-medium">操作权限 (员工路由)</th>
                <th className="px-6 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {ACCOUNTS.filter(a => a.platform === activePlatform).map((account) => (
                <tr key={account.id} className="hover:bg-[rgba(0,0,0,0.04)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src={`https://picsum.photos/seed/acc${account.id}/40/40`} alt={account.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          account.status === 'active' ? 'bg-green-500' : 
                          account.status === 'expired' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                      <span className="text-[14px] font-medium text-[#242424]">{account.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-[#F5F5F4] text-[#6B6B6B] rounded text-[12px] font-medium">
                      {account.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {account.status === 'active' ? (
                      <span className="flex items-center text-[14px] text-green-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                        正常运转
                      </span>
                    ) : account.status === 'expired' ? (
                      <span className="flex items-center text-[14px] text-red-600 font-medium">
                        <ShieldAlert className="w-4 h-4 mr-1.5" />
                        授权过期
                      </span>
                    ) : (
                      <span className="flex items-center text-[14px] text-yellow-600 font-medium">
                        <AlertTriangle className="w-4 h-4 mr-1.5" />
                        风控预警
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#6B6B6B]">
                    {account.lastSync}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {account.roles.map((role, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#F5F5F4] text-[#242424] border border-[#E5E5E5] rounded text-[12px]">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" className="p-1.5 text-[#6B6B6B] hover:text-[#242424] opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {ACCOUNTS.filter(a => a.platform === activePlatform).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#6B6B6B] text-[14px]">
                    暂无绑定的账号
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-md p-6 transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-medium text-[#242424]">添加授权账号</h2>
              <button type="button" onClick={() => setShowAuthModal(false)} className="p-2 text-[#6B6B6B] hover:text-[#242424] rounded-full hover:bg-[rgba(0,0,0,0.04)]">
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#242424] mb-2">选择平台</label>
                <div className="grid grid-cols-2 gap-3">
                  {PLATFORMS.map(p => (
                    <button type="button" key={p.id} className="flex items-center justify-center space-x-2 p-3 border border-[#E5E5E5] rounded-[16px] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                      <img src={p.icon} alt={p.name} className="w-6 h-6 rounded object-cover" referrerPolicy="no-referrer" />
                      <span className="text-[14px] font-medium text-[#242424]">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#E5E5E5]">
                <div className="bg-[#FBFBFA] rounded-[16px] p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 bg-white border border-[#E5E5E5] rounded-[12px] mb-4 flex items-center justify-center">
                    <span className="text-[#6B6B6B] text-[14px]">二维码占位</span>
                  </div>
                  <p className="text-[14px] font-medium text-[#242424] mb-1">请使用对应平台 App 扫码授权</p>
                  <p className="text-[12px] text-[#6B6B6B]">或点击下方使用账密登录</p>
                </div>
              </div>
              
              <button type="button" className="w-full py-2 text-[14px] font-medium text-[#6B6B6B] hover:text-[#242424] transition-colors">
                切换至账密登录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
