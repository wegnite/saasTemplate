import { prisma } from '../db/prisma';
import { deductUserCredits } from '../db/user';

export interface ImageGenerationParams {
  prompt: string;
  style?: string;
  aspectRatio?: string;
  quantity?: number;
}

/**
 * 生成图像
 * 模拟实际AI API调用
 */
export async function generateImage(userId: string, params: ImageGenerationParams) {
  // 检查参数有效性
  if (!params.prompt) {
    throw new Error('提示词不能为空');
  }

  // 设置默认值
  const style = params.style || 'realistic';
  const aspectRatio = params.aspectRatio || '1:1';
  const quantity = params.quantity || 1;

  // 计算所需积分
  const creditsPerImage = 5; // 每张图消耗5积分
  const totalCredits = creditsPerImage * quantity;

  try {
    // 扣除用户积分
    await deductUserCredits(
      userId, 
      totalCredits, 
      'image-generation',
      undefined,
      `生成${quantity}张图像: ${params.prompt.substring(0, 30)}...`
    );

    // 模拟AI图像生成延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 生成模拟图像URL
    // 实际项目中，这里应该调用实际的AI API，如OpenAI或Stability AI
    const generatedImageUrls = Array(quantity).fill(null).map((_, i) => 
      `/api/images/placeholder-${style}-${aspectRatio.replace(':', 'x')}-${i+1}.png`
    );

    // 保存生成记录到数据库
    const imageRecords = await Promise.all(
      generatedImageUrls.map(imageUrl => 
        prisma.imageGeneration.create({
          data: {
            userId,
            prompt: params.prompt,
            style,
            aspectRatio,
            imageUrl,
            status: 'completed',
            creditsUsed: creditsPerImage
          }
        })
      )
    );

    return {
      success: true,
      images: imageRecords,
      creditsUsed: totalCredits
    };
  } catch (error) {
    console.error('图像生成失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 重新生成已有提示词的图像
 */
export async function regenerateImage(userId: string, imageId: string) {
  try {
    // 获取原始生成记录
    const originalImage = await prisma.imageGeneration.findUnique({
      where: { id: imageId }
    });

    if (!originalImage) {
      throw new Error('找不到原始图像记录');
    }

    // 检查是否为用户所有
    if (originalImage.userId !== userId) {
      throw new Error('无权访问此图像');
    }

    // 调用生成函数
    return await generateImage(userId, {
      prompt: originalImage.prompt,
      style: originalImage.style || undefined,
      aspectRatio: originalImage.aspectRatio || undefined,
      quantity: 1
    });
  } catch (error) {
    console.error('重新生成图像失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 获取用户生成的图像列表
 */
export async function getUserGeneratedImages(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const [images, total] = await Promise.all([
    prisma.imageGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.imageGeneration.count({
      where: { userId }
    })
  ]);
  
  return {
    images,
    pagination: {
      page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
} 