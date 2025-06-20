# 🚀 Vercel 部署指南

本指南将帮助你快速在 Vercel 上部署这个 AI SaaS 网站模板。

## 📋 部署前准备

### 1. 注册必要的服务账户

在部署之前，你需要注册以下服务：

- **[Vercel](https://vercel.com/)**：用于部署网站
- **[Clerk](https://clerk.com/)**：用于用户认证（可选，可以暂时跳过）
- **[PlanetScale](https://planetscale.com/)** 或其他数据库服务：用于数据存储
- **OpenAI** 或其他 AI 服务：用于 AI 功能

### 2. 获取必要的 API 密钥

你需要获取以下 API 密钥：

#### Clerk（用户认证）
1. 访问 [Clerk Dashboard](https://dashboard.clerk.com/)
2. 创建新项目
3. 获取以下密钥：
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

#### 数据库
1. 创建 PlanetScale 数据库或使用其他数据库服务
2. 获取数据库连接字符串：
   - `DATABASE_URL`

## 🚀 Vercel 部署步骤

### 方法一：通过 Vercel 网站部署（推荐）

1. **访问 Vercel**
   - 打开 [Vercel Dashboard](https://vercel.com/dashboard)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 授权 Vercel 访问你的 GitHub 账号
   - 选择 `saasTemplate` 仓库

3. **配置项目**
   - **Project Name**: `saas-template`（或你喜欢的名字）
   - **Framework Preset**: Next.js（应该自动检测）
   - **Root Directory**: 保持默认（./）

4. **设置环境变量**
   在 "Environment Variables" 部分添加以下变量：

   ```bash
   # 必需的环境变量
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   
   # Clerk 认证（暂时可以使用测试值）
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_demo
   CLERK_SECRET_KEY=sk_test_demo
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_OUT_URL=/logout
   NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/login
   
   # 数据库（暂时可以留空，稍后配置）
   DATABASE_URL=your_database_connection_string
   ```

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成（通常需要 2-3 分钟）

### 方法二：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel --prod
   ```

## ⚙️ 部署后配置

### 1. 设置自定义域名（可选）

1. 在 Vercel Dashboard 中打开你的项目
2. 进入 "Settings" → "Domains"
3. 添加你的自定义域名
4. 更新 DNS 记录指向 Vercel

### 2. 配置数据库

1. **创建数据库**
   - 推荐使用 PlanetScale、Supabase 或 Railway
   - 获取数据库连接字符串

2. **更新环境变量**
   - 在 Vercel Dashboard 中更新 `DATABASE_URL`
   - 重新部署项目

3. **运行数据库迁移**
   ```bash
   npx prisma db push
   ```

### 3. 配置认证系统

1. **更新 Clerk 设置**
   - 在 Clerk Dashboard 中添加你的 Vercel 域名
   - 更新回调 URL

2. **更新环境变量**
   - 使用真实的 Clerk API 密钥替换测试值
   - 在 Vercel Dashboard 中更新环境变量

## 🔧 常见问题解决

### 构建错误

如果遇到构建错误：

1. **检查 Node.js 版本**
   - 确保使用 Node.js 18 或更高版本

2. **检查依赖**
   ```bash
   npm install
   npm run build
   ```

3. **检查环境变量**
   - 确保所有必需的环境变量都已设置

### 运行时错误

1. **Clerk 认证错误**
   - 检查 Clerk API 密钥是否正确
   - 确保域名配置正确

2. **数据库连接错误**
   - 检查 `DATABASE_URL` 是否正确
   - 确保数据库可以从 Vercel 访问

## 📈 性能优化

### 1. 启用 Vercel Analytics

```bash
npm install @vercel/analytics
```

### 2. 配置 ISR（增量静态再生）

在页面中添加：
```javascript
export const revalidate = 3600; // 1小时
```

### 3. 优化图片

使用 Next.js Image 组件：
```javascript
import Image from 'next/image'
```

## 🎯 下一步

部署成功后，你可以：

1. **测试网站功能**
   - 访问你的 Vercel URL
   - 测试各个页面和功能

2. **配置 AI 服务**
   - 添加 OpenAI API 密钥
   - 配置其他 AI 服务

3. **自定义品牌**
   - 更新 logo 和颜色
   - 修改网站内容

4. **添加支付功能**
   - 集成 Stripe
   - 配置订阅计划

## 📞 获取帮助

如果在部署过程中遇到问题：

- 查看 [Vercel 文档](https://vercel.com/docs)
- 查看项目的 GitHub Issues
- 联系技术支持

---

🎉 **恭喜！你的 AI SaaS 网站已经部署成功！** 