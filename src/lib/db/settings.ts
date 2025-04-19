import { prisma } from './prisma';

interface UserSettingData {
  theme?: string;
  language?: string;
  emailNotifications?: boolean;
  defaultImageStyle?: string;
  defaultAspectRatio?: string;
}

/**
 * 获取用户设置
 */
export async function getUserSettings(userId: string) {
  // 尝试获取用户设置
  const settings = await prisma.userSetting.findUnique({
    where: { userId }
  });
  
  // 如果没有设置，创建默认设置
  if (!settings) {
    return await prisma.userSetting.create({
      data: {
        userId,
        theme: 'dark',
        language: 'zh',
        emailNotifications: true
      }
    });
  }
  
  return settings;
}

/**
 * 更新用户设置
 */
export async function updateUserSettings(userId: string, settingsData: UserSettingData) {
  // 使用upsert确保即使没有设置记录也能创建
  return await prisma.userSetting.upsert({
    where: { userId },
    update: settingsData,
    create: {
      userId,
      ...settingsData
    }
  });
}

/**
 * 更新主题设置
 */
export async function updateThemeSetting(userId: string, theme: string) {
  return await updateUserSettings(userId, { theme });
}

/**
 * 更新语言设置
 */
export async function updateLanguageSetting(userId: string, language: string) {
  return await updateUserSettings(userId, { language });
}

/**
 * 更新邮件通知设置
 */
export async function updateEmailNotificationSetting(userId: string, enabled: boolean) {
  return await updateUserSettings(userId, { emailNotifications: enabled });
}

/**
 * 更新默认图像生成设置
 */
export async function updateDefaultImageSettings(
  userId: string, 
  defaultImageStyle?: string,
  defaultAspectRatio?: string
) {
  return await updateUserSettings(userId, {
    defaultImageStyle,
    defaultAspectRatio
  });
}

/**
 * 重置所有设置为默认值
 */
export async function resetUserSettings(userId: string) {
  return await prisma.userSetting.update({
    where: { userId },
    data: {
      theme: 'dark',
      language: 'zh',
      emailNotifications: true,
      defaultImageStyle: null,
      defaultAspectRatio: null
    }
  });
} 