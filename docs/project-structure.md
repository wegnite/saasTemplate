# SaaS模板项目结构与逻辑文档

## 项目概述

这是一个基于Next.js构建的SaaS（软件即服务）模板项目，主要功能是提供AI图像生成服务。项目使用了现代前端技术栈，包括TypeScript、Tailwind CSS、Prisma ORM等，并集成了用户认证、支付系统等关键SaaS功能组件。

## 技术栈

- **前端框架**: Next.js 15.3.0
- **UI框架**: React 19.0.0
- **样式解决方案**: Tailwind CSS
- **语言**: TypeScript
- **数据库ORM**: Prisma
- **认证系统**: Clerk
- **表单处理**: React Hook Form + Zod验证
- **状态管理**: Zustand
- **动画**: Framer Motion

## 项目结构

```
saas-template/
├── prisma/                  # Prisma ORM配置和模型定义
│   └── schema.prisma        # 数据库模型定义
├── public/                  # 静态资源
├── src/                     # 源代码
│   ├── app/                 # Next.js应用路由
│   │   ├── (auth)/          # 认证相关路由
│   │   │   ├── login/       # 登录页面
│   │   │   └── register/    # 注册页面
│   │   ├── (dashboard)/     # 用户仪表盘路由
│   │   │   ├── dashboard/   # 主仪表盘页面
│   │   │   ├── ai-tools/    # AI工具路由
│   │   │   │   ├── image-generator/  # 图像生成工具页面
│   │   │   │   ├── text-generator/   # 文本生成工具页面
│   │   │   │   └── audio-processor/  # 音频处理工具页面
│   │   │   ├── history/     # 使用历史记录页面
│   │   │   ├── settings/    # 用户设置页面
│   │   │   ├── subscription/# 订阅管理页面
│   │   │   └── usage/       # 使用情况统计页面
│   │   ├── (marketing)/     # 营销页面路由
│   │   ├── api/             # API路由
│   │   │   ├── ai/          # AI功能API
│   │   │   │   ├── image/   # 图像生成API
│   │   │   │   ├── text/    # 文本生成API
│   │   │   │   └── audio/   # 音频处理API
│   │   │   ├── user/        # 用户相关API
│   │   │   │   ├── history/ # 历史记录API
│   │   │   │   ├── settings/# 设置API
│   │   │   │   └── usage/   # 使用情况API
│   │   │   ├── subscription/# 订阅相关API
│   │   │   └── webhooks/    # Webhook处理
│   │   ├── layout.tsx       # 根布局组件
│   │   └── page.tsx         # 首页
│   ├── components/          # 可复用组件
│   │   ├── ai/              # AI相关组件
│   │   ├── dashboard/       # 仪表盘组件
│   │   │   ├── history/     # 历史记录组件
│   │   │   ├── settings/    # 设置组件
│   │   │   ├── subscription/# 订阅组件
│   │   │   └── usage/       # 使用情况组件
│   │   ├── layout/          # 布局组件
│   │   ├── marketing/       # 营销页面组件
│   │   └── ui/              # UI基础组件
│   ├── lib/                 # 工具函数和服务
│   │   ├── ai/              # AI服务相关代码
│   │   │   ├── image.ts     # 图像生成服务
│   │   │   ├── text.ts      # 文本生成服务
│   │   │   └── audio.ts     # 音频处理服务
│   │   ├── auth/            # 认证相关代码
│   │   ├── db/              # 数据库操作
│   │   │   ├── prisma.ts    # Prisma客户端配置
│   │   │   ├── user.ts      # 用户数据操作
│   │   │   ├── history.ts   # 历史记录数据操作
│   │   │   └── usage.ts     # 使用情况数据操作
│   │   ├── payments/        # 支付相关代码
│   │   │   └── stripe.ts    # Stripe集成
│   │   └── utils/           # 通用工具函数
│   ├── middleware.ts        # Next.js中间件（用于路由保护）
│   └── prisma/              # Prisma客户端定义
├── .env.local               # 本地环境变量
└── package.json             # 项目依赖管理
```

## 数据模型

项目使用Prisma ORM定义了以下数据模型以及需要新增的模型：

### User模型
- 用户基本信息（ID、邮箱、姓名等）
- 与Clerk认证系统整合（clerkId）
- 积分系统（credits）
- 订阅计划（plan）
- 与Stripe支付系统整合（stripeCustomerId）
- 用户设置偏好（与UserSetting模型关联）

