'use client';

import { useState } from 'react';
import { MotionCard } from '@/components/ui/motion-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, FileText, Copy, Save } from 'lucide-react';

export default function TextGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('article');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 模拟生成文本功能
  const handleGenerate = async () => {
    if (!prompt) {
      setError('请输入提示词。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedText('');

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 模拟生成的文本
    const placeholderText = `这是根据您的提示 "${prompt}" 生成的${contentType === 'article' ? '文章' : 
                              contentType === 'story' ? '故事' : 
                              contentType === 'product' ? '产品描述' : '内容'}。

这段文本采用了${tone === 'professional' ? '专业' : 
                tone === 'casual' ? '随意' : 
                tone === 'humorous' ? '幽默' : 
                tone === 'formal' ? '正式' : '中性'}的语调，大约包含${length}个字符。

实际应用中，我们会调用强大的AI文本生成API来创建高质量、符合您要求的内容。生成的内容将基于您提供的提示词、选择的内容类型、语调和长度等参数。

您可以使用这个工具来生成各种文本内容，例如：
- 文章和博客内容
- 创意故事和叙述
- 产品描述和营销文案
- 邮件和商务通信
- 社交媒体帖子
- 其他各种文本内容

尝试调整参数并提供更详细的提示词，以获得更符合您需求的结果。`;

    setGeneratedText(placeholderText);
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    // 这里可以添加复制成功的提示
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">文本生成</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 生成表单 */}
        <MotionCard className="p-6" glowEffect={true} rotationIntensity={2}>
          <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium mb-2 text-gray-300">
                提示词 (Prompt)
              </label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：写一篇关于人工智能在医疗领域应用的文章，重点讨论诊断和治疗方面的进展"
                rows={5}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="contentType" className="block text-sm font-medium mb-2 text-gray-300">内容类型</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                  <SelectValue placeholder="选择内容类型" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 backdrop-blur-lg border border-white/10 text-white">
                  <SelectItem value="article">文章</SelectItem>
                  <SelectItem value="story">故事</SelectItem>
                  <SelectItem value="product">产品描述</SelectItem>
                  <SelectItem value="email">电子邮件</SelectItem>
                  <SelectItem value="social">社交媒体内容</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium mb-2 text-gray-300">语调</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                  <SelectValue placeholder="选择语调" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 backdrop-blur-lg border border-white/10 text-white">
                  <SelectItem value="professional">专业</SelectItem>
                  <SelectItem value="casual">随意</SelectItem>
                  <SelectItem value="humorous">幽默</SelectItem>
                  <SelectItem value="formal">正式</SelectItem>
                  <SelectItem value="neutral">中性</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="length" className="block text-sm font-medium mb-2 text-gray-300">
                长度 ({length} 字符)
              </label>
              <Slider
                defaultValue={[500]}
                max={2000}
                step={100}
                onValueChange={(values: number[]) => setLength(values[0])}
                className="py-4"
              />
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  正在生成中...
                </>
              ) : (
                '开始生成'
              )}
            </Button>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </form>
        </MotionCard>

        {/* 文本显示区域 */}
        <MotionCard className="p-6 min-h-[400px] flex flex-col" glowEffect={true} rotationIntensity={1}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">生成结果</h3>
            {generatedText && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-1" />
                  复制
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  保存
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
                <span className="sr-only">加载中</span>
              </div>
            )}
            
            {!isLoading && !generatedText && !error && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <FileText className="h-16 w-16 mb-4" />
                <p>在此处查看您生成的文本</p>
                <p className="text-sm">输入提示词并点击"开始生成"</p>
              </div>
            )}
            
            {!isLoading && error && (
              <div className="h-full flex items-center justify-center text-center text-red-500">
                <p>{error}</p>
              </div>
            )}
            
            {!isLoading && generatedText && (
              <div className="h-full overflow-auto rounded-lg border border-white/10 bg-white/5 p-4 text-white">
                <p className="whitespace-pre-line">{generatedText}</p>
              </div>
            )}
          </div>
        </MotionCard>
      </div>
    </div>
  );
} 