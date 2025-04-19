'use client';

import { useState } from 'react';
import { MotionCard } from '@/components/ui/motion-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent, applyTabsListStyles, applyTabsTriggerStyles, applyTabsContentStyles } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, Headphones, Mic, Play, Pause, Download, Copy } from 'lucide-react';

export default function AudioProcessorPage() {
  const [selectedTab, setSelectedTab] = useState('transcription');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('chinese');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 模拟文件上传处理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setError(null);
    }
  };

  // 模拟录音功能
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // 模拟停止录音并设置文件
      setTimeout(() => {
        setSelectedFile(new File([], "recording.mp3"));
      }, 500);
    }
  };

  // 模拟音频处理
  const handleProcess = async () => {
    if (!selectedFile) {
      setError('请先上传音频文件或录制音频。');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    setResult(null);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟处理结果
    if (selectedTab === 'transcription') {
      setResult(`这是一段模拟的${language === 'chinese' ? '中文' : '英文'}转录文本。在实际应用中，我们会使用先进的AI语音识别技术，将您的音频准确地转录成文字。

支持多种语言，包括中文、英文、日文等。转录质量取决于原始音频的清晰度和背景噪音水平。

对于更好的结果，建议使用清晰的录音，减少背景噪音，说话者发音清晰。

这项服务适用于会议记录、讲座笔记、访谈整理等场景。`);
    } else if (selectedTab === 'translation') {
      setResult(`这是一段模拟的音频翻译文本。在实际应用中，我们会先将音频转录为原始语言文本，然后翻译成${language === 'chinese' ? '中文' : '英文'}。

翻译服务支持多种语言之间的互译，保持原意的同时使表达更加自然流畅。

翻译质量取决于原始音频的清晰度以及内容的复杂性。专业术语和特定领域内容可能需要人工审核。

这项服务适用于多语言会议、外语学习、国际交流等场景。`);
    } else if (selectedTab === 'summary') {
      setResult(`这是一段模拟的音频内容摘要。在实际应用中，我们会先将音频转录为文本，然后使用AI技术提取关键信息并生成摘要。

摘要会包含音频内容中的主要观点、关键事实和重要结论，帮助您快速把握核心内容。

摘要长度和详细程度可以根据需求调整。对于较长的音频内容尤其有用。

这项服务适用于长时间会议、讲座、播客等内容的快速理解和归纳。`);
    }
    
    setIsProcessing(false);
  };

  // 模拟音频播放
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    // 这里应该实现真正的音频播放/暂停逻辑
  };

  // 复制结果
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      // 这里可以添加复制成功的提示
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">音频处理</h1>

      <div className="w-full">
        <Tabs defaultValue={selectedTab}>
          <TabsList className={applyTabsListStyles("mb-6")}>
            <TabsTrigger 
              value="transcription" 
              className={applyTabsTriggerStyles()} 
              onClick={() => setSelectedTab('transcription')}
            >
              音频转录
            </TabsTrigger>
            <TabsTrigger 
              value="translation" 
              className={applyTabsTriggerStyles()} 
              onClick={() => setSelectedTab('translation')}
            >
              音频翻译
            </TabsTrigger>
            <TabsTrigger 
              value="summary" 
              className={applyTabsTriggerStyles()} 
              onClick={() => setSelectedTab('summary')}
            >
              内容摘要
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transcription" className={applyTabsContentStyles()}>
            {/* 这里放置特定于转录选项卡的内容 */}
          </TabsContent>
          
          <TabsContent value="translation" className={applyTabsContentStyles()}>
            {/* 这里放置特定于翻译选项卡的内容 */}
          </TabsContent>
          
          <TabsContent value="summary" className={applyTabsContentStyles()}>
            {/* 这里放置特定于摘要选项卡的内容 */}
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <MotionCard className="p-6" glowEffect={true} rotationIntensity={2}>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">上传或录制音频</h3>
            <p className="text-sm text-gray-400 mb-4">
              支持MP3, WAV, M4A格式，最大文件大小50MB
            </p>
            
            <div className="flex flex-col gap-4">
              {/* 文件上传区域 */}
              <div 
                className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                onClick={() => document.getElementById('audio-upload')?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-300 mb-2">点击或拖放文件到此处上传</p>
                <p className="text-xs text-gray-500">
                  {selectedFile ? `已选择: ${selectedFile.name}` : '尚未选择文件'}
                </p>
                <input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              
              {/* 录音功能 */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400 mb-2">或直接录制音频</p>
                <Button 
                  variant={isRecording ? "destructive" : "outline"} 
                  size="lg" 
                  className="mx-auto"
                  onClick={handleToggleRecording}
                >
                  {isRecording ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      停止录制
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      开始录制
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* 选项设置 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">选项</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium mb-2 text-gray-300">
                  {selectedTab === 'transcription' ? '转录语言' : 
                   selectedTab === 'translation' ? '目标语言' : 
                   '摘要语言'}
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="选择语言" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-lg border border-white/10 text-white">
                    <SelectItem value="chinese">中文</SelectItem>
                    <SelectItem value="english">英文</SelectItem>
                    <SelectItem value="japanese">日文</SelectItem>
                    <SelectItem value="korean">韩文</SelectItem>
                    <SelectItem value="french">法文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedTab === 'summary' && (
                <div>
                  <label htmlFor="summaryLength" className="block text-sm font-medium mb-2 text-gray-300">
                    摘要长度
                  </label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                      <SelectValue placeholder="选择摘要长度" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/80 backdrop-blur-lg border border-white/10 text-white">
                      <SelectItem value="short">简短</SelectItem>
                      <SelectItem value="medium">中等</SelectItem>
                      <SelectItem value="detailed">详细</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          
          {/* 处理按钮 */}
          <Button 
            variant="gradient" 
            size="lg" 
            className="w-full" 
            disabled={isProcessing || !selectedFile}
            onClick={handleProcess}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                处理中...
              </>
            ) : selectedTab === 'transcription' ? '开始转录' : 
               selectedTab === 'translation' ? '开始翻译' : 
               '生成摘要'}
          </Button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </MotionCard>

        {/* 结果显示区域 */}
        <MotionCard className="p-6 min-h-[400px] flex flex-col" glowEffect={true} rotationIntensity={1}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">处理结果</h3>
            {result && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-1" />
                  复制
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  下载
                </Button>
              </div>
            )}
          </div>
          
          {selectedFile && !isProcessing && !result && (
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg mb-4">
              <div className="flex items-center">
                <Headphones className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-sm truncate max-w-[200px]">
                  {selectedFile.name}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleTogglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          )}
          
          <div className="flex-1 relative">
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
                <span className="sr-only">处理中</span>
              </div>
            )}
            
            {!isProcessing && !result && !error && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <Headphones className="h-16 w-16 mb-4" />
                <p>在此处查看您的处理结果</p>
                <p className="text-sm">上传音频并点击处理按钮</p>
              </div>
            )}
            
            {!isProcessing && error && !result && (
              <div className="h-full flex items-center justify-center text-center text-red-500">
                <p>{error}</p>
              </div>
            )}
            
            {!isProcessing && result && (
              <div className="h-full overflow-auto rounded-lg border border-white/10 bg-white/5 p-4 text-white">
                <p className="whitespace-pre-line">{result}</p>
              </div>
            )}
          </div>
        </MotionCard>
      </div>
    </div>
  );
} 