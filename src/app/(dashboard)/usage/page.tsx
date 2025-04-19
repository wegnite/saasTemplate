'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent, applyTabsListStyles, applyTabsTriggerStyles, applyTabsContentStyles } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, BarChart2, PieChart, ChartLine, Clock, Tag } from 'lucide-react';

// 模拟使用情况数据
interface UsageData {
  totalCredits: number;
  usedCredits: number;
  maxCredits: number;
  byType: Record<string, number>;
  byDate: Array<{
    date: string;
    credits: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    name: string;
    date: string;
    creditsUsed: number;
  }>;
  topTools: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

// 模拟获取使用情况数据
const fetchUsageData = async (userId: string, period: string): Promise<UsageData> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 生成日期范围数据
  const dates = [];
  const now = new Date();
  const days = period === 'day' ? 1 : period === 'week' ? 7 : period === 'month' ? 30 : 365;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  // 生成模拟数据
  return {
    totalCredits: 500,
    usedCredits: 150,
    maxCredits: 500,
    byType: {
      'image-generation': 80,
      'text-generation': 45,
      'audio-processing': 25
    },
    byDate: dates.map(date => ({
      date,
      credits: Math.floor(Math.random() * 15)
    })),
    recentActivity: Array(10).fill(null).map((_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - i * 2);
      
      const types = ['image-generation', 'text-generation', 'audio-processing'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      const names = {
        'image-generation': '图像生成',
        'text-generation': '文本生成',
        'audio-processing': '音频处理'
      };
      
      return {
        id: `activity-${i}`,
        type,
        name: names[type as keyof typeof names],
        date: date.toISOString(),
        creditsUsed: Math.floor(Math.random() * 10) + 1
      };
    }),
    topTools: [
      { type: '图像生成', count: 28, percentage: 53 },
      { type: '文本生成', count: 15, percentage: 30 },
      { type: '音频处理', count: 8, percentage: 17 }
    ]
  };
};

// 简单图表组件 - 柱状图
const BarChart = ({ data }: { data: Array<{ date: string; credits: number }> }) => {
  const maxValue = Math.max(...data.map(item => item.credits));
  
  return (
    <div className="w-full h-64 mt-4">
      <div className="flex h-full items-end space-x-2">
        {data.map((item, index) => {
          const height = (item.credits / (maxValue || 1)) * 100;
          const isToday = index === data.length - 1;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-full ${isToday ? 'bg-purple-500' : 'bg-purple-700'} rounded-t`}
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs mt-2 text-gray-400 transform -rotate-45 origin-top-left">
                {new Date(item.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 简单图表组件 - 饼图
const PieChartComponent = ({ data }: { data: Array<{ type: string; percentage: number }> }) => {
  // 计算各部分的累计角度
  let accumulatedPercentage = 0;
  
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const startAngle = accumulatedPercentage * 3.6; // 转换为角度 (100% = 360度)
            accumulatedPercentage += item.percentage;
            const endAngle = accumulatedPercentage * 3.6;
            
            // 计算SVG路径
            const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
            const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
            const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
            const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));
            
            // 大于180度需要使用不同的弧线标志
            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
            
            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`
            ].join(' ');
            
            const colors = ['#9333ea', '#6366f1', '#0ea5e9'];
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="#111"
                strokeWidth="0.5"
              />
            );
          })}
          {/* 中心圆形，形成环形图 */}
          <circle cx="50" cy="50" r="20" fill="#111" />
        </svg>
      </div>
    </div>
  );
};

// 图例组件
const ChartLegend = ({ items }: { items: Array<{ type: string; percentage: number }> }) => {
  const colors = ['#9333ea', '#6366f1', '#0ea5e9'];
  
  return (
    <div className="flex flex-col space-y-2 mt-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: colors[index % colors.length] }}
          ></div>
          <span className="text-sm">{item.type} ({item.percentage}%)</span>
        </div>
      ))}
    </div>
  );
};

