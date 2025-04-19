'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MotionCard } from '@/components/ui/motion-card';
import { Button } from '@/components/ui/button'; // Assuming Button component exists
import { Textarea } from '@/components/ui/textarea'; // Assuming Textarea component exists
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming Select components exist
import { Loader2, Image as ImageIcon } from 'lucide-react';

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [numImages, setNumImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Placeholder generation function
  const handleGenerate = async () => {
    if (!prompt) {
      setError('请输入提示词。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Placeholder images (replace with actual URLs from API)
    const placeholderUrls = [
      '/images/placeholder-image-1.png',
      '/images/placeholder-image-2.png',
      '/images/placeholder-image-3.png',
      '/images/placeholder-image-4.png'
    ];

    setGeneratedImages(placeholderUrls.slice(0, numImages));
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">图像生成</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generation Form */}
        <MotionCard className="p-6 lg:col-span-1" glowEffect={true} rotationIntensity={2}>
          <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium mb-2 text-gray-300">
                提示词 (Prompt)
              </label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：一只穿着宇航服的猫在月球上弹吉他，电影感光线"
                rows={5}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="style" className="block text-sm font-medium mb-2 text-gray-300">图像风格</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                  <SelectValue placeholder="选择风格" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 backdrop-blur-lg border border-white/10 text-white">
                  <SelectItem value="realistic">写实</SelectItem>
                  <SelectItem value="anime">动漫</SelectItem>
                  <SelectItem value="cartoon">卡通</SelectItem>
                  <SelectItem value="3d-render">3D渲染</SelectItem>
                  <SelectItem value="pixel-art">像素艺术</SelectItem>
                  <SelectItem value="fantasy">奇幻</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="aspectRatio" className="block text-sm font-medium mb-2 text-gray-300">宽高比</label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="选择宽高比" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-lg border border-white/10 text-white">
                    <SelectItem value="1:1">1:1 (方形)</SelectItem>
                    <SelectItem value="16:9">16:9 (宽屏)</SelectItem>
                    <SelectItem value="9:16">9:16 (竖屏)</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="3:4">3:4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="numImages" className="block text-sm font-medium mb-2 text-gray-300">生成数量</label>
                <Select value={numImages.toString()} onValueChange={(v) => setNumImages(parseInt(v))}>
                  <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="选择数量" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-lg border border-white/10 text-white">
                    <SelectItem value="1">1 张</SelectItem>
                    <SelectItem value="2">2 张</SelectItem>
                    <SelectItem value="3">3 张</SelectItem>
                    <SelectItem value="4">4 张</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

        {/* Image Display Area */}
        <MotionCard className="p-6 lg:col-span-2 min-h-[400px] flex flex-col items-center justify-center" glowEffect={true} rotationIntensity={1}>
          {isLoading && (
            <div className="text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-400 mb-4" />
              <p className="text-gray-400">正在为您生成图像，请稍候...</p>
            </div>
          )}
          {!isLoading && generatedImages.length === 0 && !error && (
            <div className="text-center text-gray-500">
              <ImageIcon className="mx-auto h-16 w-16 mb-4" />
              <p>在此处查看您生成的图像</p>
              <p className="text-sm">输入提示词并点击"开始生成"</p>
            </div>
          )}
          {!isLoading && error && (
             <div className="text-center text-red-500">
               <p>{error}</p>
            </div>
          )}
          {!isLoading && generatedImages.length > 0 && (
            <div className={`grid gap-4 ${generatedImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} w-full`}>
              {generatedImages.map((src, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  key={index} 
                  src={src} 
                  alt={`生成的图像 ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full aspect-square bg-gray-800/50 border border-white/10"
                  // In a real app, consider using Next/Image with appropriate loaders
                />
              ))}
            </div>
          )}
        </MotionCard>
      </div>
    </div>
  );
} 