### ImageGeneration模型
- 图像生成记录
- 存储提示词、风格、宽高比等参数
- 保存生成图像的URL
- 与用户关联

### TextGeneration模型（新增）
- 文本生成记录
- 存储提示词、生成参数
- 保存生成的文本内容
- 与用户关联

### AudioProcessing模型（新增）
- 音频处理记录
- 存储处理类型、参数
- 保存处理前后的音频URL
- 与用户关联

### UserSetting模型（新增）
- 用户界面偏好（主题、语言等）
- 通知设置
- 默认AI工具参数设置
- 与用户一对一关联

### UsageLog模型（新增）
- 记录用户功能使用情况
- 包含使用时间、功能类型、消耗积分
- 用于统计分析和积分管理
- 与用户关联

### Subscription模型（新增）
- 订阅详情（开始日期、结束日期、状态）
- Stripe订阅ID
- 订阅历史记录
- 与用户关联

### PlanType枚举
定义了三种订阅计划类型：
- FREE（免费）
- PRO（专业版）
- ENTERPRISE（企业版）

## 主要功能模块

### 1. 认证系统
- 使用Clerk提供用户认证
- 支持登录、注册功能
- 路由保护中间件确保只有已登录用户可访问仪表盘

### 2. 用户仪表盘
- 显示用户基本信息
- 展示用户订阅计划和剩余积分
- 提供导航到各AI工具、历史记录、设置和订阅管理的入口
- 可视化展示使用情况统计

### 3. AI工具模块
#### 3.1 图像生成工具 (dashboard/ai-tools/image-generator)
- 接收用户输入的提示词(prompt)
- 允许选择图像风格、宽高比和生成数量
- 显示生成的图像结果
- 与数据库交互保存生成历史
- 实时扣除用户积分

#### 3.2 文本生成工具 (dashboard/ai-tools/text-generator)
- 接收用户输入的提示词或上下文
- 提供文本长度、风格、语言等选项
- 实时预览生成结果
- 提供复制、保存、导出功能
- 与数据库交互记录生成历史

#### 3.3 音频处理工具 (dashboard/ai-tools/audio-processor)
- 支持用户上传音频文件
- 提供多种处理选项（降噪、转录、语音合成等）
- 处理完成后提供预览和下载
- 记录处理历史并保存到数据库

### 4. 历史记录模块 (dashboard/history)
- 动态展示用户的所有AI工具使用记录
- 提供按工具类型、日期筛选功能
- 允许重用历史提示词
- 支持查看、下载历史生成结果
- 从数据库动态加载历史数据，支持分页

### 5. 用户设置模块 (dashboard/settings)
- 个人资料设置（修改姓名、头像等）
- 界面偏好设置（主题切换、语言选择）
- 通知设置（邮件通知、站内消息）
- 安全设置（密码修改、二次验证）
- 设置更改实时保存到数据库

### 6. 订阅管理模块 (dashboard/subscription)
- 显示当前订阅计划详情
- 提供订阅升级/降级选项
- 集成Stripe支付流程
- 显示订阅历史和发票记录
- 支持取消订阅功能
- 动态更新用户数据库中的订阅状态

### 7. 使用情况模块 (dashboard/usage)
- 可视化展示积分使用情况（图表、统计数据）
- 按工具类型和时间段分析使用趋势
- 显示积分消耗明细
- 提供积分购买快捷入口
- 从数据库动态加载使用记录并计算统计数据

### 8. 订阅与积分系统
- 用户基于订阅计划获得不同数量的积分
- 使用AI工具时消耗积分
- 与Stripe集成处理支付和订阅管理
- 提供积分购买和订阅升级选项
- 实时更新数据库中的积分余额

## 数据库交互实现

### 1. AI工具数据交互
```typescript
// 图像生成功能数据交互示例
export async function createImageGeneration(userId: string, data: ImageGenerationData) {
  return await prisma.imageGeneration.create({
    data: {
      userId,
      prompt: data.prompt,
      style: data.style,
      aspectRatio: data.aspectRatio,
      imageUrl: data.imageUrl,
      status: 'completed'
    }
  });
}

// 更新用户积分
export async function updateUserCredits(userId: string, creditsToDeduct: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        decrement: creditsToDeduct
      }
    }
  });
}
```

