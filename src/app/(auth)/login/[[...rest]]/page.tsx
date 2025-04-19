'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { MotionCard } from '@/components/ui/motion-card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* 背景效果 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] h-[800px] w-[800px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-400"></div>
          <span className="text-xl font-bold">AI+ SaaS</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <MotionCard 
          className="p-8 rounded-2xl"
          glowEffect={true}
          rotationIntensity={3}
          glassEffect={false}
          bgGradient={false}
        >
          <SignIn 
            path="/login" 
            signUpUrl="/register" 
            routing="path"
          />
        </MotionCard>
      </div>
    </div>
  );
} 