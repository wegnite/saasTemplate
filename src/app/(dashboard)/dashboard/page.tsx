'use client';

import Link from 'next/link';
import { MotionCard } from '@/components/ui/motion-card';
import { SignOutButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

// 定义 AI 工具数据
const aiTools = [
  {
    title: 'AI 写作助手',
    description: '使用 AI 生成高质量的文章、博客和营销文案',
    icon: (
      <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    href: '/ai-tools/writing',
  },
  {
    title: 'AI 图像生成',
    description: '使用 AI 生成独特的图像和艺术作品',
    icon: (
      <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    href: '/ai-tools/image-generator',
  },
  {
    title: 'AI 代码助手',
    description: '使用 AI 生成和优化代码，提高开发效率',
    icon: (
      <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    href: '/ai-tools/code-assistant',
  },
];

// 定义最近活动数据
const recentActivity = [
  {
    title: '生成了新的文章',
    description: '使用 AI 写作助手生成了"如何提高工作效率"的文章',
    time: '2小时前',
    icon: (
      <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: '生成了新的图像',
    description: '使用 AI 图像生成创建了"未来城市"的概念图',
    time: '5小时前',
    icon: (
      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: '优化了代码',
    description: '使用 AI 代码助手优化了 React 组件的性能',
    time: '昨天',
    icon: (
      <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* 动态背景 */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[5%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* 侧边栏 */}
      <div className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl p-4">
        <div className="flex items-center gap-2 mb-10">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-400"></div>
          <span className="text-xl font-bold">AI+ SaaS</span>
        </div>
        
        <nav>
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">主菜单</div>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                仪表盘
              </Link>
            </li>
            <li>
              <Link href="/ai-tools" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI工具
              </Link>
            </li>
            <li>
              <Link href="/history" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                历史记录
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                设置
              </Link>
            </li>
          </ul>
          
          <div className="mt-8 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">订阅</div>
          <ul className="space-y-2">
            <li>
              <Link href="/subscription" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                管理订阅
              </Link>
            </li>
            <li>
              <Link href="/usage" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                使用情况
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600/30 to-blue-400/30 flex items-center justify-center">
                <span className="text-sm font-medium">用户</span>
              </div>
              <div>
                <p className="text-sm font-medium">张三</p>
                <p className="text-xs text-gray-400">专业版用户</p>
              </div>
            </div>
            <div className="mt-3">
              <SignOutButton>
                <Button variant="glass" className="w-full">
                  退出登录
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="pl-64">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-xl font-bold">仪表盘</h1>
            <div className="flex items-center gap-4">
              <button className="rounded-full bg-white/5 p-2 text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="rounded-full bg-white/5 p-2 text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* 内容 */}
        <main className="p-6">
          {/* 用量统计卡片 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
            <MotionCard className="p-6" glowEffect={true} rotationIntensity={3}>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-500/20 p-3">
                  <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">剩余AI请求</p>
                  <p className="text-2xl font-bold">4,382</p>
                  <p className="text-xs text-green-400">本月可用: 5,000</p>
                </div>
              </div>
            </MotionCard>
            <MotionCard className="p-6" glowEffect={true} rotationIntensity={3}>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-500/20 p-3">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">已生成内容</p>
                  <p className="text-2xl font-bold">142</p>
                  <p className="text-xs text-purple-400">较上月增长 23%</p>
                </div>
              </div>
            </MotionCard>
            <MotionCard className="p-6" glowEffect={true} rotationIntensity={3}>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-500/20 p-3">
                  <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">订阅状态</p>
                  <p className="text-2xl font-bold">专业版</p>
                  <p className="text-xs text-blue-400">有效期至 2024/12/31</p>
                </div>
              </div>
            </MotionCard>
          </div>

          {/* AI工具卡片 */}
          <h2 className="text-2xl font-bold mb-6">AI工具</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiTools.map((tool, index) => (
              <MotionCard key={index} className="p-6" glowEffect={true} rotationIntensity={5}>
                <div className="mb-4 rounded-full bg-gradient-to-tr from-purple-600/20 to-blue-400/20 p-2 w-12 h-12 flex items-center justify-center">
                  {tool.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{tool.title}</h3>
                <p className="text-gray-400 mb-6">{tool.description}</p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                >
                  使用工具
                </Link>
              </MotionCard>
            ))}
          </div>

          {/* 最近活动 */}
          <h2 className="text-2xl font-bold mt-10 mb-6">最近活动</h2>
          <MotionCard className="p-6" glowEffect={true} rotationIntensity={2}>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <div className="rounded-full bg-white/5 p-2">{activity.icon}</div>
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </MotionCard>
        </main>
      </div>
    </div>
  );
} 