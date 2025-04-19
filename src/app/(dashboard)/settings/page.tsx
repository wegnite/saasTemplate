'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent, applyTabsListStyles, applyTabsTriggerStyles, applyTabsContentStyles } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, User, Bell, ShieldCheck, Monitor, Palette, Check } from 'lucide-react';

// 模拟用户设置数据
interface UserSettings {
  theme: string;
  language: string;
  emailNotifications: boolean;
  appNotifications: boolean;
  marketingEmails: boolean;
  defaultImageStyle: string;
  defaultAspectRatio: string;
  twoFactorAuth: boolean;
}

// 模拟获取用户设置
const fetchUserSettings = async (userId: string): Promise<UserSettings> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 返回模拟数据
  return {
    theme: 'dark',
    language: 'zh',
    emailNotifications: true,
    appNotifications: true,
    marketingEmails: false,
    defaultImageStyle: 'realistic',
    defaultAspectRatio: '1:1',
    twoFactorAuth: false
  };
};

// 模拟保存用户设置
const saveUserSettings = async (userId: string, settings: Partial<UserSettings>): Promise<boolean> => {
  // 模拟API延迟和成功响应
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export default function SettingsPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    const loadSettings = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await fetchUserSettings(user.id);
        setSettings(data);
      } catch (error) {
        console.error('加载设置失败:', error);
        toast({
          title: '加载设置失败',
          description: '无法加载您的设置，请稍后再试。',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadSettings();
  }, [user, toast]);
  
  const handleSaveSettings = async () => {
    if (!user || !settings) return;
    
    setSaving(true);
    try {
      await saveUserSettings(user.id, settings);
      toast({
        title: '设置已保存',
        description: '您的设置已成功更新。',
        variant: 'default',
      });
    } catch (error) {
      console.error('保存设置失败:', error);
      toast({
        title: '保存设置失败',
        description: '无法保存您的设置，请稍后再试。',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };
  
  const updateSettings = (key: keyof UserSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        <span className="ml-2">加载设置中...</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">设置</h1>
        <p className="text-gray-400">管理您的账户和偏好设置</p>
      </div>
      
      <div className="w-full">
        <Tabs defaultValue={activeTab}>
          <TabsList className={applyTabsListStyles("mb-6")}>
            <TabsTrigger value="profile" className={applyTabsTriggerStyles("gap-2")} onClick={() => setActiveTab('profile')}>
              <User className="h-4 w-4" /> 个人资料
            </TabsTrigger>
            <TabsTrigger value="appearance" className={applyTabsTriggerStyles("gap-2")} onClick={() => setActiveTab('appearance')}>
              <Palette className="h-4 w-4" /> 外观
            </TabsTrigger>
            <TabsTrigger value="notifications" className={applyTabsTriggerStyles("gap-2")} onClick={() => setActiveTab('notifications')}>
              <Bell className="h-4 w-4" /> 通知
            </TabsTrigger>
            <TabsTrigger value="defaults" className={applyTabsTriggerStyles("gap-2")} onClick={() => setActiveTab('defaults')}>
              <Monitor className="h-4 w-4" /> 默认设置
            </TabsTrigger>
            <TabsTrigger value="security" className={applyTabsTriggerStyles("gap-2")} onClick={() => setActiveTab('security')}>
              <ShieldCheck className="h-4 w-4" /> 安全
            </TabsTrigger>
          </TabsList>
          
          {/* 个人资料设置 */}
          <TabsContent value="profile" className={applyTabsContentStyles()}>
            <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">个人资料设置</h2>
              
              <div className="grid gap-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input 
                    id="name" 
                    value={user?.fullName || ''} 
                    disabled 
                    className="bg-gray-800/50"
                  />
                  <p className="text-xs text-gray-400">通过Clerk管理您的账户信息</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input 
                    id="email" 
                    value={user?.primaryEmailAddress?.emailAddress || ''} 
                    disabled 
                    className="bg-gray-800/50"
                  />
                </div>
                
                <div className="pt-4">
                  <Button onClick={() => window.open('/user/account', '_blank')}>
                    管理账户信息
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* 外观设置 */}
          <TabsContent value="appearance" className={applyTabsContentStyles()}>
            <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">外观设置</h2>
              
              <div className="grid gap-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="theme">主题</Label>
                  <Select 
                    value={settings?.theme} 
                    onValueChange={(value) => updateSettings('theme', value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="选择主题" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">浅色</SelectItem>
                      <SelectItem value="dark">深色</SelectItem>
                      <SelectItem value="system">跟随系统</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">语言</Label>
                  <Select 
                    value={settings?.language} 
                    onValueChange={(value) => updateSettings('language', value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* 通知设置 */}
          <TabsContent value="notifications" className={applyTabsContentStyles()}>
            <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">通知设置</h2>
              
              <div className="grid gap-6 max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">电子邮件通知</h3>
                    <p className="text-sm text-gray-400">接收任务完成和系统通知邮件</p>
                  </div>
                  <Switch 
                    checked={settings?.emailNotifications} 
                    onCheckedChange={(checked) => updateSettings('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">应用内通知</h3>
                    <p className="text-sm text-gray-400">接收应用内推送通知</p>
                  </div>
                  <Switch 
                    checked={settings?.appNotifications} 
                    onCheckedChange={(checked) => updateSettings('appNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">营销邮件</h3>
                    <p className="text-sm text-gray-400">接收新功能和促销信息</p>
                  </div>
                  <Switch 
                    checked={settings?.marketingEmails} 
                    onCheckedChange={(checked) => updateSettings('marketingEmails', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* 默认设置 */}
          <TabsContent value="defaults" className={applyTabsContentStyles()}>
            <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">默认设置</h2>
              
              <div className="grid gap-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="defaultImageStyle">默认图像风格</Label>
                  <Select 
                    value={settings?.defaultImageStyle} 
                    onValueChange={(value) => updateSettings('defaultImageStyle', value)}
                  >
                    <SelectTrigger id="defaultImageStyle">
                      <SelectValue placeholder="选择风格" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">写实</SelectItem>
                      <SelectItem value="anime">动漫</SelectItem>
                      <SelectItem value="cartoon">卡通</SelectItem>
                      <SelectItem value="3d-render">3D渲染</SelectItem>
                      <SelectItem value="pixel-art">像素艺术</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultAspectRatio">默认宽高比</Label>
                  <Select 
                    value={settings?.defaultAspectRatio} 
                    onValueChange={(value) => updateSettings('defaultAspectRatio', value)}
                  >
                    <SelectTrigger id="defaultAspectRatio">
                      <SelectValue placeholder="选择宽高比" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">1:1 (方形)</SelectItem>
                      <SelectItem value="16:9">16:9 (宽屏)</SelectItem>
                      <SelectItem value="9:16">9:16 (竖屏)</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                      <SelectItem value="3:4">3:4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* 安全设置 */}
          <TabsContent value="security" className={applyTabsContentStyles()}>
            <Card className="p-6 border border-gray-700 bg-black/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">安全设置</h2>
              
              <div className="grid gap-6 max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">两步验证</h3>
                    <p className="text-sm text-gray-400">使用两步验证提高账户安全性</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-2">通过Clerk管理</span>
                    <Switch disabled checked={settings?.twoFactorAuth} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button onClick={() => window.open('/user/security', '_blank')} variant="outline">
                    管理安全设置
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-8 flex items-center justify-end gap-4">
        <Button variant="outline" disabled={saving}>
          重置设置
        </Button>
        <Button onClick={handleSaveSettings} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              保存设置
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 