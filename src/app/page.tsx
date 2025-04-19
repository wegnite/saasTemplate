import Link from 'next/link';
import Image from 'next/image';
import { MotionCard } from '@/components/ui/motion-card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* 动态背景 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] h-[1000px] w-[1000px] rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -bottom-[30%] -right-[20%] h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-pink-600/20 blur-[100px]" />
      </div>

      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-400"></div>
            <span className="text-xl font-bold">AI+ SaaS</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-purple-400">
              特性
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-purple-400">
              价格
            </Link>
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-purple-400">
              常见问题
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-purple-400">
              联系我们
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-purple-400"
            >
              登录
            </Link>
            <Link 
              href="/register" 
              className="rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              注册
            </Link>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <section className="w-full py-24 flex flex-col items-center justify-center text-center px-4">
        <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">AI驱动</span> 的未来，
          <br />从这里起航
        </h1>
        <p className="max-w-2xl text-lg text-gray-300 md:text-xl lg:text-2xl">
          打造你的下一代AI应用，无需深厚技术背景。
          我们提供直观的界面，强大的API和完整的解决方案。
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-lg font-medium text-white shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
          >
            免费试用
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-6 py-3 text-lg font-medium backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
          >
            观看演示
          </Link>
        </div>
        
        {/* 玻璃态演示区 */}
        <div className="mt-20 w-full max-w-5xl">
          <MotionCard 
            className="p-2 rounded-2xl"
            glowEffect={true}
            bgGradient={true}
            rotationIntensity={5}
          >
            <div className="overflow-hidden rounded-xl">
              <div className="h-[350px] w-full bg-gray-900/80 flex items-center justify-center">
                <div className="absolute -top-3 left-5 flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-xl text-gray-400">AI应用界面展示区</p>
              </div>
            </div>
          </MotionCard>
        </div>
      </section>

      {/* 特性区 */}
      <section id="features" className="w-full py-20 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">强大特性</span>，超乎想象
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 特性卡片 */}
            {features.map((feature, index) => (
              <MotionCard 
                key={index} 
                className="p-6 h-full"
                glowEffect={true}
                rotationIntensity={8}
              >
                <div className="mb-4 rounded-full bg-gradient-to-tr from-purple-600/20 to-blue-400/20 p-2 w-12 h-12 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* 定价区 */}
      <section id="pricing" className="w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">简单定价</span>，灵活选择
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <MotionCard
                key={index}
                className={`relative p-6 h-full flex flex-col ${index === 1 ? 'bg-gradient-to-b from-purple-600/20 to-blue-600/20 border-purple-500/50' : ''}`}
                glowEffect={index === 1}
                rotationIntensity={6}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1 text-sm font-medium">
                    最受欢迎
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">¥{plan.price}</span>
                  <span className="text-gray-400">/月</span>
                </div>
                <p className="mb-6 text-gray-400">{plan.description}</p>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`mt-auto inline-flex items-center justify-center rounded-md ${index === 1 ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : 'border border-white/20 bg-white/5'} px-6 py-3 text-lg font-medium hover:bg-white/10 transition-all duration-300`}
                >
                  {index === 1 ? '立即开始' : '选择方案'}
                </Link>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className="mt-auto w-full bg-black/40 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-400"></div>
                <span className="text-xl font-bold">AI+ SaaS</span>
              </div>
              <p className="text-gray-400 max-w-md">
                打造下一代AI驱动的SaaS应用，释放AI的无限潜力。
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">产品</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">特性</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">定价</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">API</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">集成</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">资源</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">文档</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">博客</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">社区</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">支持</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">公司</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">关于我们</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">联系我们</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">职业</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">隐私政策</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 AI+ SaaS. 保留所有权利。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// 特性数据
const features = [
  {
    icon: (
      <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI驱动创作',
    description: '使用最新的AI模型进行创意内容生成，包括图像、文本和音频。',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: '安全与隐私',
    description: '企业级安全标准，确保你的数据和AI互动完全私密，符合GDPR标准。',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '超快响应',
    description: '优化的API调用和缓存策略，确保AI响应时间最小化，提供流畅用户体验。',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: '直观界面',
    description: '精心设计的用户界面，让复杂的AI功能变得简单易用，无需技术背景。',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: '可扩展API',
    description: '强大的API接口，让你可以将AI功能无缝集成到自己的应用和工作流程中。',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    title: '无限存储',
    description: '所有计划都包含足够的云存储空间，安全存储你的AI生成内容和项目文件。',
  },
];

// 定价计划数据
const plans = [
  {
    name: '个人',
    price: '99',
    description: '适合个人创作者和自由职业者',
    features: [
      '每月1000次AI请求',
      '5GB云存储空间',
      '基本AI模型访问',
      '标准客户支持',
      '1个用户',
    ],
  },
  {
    name: '专业版',
    price: '299',
    description: '适合小型团队和初创企业',
    features: [
      '每月5000次AI请求',
      '25GB云存储空间',
      '高级AI模型访问',
      '优先客户支持',
      '最多5个用户',
      'API访问',
    ],
  },
  {
    name: '企业版',
    price: '999',
    description: '适合大型企业和高需求用户',
    features: [
      '无限AI请求',
      '100GB云存储空间',
      '所有AI模型完整访问',
      '24/7专属支持',
      '无限用户',
      '高级API访问',
      '自定义模型训练',
    ],
  },
];