### 2. 历史记录数据交互
```typescript
// 获取用户历史记录
export async function getUserHistory(userId: string, type?: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const where = { userId };
  if (type === 'image') {
    return await prisma.imageGeneration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });
  } else if (type === 'text') {
    return await prisma.textGeneration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });
  }
  
  // 获取全部类型历史
  const [images, texts, audios] = await Promise.all([
    prisma.imageGeneration.findMany({...}),
    prisma.textGeneration.findMany({...}),
    prisma.audioProcessing.findMany({...})
  ]);
  
  // 合并并按时间排序
  return [...images, ...texts, ...audios]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(skip, skip + limit);
}
```

### 3. 设置数据交互
```typescript
// 获取用户设置
export async function getUserSettings(userId: string) {
  return await prisma.userSetting.findUnique({
    where: { userId }
  });
}

// 更新用户设置
export async function updateUserSettings(userId: string, settings: Partial<UserSettingData>) {
  return await prisma.userSetting.upsert({
    where: { userId },
    update: settings,
    create: {
      userId,
      ...settings
    }
  });
}
```

### 4. 使用情况统计数据交互
```typescript
// 获取用户使用情况统计
export async function getUserUsageStats(userId: string, period: 'day' | 'week' | 'month' = 'month') {
  const startDate = new Date();
  
  if (period === 'day') {
    startDate.setDate(startDate.getDate() - 1);
  } else if (period === 'week') {
    startDate.setDate(startDate.getDate() - 7);
  } else {
    startDate.setMonth(startDate.getMonth() - 1);
  }
  
  const logs = await prisma.usageLog.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
  
  // 按类型分组统计
  const byType = logs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + log.creditsUsed;
    return acc;
  }, {} as Record<string, number>);
  
  // 按日期分组
  const byDate = logs.reduce((acc, log) => {
    const date = log.createdAt.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + log.creditsUsed;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalUsage: logs.reduce((sum, log) => sum + log.creditsUsed, 0),
    byType,
    byDate
  };
}
```

### 5. 订阅数据交互
```typescript
// 创建或更新用户订阅
export async function updateUserSubscription(userId: string, subscriptionData: SubscriptionData) {
  return await prisma.subscription.upsert({
    where: { userId },
    update: {
      status: subscriptionData.status,
      plan: subscriptionData.plan,
      stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
      currentPeriodEnd: subscriptionData.currentPeriodEnd
    },
    create: {
      userId,
      status: subscriptionData.status,
      plan: subscriptionData.plan,
      stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
      currentPeriodStart: new Date(),
      currentPeriodEnd: subscriptionData.currentPeriodEnd
    }
  });
}

// 更新用户计划类型
export async function updateUserPlan(userId: string, plan: PlanType) {
  return await prisma.user.update({
    where: { id: userId },
    data: { plan }
  });
}
```

## 扩展点

项目设计为模块化结构，便于未来扩展：

1. **新增AI工具**：可在ai-tools目录下添加新的AI功能，如:
   - 代码生成工具
   - 3D模型生成器
   - 视频编辑器
   - 语言翻译工具
   - 数据分析工具

2. **增强支付功能**：
   - 多种支付方式集成（PayPal、加密货币等）
   - 灵活的订阅计划管理系统
   - 自动发票生成和税务处理
   - 推荐和返利系统

3. **用户仪表盘功能**：已添加完整的
   - 历史记录管理 (dashboard/history)
   - 用户设置面板 (dashboard/settings)
   - 订阅管理中心 (dashboard/subscription)
   - 使用情况分析 (dashboard/usage)

4. **API集成**：
   - 对接OpenAI API实现文本和图像生成
   - 集成Stability AI实现高质量图像生成
   - 接入ElevenLabs实现语音合成
   - 集成Whisper API实现音频转录

5. **多语言支持**：
   - 实现基于React i18n的多语言框架
   - 自动检测用户语言偏好
   - 支持至少5种主要语言

6. **团队协作功能**：
   - 多用户协作空间
   - 团队级别的订阅和积分管理
   - 权限和角色系统
   - 生成内容共享与评论

## 部署考虑

- 使用MySQL数据库（如见于Prisma配置）
- 需要配置环境变量（DATABASE_URL、Clerk密钥、Stripe密钥等）
- 静态资源和生成的图像可存储在云存储服务
- 考虑使用Vercel进行部署，实现自动化CI/CD
- 使用Redis缓存提高性能和减少数据库负载
- 设置适当的API速率限制保护服务 