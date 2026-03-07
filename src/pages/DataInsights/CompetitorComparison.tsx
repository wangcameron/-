import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const TREND_DATA = [
  { date: '02-13', 本品: 2100, 竞品A: 1200, 竞品B: 1800, 竞品C: 900 },
  { date: '02-14', 本品: 2800, 竞品A: 1800, 竞品B: 2100, 竞品C: 1100 },
  { date: '02-15', 本品: 3200, 竞品A: 2100, 竞品B: 2300, 竞品C: 1300 },
  { date: '02-16', 本品: 2900, 竞品A: 1900, 竞品B: 2000, 竞品C: 1000 },
  { date: '02-17', 本品: 3500, 竞品A: 2500, 竞品B: 2400, 竞品C: 1500 },
  { date: '02-18', 本品: 4100, 竞品A: 3100, 竞品B: 2800, 竞品C: 1800 },
  { date: '02-19', 本品: 3800, 竞品A: 2800, 竞品B: 2600, 竞品C: 1600 },
  { date: '02-20', 本品: 4000, 竞品A: 2400, 竞品B: 2400, 竞品C: 1400 },
  { date: '02-21', 本品: 3000, 竞品A: 1398, 竞品B: 2210, 竞品C: 1200 },
  { date: '02-22', 本品: 2000, 竞品A: 9800, 竞品B: 2290, 竞品C: 1100 },
  { date: '02-23', 本品: 2780, 竞品A: 3908, 竞品B: 2000, 竞品C: 1300 },
  { date: '02-24', 本品: 1890, 竞品A: 4800, 竞品B: 2181, 竞品C: 1500 },
  { date: '02-25', 本品: 2390, 竞品A: 3800, 竞品B: 2500, 竞品C: 1700 },
  { date: '02-26', 本品: 3490, 竞品A: 4300, 竞品B: 2100, 竞品C: 1900 },
];

const SOV_DATA = [
  { name: '本品', value: 42 },
  { name: '竞品A', value: 28 },
  { name: '竞品B', value: 18 },
  { name: '竞品C', value: 12 },
];

const COLORS = ['#111111', '#639FAB', '#82A7A6', '#B4C5C6'];

export default function CompetitorComparison() {
  const [activeTab, setActiveTab] = useState('按声量对比');
  const [highlightedBrand, setHighlightedBrand] = useState<string | null>(null);

  const handleLegendClick = (brand: string) => {
    if (highlightedBrand === brand) {
      setHighlightedBrand(null);
    } else {
      setHighlightedBrand(brand);
    }
  };

  return (
    <div className="w-full px-6 lg:px-10 mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#111111]">竞品对比</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['按声量对比', '按互动量对比', '按提及人数对比'].map(tab => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOV (Share of Voice) */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-1 flex flex-col">
          <h3 className="text-base font-bold text-[#111111] mb-6">SOV (声量份额) 战局</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={SOV_DATA}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#111111', fontWeight: 500 }} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'JetBrains Mono' }}
                  formatter={(value: number) => [`${value}%`, '份额']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {SOV_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-dimensional Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#111111]">多维缠斗曲线</h3>
            <div className="flex items-center space-x-4">
              {['本品', '竞品A', '竞品B', '竞品C'].map((brand, idx) => (
                <button 
                  type="button"
                  key={brand}
                  onClick={() => handleLegendClick(brand)}
                  className={`flex items-center text-sm transition-opacity ${
                    highlightedBrand && highlightedBrand !== brand ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx] }}></span>
                  <span className="font-medium text-[#111111]">{brand}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={TREND_DATA}
                margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', color: '#fff', borderRadius: '8px', border: 'none', fontFamily: 'JetBrains Mono' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="本品" 
                  stroke={COLORS[0]} 
                  strokeWidth={highlightedBrand === '本品' || !highlightedBrand ? 3 : 1} 
                  strokeOpacity={highlightedBrand && highlightedBrand !== '本品' ? 0.2 : 1}
                  dot={{ r: 4, strokeWidth: 0, fill: COLORS[0] }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="竞品A" 
                  stroke={COLORS[1]} 
                  strokeWidth={highlightedBrand === '竞品A' || !highlightedBrand ? 3 : 1} 
                  strokeOpacity={highlightedBrand && highlightedBrand !== '竞品A' ? 0.2 : 1}
                  dot={{ r: 4, strokeWidth: 0, fill: COLORS[1] }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="竞品B" 
                  stroke={COLORS[2]} 
                  strokeWidth={highlightedBrand === '竞品B' || !highlightedBrand ? 3 : 1} 
                  strokeOpacity={highlightedBrand && highlightedBrand !== '竞品B' ? 0.2 : 1}
                  dot={{ r: 4, strokeWidth: 0, fill: COLORS[2] }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="竞品C" 
                  stroke={COLORS[3]} 
                  strokeWidth={highlightedBrand === '竞品C' || !highlightedBrand ? 3 : 1} 
                  strokeOpacity={highlightedBrand && highlightedBrand !== '竞品C' ? 0.2 : 1}
                  dot={{ r: 4, strokeWidth: 0, fill: COLORS[3] }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
