import { ClerkProvider } from '@clerk/nextjs';
import { zhCN } from '@clerk/localizations';
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

// 定义字体
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// 预定义字体类名
const fontClasses = `${inter.variable} ${poppins.variable}`;

export const metadata: Metadata = {
  title: "AI+ SaaS | 下一代AI驱动应用平台",
  description: "打造你的下一代AI应用，无需深厚技术背景。我们提供直观的界面，强大的API和完整的解决方案。",
  keywords: "AI, SaaS, 人工智能, 机器学习, 应用平台, AI API",
  authors: [{ name: "AI+ SaaS Team" }],
  creator: "AI+ SaaS",
  publisher: "AI+ SaaS",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://ai-saas-template.com",
    title: "AI+ SaaS | 下一代AI驱动应用平台",
    description: "打造你的下一代AI应用，无需深厚技术背景。我们提供直观的界面，强大的API和完整的解决方案。",
    siteName: "AI+ SaaS",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI+ SaaS | 下一代AI驱动应用平台",
    description: "打造你的下一代AI应用，无需深厚技术背景。我们提供直观的界面，强大的API和完整的解决方案。",
    creator: "@ai_saas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="zh-CN" className="dark" suppressHydrationWarning>
        <body 
          className={`${fontClasses} font-sans min-h-screen bg-black text-white antialiased`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