export default function UsagePage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  
  useEffect(() => {
    const loadUsageData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await fetchUsageData(user.id, period);
        setUsageData(data);
      } catch (error) {
        console.error('加载使用情况数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUsageData();
  }, [user, period]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        <span className="ml-2">加载使用情况数据中...</span>
      </div>
    );
  }
  
  // 确保usageData存在
  if (!usageData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span>无法加载使用情况数据</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">使用情况</h1>
        <p className="text-gray-400">查看您的积分使用情况和活动历史</p>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">使用数据</h2>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">时间范围:</span>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="选择时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">今天</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="year">今年</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="w-full">
          <Tabs defaultValue="overview">
            <TabsList className={applyTabsListStyles("mb-4")}>
              <TabsTrigger value="overview" className={applyTabsTriggerStyles("gap-2")}>
                <BarChart2 className="h-4 w-4" /> 概览
              </TabsTrigger>
              <TabsTrigger value="by-type" className={applyTabsTriggerStyles("gap-2")}>
                <PieChart className="h-4 w-4" /> 按类型
              </TabsTrigger>
              <TabsTrigger value="by-date" className={applyTabsTriggerStyles("gap-2")}>
                <ChartLine className="h-4 w-4" /> 按日期
              </TabsTrigger>
              <TabsTrigger value="activity" className={applyTabsTriggerStyles("gap-2")}>
                <Clock className="h-4 w-4" /> 活动历史
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className={applyTabsContentStyles()}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* 积分总览卡片 */}
                <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-4">积分总览</h3>
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm text-gray-400">剩余积分</span>
                    <span className="text-xl font-bold">
                      {usageData.totalCredits - usageData.usedCredits} / {usageData.maxCredits}
                    </span>
                  </div>
                  <Progress
                    value={(1 - usageData.usedCredits / usageData.maxCredits) * 100}
                    className="h-2 bg-gray-700"
                  />
                  <div className="mt-4 text-sm text-gray-400">
                    已使用 {usageData.usedCredits} 积分 ({Math.round(usageData.usedCredits / usageData.maxCredits * 100)}%)
                  </div>
                  <div className="mt-6">
                    <Button size="sm" className="w-full">购买积分</Button>
                  </div>
                </Card>
                
                {/* 使用统计卡片 */}
                <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-4">本月使用统计</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">图像生成</span>
                        <span>{usageData.byType['image-generation'] || 0} 积分</span>
                      </div>
                      <Progress
                        value={(usageData.byType['image-generation'] || 0) / usageData.usedCredits * 100}
                        className="h-1.5 bg-gray-700"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">文本生成</span>
                        <span>{usageData.byType['text-generation'] || 0} 积分</span>
                      </div>
                      <Progress
                        value={(usageData.byType['text-generation'] || 0) / usageData.usedCredits * 100}
                        className="h-1.5 bg-gray-700"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">音频处理</span>
                        <span>{usageData.byType['audio-processing'] || 0} 积分</span>
                      </div>
                      <Progress
                        value={(usageData.byType['audio-processing'] || 0) / usageData.usedCredits * 100}
                        className="h-1.5 bg-gray-700"
                      />
                    </div>
                  </div>
                </Card>
                
                {/* 常用工具卡片 */}
                <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-4">常用工具</h3>
                  <div className="space-y-4">
                    {usageData.topTools.map((tool, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center mr-3">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{tool.type}</p>
                          <p className="text-sm text-gray-400">{tool.count} 次使用 ({tool.percentage}%)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              {/* 使用趋势图表 */}
              <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-2">使用趋势</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {period === 'day' ? '今天' : period === 'week' ? '本周' : period === 'month' ? '本月' : '今年'}积分使用情况
                </p>
                {usageData.byDate && <BarChart data={usageData.byDate} />}
              </Card>
            </TabsContent>
            
            <TabsContent value="by-type" className={applyTabsContentStyles()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-4">按工具类型使用分布</h3>
                  <div className="flex flex-col md:flex-row items-center justify-around">
                    <PieChartComponent data={usageData.topTools} />
                    <ChartLegend items={usageData.topTools} />
                  </div>
                </Card>
                
                <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-4">工具使用详情</h3>
                  <div className="space-y-6">
                    {usageData.topTools.map((tool, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{tool.type}</span>
                          <Badge>{tool.count} 次使用</Badge>
                        </div>
                        <Progress
                          value={tool.percentage}
                          className="h-2 bg-gray-700"
                        />
                        <p className="text-xs text-gray-400 mt-1">占总使用的 {tool.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="by-date" className={applyTabsContentStyles()}>
              <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-4">按日期使用详情</h3>
                <div className="h-96">
                  <BarChart data={usageData.byDate} />
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-black/40 rounded-lg">
                    <p className="text-sm text-gray-400">总使用积分</p>
                    <p className="text-2xl font-bold mt-1">{usageData.usedCredits}</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-lg">
                    <p className="text-sm text-gray-400">平均每日使用</p>
                    <p className="text-2xl font-bold mt-1">
                      {Math.round(usageData.usedCredits / (usageData.byDate.length || 1))}
                    </p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-lg">
                    <p className="text-sm text-gray-400">最高单日使用</p>
                    <p className="text-2xl font-bold mt-1">
                      {Math.max(...(usageData.byDate.map(d => d.credits)))}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className={applyTabsContentStyles()}>
              <Card className="border border-gray-700 bg-black/60 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/40">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">活动</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">时间</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">消耗积分</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {usageData.recentActivity.map(activity => (
                        <tr key={activity.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                                {activity.type === 'image-generation' && <Tag className="h-5 w-5" />}
                                {activity.type === 'text-generation' && <Tag className="h-5 w-5" />}
                                {activity.type === 'audio-processing' && <Tag className="h-5 w-5" />}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{activity.name}</div>
                                <div className="text-sm text-gray-400">{activity.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {formatDate(activity.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-purple-400">{activity.creditsUsed} 积分</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-center p-4 border-t border-gray-700">
                  <Button variant="outline" size="sm">加载更多</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 