'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Tabs, TabsList, TabsTrigger, TabsContent, applyTabsListStyles, applyTabsTriggerStyles, applyTabsContentStyles } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Loader2, Image as ImageIcon, FileText, Headphones, Calendar, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// 模拟数据获取函数，将来会替换为实际的API调用
const fetchHistoryData = async (userId: string, type: string, page: number) => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模拟历史数据
  const items = Array(10).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    if (type === 'image' || type === 'all') {
      return {
        id: `img-${i}`,
        type: 'image',
        prompt: '一只太空猫在月球上弹吉他',
        imageUrl: '/images/placeholder-image-1.png',
        createdAt: date.toISOString(),
        creditsUsed: 5
      };
    } else if (type === 'text' || type === 'all') {
      return {
        id: `text-${i}`,
        type: 'text',
        prompt: '写一篇关于太空探索的文章',
        textPreview: '人类对太空的探索始于...',
        createdAt: date.toISOString(),
        creditsUsed: 3
      };
    } else {
      return {
        id: `audio-${i}`,
        type: 'audio',
        processType: 'transcription',
        audioName: `录音-${i}.mp3`,
        createdAt: date.toISOString(),
        creditsUsed: 4
      };
    }
  });
  
  return {
    items,
    pagination: {
      page,
      totalPages: 5,
      totalItems: 48
    }
  };
};

// 历史记录项组件
const HistoryItem = ({ item, onReuse }: { item: any, onReuse: () => void }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card className="p-4 mb-4 border border-gray-700 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {item.type === 'image' && <ImageIcon className="h-8 w-8 text-purple-500" />}
          {item.type === 'text' && <FileText className="h-8 w-8 text-blue-500" />}
          {item.type === 'audio' && <Headphones className="h-8 w-8 text-green-500" />}
          
          <div>
            <h3 className="font-semibold text-gray-100">
              {item.type === 'image' && '图像生成'}
              {item.type === 'text' && '文本生成'}
              {item.type === 'audio' && item.processType === 'transcription' ? '音频转录' : '音频处理'}
            </h3>
            <p className="text-sm text-gray-400 truncate max-w-sm">
              {item.prompt || item.audioName || '无描述'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 ml-11 md:ml-0">
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-400">创建时间</span>
            <span className="text-sm text-gray-300 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {formatDate(item.createdAt)}
            </span>
          </div>
          
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-400">消耗积分</span>
            <span className="text-sm text-purple-400">{item.creditsUsed} 积分</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button size="sm" variant="secondary" onClick={onReuse}>重新使用</Button>
            <Button size="sm" variant="ghost">查看详情</Button>
          </div>
        </div>
      </div>
      
      {item.type === 'image' && (
        <div className="mt-4 flex justify-center">
          <img 
            src={item.imageUrl} 
            alt="生成的图像" 
            className="rounded-md h-24 object-cover border border-gray-700" 
          />
        </div>
      )}
    </Card>
  );
};

export default function HistoryPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [historyData, setHistoryData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await fetchHistoryData(user.id, activeTab, currentPage);
        setHistoryData(data);
      } catch (error) {
        console.error('加载历史记录失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
  }, [user, activeTab, currentPage]);
  
  const handleReuseItem = (item: any) => {
    console.log('重新使用项目:', item);
    // 实际实现中，应该根据类型导航到相应的工具页面并填充数据
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">历史记录</h1>
          <p className="text-gray-400">查看和管理您的AI生成内容历史</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索历史记录..."
              className="pl-10 pr-4 py-2 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="日期范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有时间</SelectItem>
                <SelectItem value="today">今天</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="year">今年</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        <Tabs defaultValue="all">
          <TabsList className={applyTabsListStyles("mb-6")}>
            <TabsTrigger value="all" className={applyTabsTriggerStyles()} onClick={() => setActiveTab('all')}>全部</TabsTrigger>
            <TabsTrigger value="image" className={applyTabsTriggerStyles()} onClick={() => setActiveTab('image')}>图像</TabsTrigger>
            <TabsTrigger value="text" className={applyTabsTriggerStyles()} onClick={() => setActiveTab('text')}>文本</TabsTrigger>
            <TabsTrigger value="audio" className={applyTabsTriggerStyles()} onClick={() => setActiveTab('audio')}>音频</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className={applyTabsContentStyles("space-y-4")}>
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-purple-500 mb-4" />
                <p>加载历史记录中...</p>
              </div>
            ) : (
              <>
                {historyData?.items.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
                    <p className="text-gray-400">还没有历史记录</p>
                    <p className="text-sm text-gray-500 mt-2">使用AI工具生成内容后会在这里显示</p>
                  </div>
                ) : (
                  <>
                    {historyData?.items.map((item: any) => (
                      <HistoryItem 
                        key={item.id} 
                        item={item} 
                        onReuse={() => handleReuseItem(item)} 
                      />
                    ))}
                    
                    {historyData?.pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-6">
                        <Pagination>
                          <PaginationContent>
                            {currentPage > 1 && (
                              <PaginationItem>
                                <PaginationPrevious href="#" onClick={() => setCurrentPage(currentPage - 1)} />
                              </PaginationItem>
                            )}
                            
                            {Array.from({length: historyData.pagination.totalPages}).map((_, i) => (
                              <PaginationItem key={i}>
                                <PaginationLink 
                                  href="#" 
                                  isActive={currentPage === i + 1}
                                  onClick={() => setCurrentPage(i + 1)}
                                >
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            {currentPage < historyData.pagination.totalPages && (
                              <PaginationItem>
                                <PaginationNext href="#" onClick={() => setCurrentPage(currentPage + 1)} />
                              </PaginationItem>
                            )}
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="image">
            {/* 图像历史记录内容 - 结构类似 "all" 标签 */}
          </TabsContent>
          
          <TabsContent value="text">
            {/* 文本历史记录内容 - 结构类似 "all" 标签 */}
          </TabsContent>
          
          <TabsContent value="audio">
            {/* 音频历史记录内容 - 结构类似 "all" 标签 */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 