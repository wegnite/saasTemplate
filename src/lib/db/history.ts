import { prisma } from './prisma';

type HistoryType = 'image' | 'text' | 'audio' | 'all';

/**
 * 获取用户特定类型的历史记录
 */
export async function getUserHistoryByType(
  userId: string,
  type: HistoryType = 'all',
  page = 1,
  pageSize = 10
) {
  const skip = (page - 1) * pageSize;

  if (type === 'image') {
    return await prisma.imageGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });
  } 
  
  if (type === 'text') {
    return await prisma.textGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });
  }
  
  if (type === 'audio') {
    return await prisma.audioProcessing.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });
  }

  // 获取全部类型历史
  const [imageCount, textCount, audioCount] = await Promise.all([
    prisma.imageGeneration.count({ where: { userId } }),
    prisma.textGeneration.count({ where: { userId } }),
    prisma.audioProcessing.count({ where: { userId } }),
  ]);

  const totalCount = imageCount + textCount + audioCount;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 根据总数据和当前页计算每个类型应该获取多少条记录
  // 实际应用中可能需要更复杂的分页逻辑
  const [images, texts, audios] = await Promise.all([
    prisma.imageGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: pageSize,
    }),
    prisma.textGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: pageSize,
    }),
    prisma.audioProcessing.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: pageSize,
    }),
  ]);

  // 合并并按时间排序
  const allHistory = [...images, ...texts, ...audios].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  ).slice(skip, skip + pageSize);

  return {
    history: allHistory,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
    }
  };
}

/**
 * 获取历史记录详情
 */
export async function getImageHistoryById(id: string) {
  return await prisma.imageGeneration.findUnique({
    where: { id },
  });
}

export async function getTextHistoryById(id: string) {
  return await prisma.textGeneration.findUnique({
    where: { id },
  });
}

export async function getAudioHistoryById(id: string) {
  return await prisma.audioProcessing.findUnique({
    where: { id },
  });
}

/**
 * 删除历史记录
 */
export async function deleteImageHistory(id: string, userId: string) {
  return await prisma.imageGeneration.deleteMany({
    where: {
      id,
      userId, // 确保只删除用户自己的记录
    },
  });
}

export async function deleteTextHistory(id: string, userId: string) {
  return await prisma.textGeneration.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

export async function deleteAudioHistory(id: string, userId: string) {
  return await prisma.audioProcessing.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

/**
 * 获取用户最近的历史记录
 */
export async function getRecentHistory(userId: string, limit = 5) {
  const [images, texts, audios] = await Promise.all([
    prisma.imageGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    }),
    prisma.textGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    }),
    prisma.audioProcessing.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    }),
  ]);

  return [...images, ...texts, ...audios]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
} 