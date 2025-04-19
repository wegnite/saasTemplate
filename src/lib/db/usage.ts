import { prisma } from './prisma';

type UsagePeriod = 'day' | 'week' | 'month' | 'year';

interface UsageSummary {
  totalUsage: number;
  byType: Record<string, number>;
  byDate: Record<string, number>;
}

// 定义UsageLog类型接口以避免隐式any
interface UsageLog {
  id: string;
  userId: string;
  type: string;
  creditsUsed: number;
  featureId?: string;
  description?: string;
  createdAt: Date;
}

/**
 * 获取用户使用情况统计
 */
export async function getUserUsageStats(
  userId: string,
  period: UsagePeriod = 'month'
): Promise<UsageSummary> {
  const startDate = new Date();
  
  // 设置开始日期
  if (period === 'day') {
    startDate.setDate(startDate.getDate() - 1);
  } else if (period === 'week') {
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === 'month') {
    startDate.setMonth(startDate.getMonth() - 1);
  } else if (period === 'year') {
    startDate.setFullYear(startDate.getFullYear() - 1);
  }
  
  // 获取指定时间段内的使用记录
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
  const byType = logs.reduce((acc: Record<string, number>, log: UsageLog) => {
    acc[log.type] = (acc[log.type] || 0) + log.creditsUsed;
    return acc;
  }, {} as Record<string, number>);
  
  // 按日期分组
  const byDate = logs.reduce((acc: Record<string, number>, log: UsageLog) => {
    const date = log.createdAt.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + log.creditsUsed;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalUsage: logs.reduce((sum: number, log: UsageLog) => sum + log.creditsUsed, 0),
    byType,
    byDate
  };
}

/**
 * 获取最常用的工具类型
 */
export async function getMostUsedTools(userId: string, limit = 3) {
  // 获取用户所有使用记录
  const logs = await prisma.usageLog.findMany({
    where: { userId },
  });
  
  // 按类型分组并计算总使用次数
  const toolUsageCounts: Record<string, number> = {};
  
  logs.forEach((log: UsageLog) => {
    toolUsageCounts[log.type] = (toolUsageCounts[log.type] || 0) + 1;
  });
  
  // 转换为数组并排序
  const sortedTools = Object.entries(toolUsageCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
  
  return sortedTools;
}

/**
 * 获取积分使用趋势
 */
export async function getCreditsUsageTrend(userId: string, days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  // 获取最近几天的使用记录
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
  
  // 准备日期范围，确保每一天都有数据
  const dateRange: Record<string, number> = {};
  for (let i = 0; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    dateRange[dateString] = 0;
  }
  
  // 填充实际数据
  logs.forEach((log: UsageLog) => {
    const date = log.createdAt.toISOString().split('T')[0];
    if (dateRange[date] !== undefined) {
      dateRange[date] += log.creditsUsed;
    }
  });
  
  // 转换为数组格式，按日期排序
  return Object.entries(dateRange)
    .map(([date, credits]) => ({ date, credits }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * 记录使用情况
 */
export async function logUsage(
  userId: string,
  type: string,
  creditsUsed: number,
  featureId?: string,
  description?: string
) {
  return await prisma.usageLog.create({
    data: {
      userId,
      type,
      creditsUsed,
      featureId,
      description
    }
  });
}

/**
 * 获取用户的积分历史
 */
export async function getCreditsHistory(userId: string, page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;
  
  const [logs, totalCount] = await Promise.all([
    prisma.usageLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.usageLog.count({
      where: { userId }
    })
  ]);
  
  const totalPages = Math.ceil(totalCount / pageSize);
  
  return {
    logs,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
    }
  };
} 