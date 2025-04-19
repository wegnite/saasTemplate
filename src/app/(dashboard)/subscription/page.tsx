'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Check, CreditCard, Tag, Calendar, AlertTriangle } from 'lucide-react';

// 模拟订阅数据
interface SubscriptionData {
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  credits: number;
  maxCredits: number;
  paymentMethod?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  invoices: Array<{
    id: string;
    amount: number;
    status: string;
    date: string;
    pdf: string;
  }>;
}

// 模拟获取订阅数据
const fetchSubscriptionData = async (userId: string): Promise<SubscriptionData> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 生成当前日期和一个月后的日期
  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  
  // 返回模拟数据
  return {
    plan: 'PRO',
    status: 'active',
    currentPeriodStart: now.toISOString(),
    currentPeriodEnd: nextMonth.toISOString(),
    cancelAtPeriodEnd: false,
    credits: 350,
    maxCredits: 500,
    paymentMethod: {
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2024
    },
    invoices: [
      {
        id: 'inv_12345',
        amount: 99,
        status: 'paid',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        pdf: '#'
      },
      {
        id: 'inv_12346',
        amount: 99,
        status: 'paid',
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        pdf: '#'
      }
    ]
  };
};

// 模拟取消订阅
const cancelSubscription = async (userId: string): Promise<boolean> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

// 计划详情组件
interface PlanFeature {
  feature: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const planFeatures: PlanFeature[] = [
  {
    feature: '每月积分',
    free: '100积分',
    pro: '500积分',
    enterprise: '2000积分'
  },
  {
    feature: '图像生成',
    free: '有限',
    pro: true,
    enterprise: true
  },
  {
    feature: '文本生成',
    free: '有限',
    pro: true,
    enterprise: true
  },
  {
    feature: '音频处理',
    free: false,
    pro: true,
    enterprise: true
  },
  {
    feature: '优先队列',
    free: false,
    pro: true,
    enterprise: true
  },
  {
    feature: '专属客服',
    free: false,
    pro: false,
    enterprise: true
  }
];

// 计划卡片组件
const PlanCard = ({ 
  plan, 
  price, 
  features, 
  current, 
  onUpgrade 
}: { 
  plan: string; 
  price: string; 
  features: string[]; 
  current: boolean; 
  onUpgrade: () => void 
}) => (
  <Card className={`p-6 border ${current ? 'border-purple-500' : 'border-gray-700'} bg-black/60 backdrop-blur-sm`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold">{plan}</h3>
        <p className="text-2xl font-bold mt-2">{price}</p>
      </div>
      {current && (
        <Badge className="bg-purple-500 hover:bg-purple-600">当前计划</Badge>
      )}
    </div>
    
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    
    <Button 
      variant={current ? "outline" : "default"} 
      size="lg" 
      className="w-full" 
      onClick={onUpgrade}
      disabled={current}
    >
      {current ? '当前计划' : '升级'}
    </Button>
  </Card>
);

export default function SubscriptionPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  
  useEffect(() => {
    const loadSubscription = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await fetchSubscriptionData(user.id);
        setSubscriptionData(data);
      } catch (error) {
        console.error('加载订阅信息失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSubscription();
  }, [user]);
  
  const handleCancelSubscription = async () => {
    if (!user) return;
    
    setCanceling(true);
    try {
      await cancelSubscription(user.id);
      // 更新本地状态
      if (subscriptionData) {
        setSubscriptionData({
          ...subscriptionData,
          cancelAtPeriodEnd: true
        });
      }
    } catch (error) {
      console.error('取消订阅失败:', error);
    } finally {
      setCanceling(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        <span className="ml-2">加载订阅信息中...</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">订阅管理</h1>
        <p className="text-gray-400">管理您的订阅计划和付款信息</p>
      </div>
      
      {/* 当前订阅状态 */}
      <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{subscriptionData?.plan} 计划</h2>
              <Badge
                className={
                  subscriptionData?.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                  subscriptionData?.status === 'canceled' ? 'bg-yellow-500 hover:bg-yellow-600' : 
                  'bg-red-500 hover:bg-red-600'
                }
              >
                {subscriptionData?.status === 'active' ? '已激活' : 
                 subscriptionData?.status === 'canceled' ? '已取消' : 
                 '已逾期'}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-400 mt-1">
              当前计划周期: {formatDate(subscriptionData?.currentPeriodStart || '')} - {formatDate(subscriptionData?.currentPeriodEnd || '')}
            </p>
            
            {subscriptionData?.cancelAtPeriodEnd && (
              <div className="flex items-center gap-2 mt-2 text-yellow-400">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm">您的订阅将在计划周期结束后取消</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {subscriptionData?.cancelAtPeriodEnd ? (
              <Button>恢复订阅</Button>
            ) : subscriptionData?.plan !== 'FREE' ? (
              <Button 
                variant="outline" 
                onClick={handleCancelSubscription}
                disabled={canceling}
              >
                {canceling ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                取消订阅
              </Button>
            ) : null}
            
            <Button variant="outline">更改计划</Button>
          </div>
        </div>
        
        {/* 积分使用情况 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">剩余积分</h3>
            <span className="text-sm">{subscriptionData?.credits} / {subscriptionData?.maxCredits}</span>
          </div>
          <Progress
            value={(subscriptionData?.credits || 0) / (subscriptionData?.maxCredits || 1) * 100}
            className="h-2 bg-gray-700"
          />
        </div>
        
        {/* 支付方式 */}
        {subscriptionData?.paymentMethod && (
          <div className="border-t border-gray-700 pt-4">
            <h3 className="font-medium mb-4">支付方式</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="capitalize">{subscriptionData.paymentMethod.brand} **** **** **** {subscriptionData.paymentMethod.last4}</p>
                  <p className="text-sm text-gray-400">过期时间: {subscriptionData.paymentMethod.expMonth}/{subscriptionData.paymentMethod.expYear}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">更新</Button>
            </div>
          </div>
        )}
      </Card>
      
      {/* 订阅计划选项 */}
      <h2 className="text-xl font-bold mb-4">可用计划</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <PlanCard
          plan="免费计划"
          price="¥0/月"
          features={[
            "每月100积分",
            "基础图像生成",
            "基础文本生成",
            "社区支持"
          ]}
          current={subscriptionData?.plan === 'FREE'}
          onUpgrade={() => {}}
        />
        
        <PlanCard
          plan="专业计划"
          price="¥99/月"
          features={[
            "每月500积分",
            "高级图像生成",
            "高级文本生成",
            "音频处理",
            "优先队列"
          ]}
          current={subscriptionData?.plan === 'PRO'}
          onUpgrade={() => {}}
        />
        
        <PlanCard
          plan="企业计划"
          price="¥299/月"
          features={[
            "每月2000积分",
            "所有高级功能",
            "团队协作",
            "专属客服",
            "自定义解决方案"
          ]}
          current={subscriptionData?.plan === 'ENTERPRISE'}
          onUpgrade={() => {}}
        />
      </div>
      
      {/* 发票记录 */}
      {(subscriptionData?.invoices?.length || 0) > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">发票历史</h2>
          <Card className="border border-gray-700 bg-black/60 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">发票编号</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">日期</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">金额</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {subscriptionData?.invoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{invoice.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(invoice.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">¥{invoice.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={invoice.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {invoice.status === 'paid' ? '已支付' : '待支付'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a href={invoice.pdf} className="text-purple-400 hover:text-purple-300">
                          下载 PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
} 