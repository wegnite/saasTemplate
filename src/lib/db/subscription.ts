import { prisma } from './prisma';
import { PlanType } from '@prisma/client';

interface SubscriptionData {
  plan: PlanType;
  status: string;
  stripeSubscriptionId?: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd?: boolean;
}

/**
 * 获取用户订阅信息
 */
export async function getUserSubscription(userId: string) {
  return await prisma.subscription.findUnique({
    where: { userId }
  });
}

/**
 * 创建或更新用户订阅
 */
export async function updateUserSubscription(userId: string, subscriptionData: SubscriptionData) {
  const existing = await prisma.subscription.findUnique({
    where: { userId }
  });

  if (existing) {
    // 更新现有订阅
    return await prisma.subscription.update({
      where: { userId },
      data: {
        status: subscriptionData.status,
        plan: subscriptionData.plan,
        stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
        currentPeriodEnd: subscriptionData.currentPeriodEnd,
        cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd
      }
    });
  } else {
    // 创建新订阅
    return await prisma.subscription.create({
      data: {
        userId,
        status: subscriptionData.status,
        plan: subscriptionData.plan,
        stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
        currentPeriodStart: new Date(),
        currentPeriodEnd: subscriptionData.currentPeriodEnd,
        cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd || false
      }
    });
  }
}

/**
 * 检查用户订阅是否有效
 */
export async function isSubscriptionActive(userId: string): Promise<boolean> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId }
  });

  if (!subscription) {
    // 没有订阅记录，检查用户是否是免费计划
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true }
    });
    
    return user?.plan === 'FREE';
  }

  // 检查订阅是否有效
  return subscription.status === 'active' && 
         subscription.currentPeriodEnd > new Date();
}

/**
 * 取消用户订阅（设置为期末取消）
 */
export async function cancelSubscription(userId: string) {
  return await prisma.subscription.update({
    where: { userId },
    data: {
      cancelAtPeriodEnd: true
    }
  });
}

/**
 * 重新激活已取消的订阅
 */
export async function reactivateSubscription(userId: string) {
  return await prisma.subscription.update({
    where: { userId },
    data: {
      cancelAtPeriodEnd: false
    }
  });
}

/**
 * 更新用户计划并同步到用户模型
 */
export async function updateSubscriptionPlan(userId: string, plan: PlanType) {
  // 事务确保订阅和用户记录同步更新
  return await prisma.$transaction(async (tx) => {
    // 更新订阅
    const subscription = await tx.subscription.upsert({
      where: { userId },
      update: { plan },
      create: {
        userId,
        plan,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
      }
    });

    // 同步更新用户计划
    await tx.user.update({
      where: { id: userId },
      data: { plan }
    });

    return subscription;
  });
}

/**
 * 根据订阅计划分配积分
 */
export async function assignCreditsBasedOnPlan(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true }
  });

  if (!user) {
    throw new Error('用户不存在');
  }

  let creditsToAdd = 0;

  // 根据计划分配积分
  switch (user.plan) {
    case 'FREE':
      creditsToAdd = 100;
      break;
    case 'PRO':
      creditsToAdd = 500;
      break;
    case 'ENTERPRISE':
      creditsToAdd = 2000;
      break;
    default:
      creditsToAdd = 100;
  }

  // 更新用户积分
  return await prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        increment: creditsToAdd
      }
    }
  });
} 