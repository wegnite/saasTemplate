'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageIcon, FileText, Headphones, VideoIcon, Code, Bot } from 'lucide-react';

// 工具卡片组件
const ToolCard = ({ 
  icon, 
  title, 
  description, 
  href, 
  disabled = false 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  href: string;
  disabled?: boolean;
}) => (
  <Card className={`p-6 border border-gray-700 bg-black/60 backdrop-blur-sm hover:border-purple-500 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
    <Link href={disabled ? '#' : href} className="block h-full">
      <div className="flex flex-col items-center text-center h-full">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{description}</p>
        {disabled && (
          <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">即将推出</span>
        )}
      </div>
    </Link>
  </Card>
);

export default function AIToolsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AI 工具</h1>
        <p className="text-gray-400">探索我们强大的AI工具集，满足您的创意和生产力需求</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          icon={<ImageIcon className="h-8 w-8 text-white" />}
          title="图像生成"
          description="根据文本提示生成高质量图像，支持多种风格和尺寸"
          href="/ai-tools/image-generator"
        />
        
        <ToolCard
          icon={<FileText className="h-8 w-8 text-white" />}
          title="文本生成"
          description="创建各种类型的文本内容，包括文章、故事、产品描述等"
          href="/ai-tools/text-generator"
          disabled={false}
        />
        
        <ToolCard
          icon={<Headphones className="h-8 w-8 text-white" />}
          title="音频处理"
          description="转录、翻译和总结音频内容，支持多种语言"
          href="/ai-tools/audio-processor"
          disabled={false}
        />
        
        <ToolCard
          icon={<VideoIcon className="h-8 w-8 text-white" />}
          title="视频助手"
          description="生成视频脚本、构思创意和编辑视频内容"
          href="/ai-tools/video-assistant"
          disabled={true}
        />
        
        <ToolCard
          icon={<Code className="h-8 w-8 text-white" />}
          title="代码助手"
          description="编写、解释和优化代码，支持多种编程语言"
          href="/ai-tools/code-assistant"
          disabled={true}
        />
        
        <ToolCard
          icon={<Bot className="h-8 w-8 text-white" />}
          title="智能助手"
          description="个人定制的AI助手，可回答问题并完成各种任务"
          href="/ai-tools/smart-assistant"
          disabled={true}
        />
      </div>
      
      <div className="mt-12 p-6 border border-dashed border-gray-700 rounded-lg text-center">
        <h3 className="text-lg font-bold mb-2">需要自定义工具？</h3>
        <p className="text-gray-400 mb-4">
          我们可以根据您的业务需求开发专属AI解决方案
        </p>
        <Button variant="outline">联系我们</Button>
      </div>
    </div>
  );
} 