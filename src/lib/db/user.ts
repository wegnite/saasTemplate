import { prisma } from './prisma';
import { PlanType } from '@prisma/client';

/**
 * 获取用户信息
 */
export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      settings: true
    }
  });
}

/**
 * 获取用户信息通过Clerk ID
 */
export async function getUserByClerkId(clerkId: string) {
  return await prisma.user.findUnique({
    where: { clerkId },
    include: {
      subscription: true,
      settings: true
    }
  });
}

/**
 * 创建新用户
 */
export async function createUser(userData: {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}) {
  return await prisma.user.create({
    data: {
      ...userData,
      settings: {
        create: {} // 创建默认设置
      }
    },
    include: {
      settings: true
    }
  });
}

/**
 * 更新用户信息
 */
export async function updateUser(userId: string, userData: {
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  email?: string;
}) {
  return await prisma.user.update({
    where: { id: userId },
    data: userData
  });
}

/**
 * 更新用户积分
 */
export async function updateUserCredits(userId: string, creditsToAdd: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        increment: creditsToAdd
      }
    }
  });
}

/**
 * 扣除用户积分并记录使用情况
 */
export async function deductUserCredits(
  userId: string, 
  creditsToDeduct: number, 
  usageType: string, 
  featureId?: string,
  description?: string
) {
  // 使用事务确保积分扣除和使用记录同时成功
  return await prisma.$transaction(async (tx) => {
    // 先查询用户当前积分
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    if (user.credits < creditsToDeduct) {
      throw new Error('积分不足');
    }

    // 扣除积分
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: creditsToDeduct
        }
      }
    });

    // 记录使用情况
    await tx.usageLog.create({
      data: {
        userId,
        type: usageType,
        featureId,
        creditsUsed: creditsToDeduct,
        description
      }
    });

    return updatedUser;
  });
}

/**
 * 更新用户订阅计划
 */
export async function updateUserPlan(userId: string, plan: PlanType) {
  return await prisma.user.update({
    where: { id: userId },
    data: { plan }
  });
}

/**
 * 删除用户
 */
export async function deleteUser(userId: string) {
  return await prisma.user.delete({
    where: { id: userId }
  });
} 