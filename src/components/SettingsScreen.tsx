import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Moon, 
  Sun,
  Vibrate, 
  Clock,
  Youtube, 
  Instagram, 
  MessageCircle,
  Play,
  Camera,
  Music,
  ShoppingBag,
  Gamepad2,
  ChevronRight,
  MoreVertical,
  Settings2
} from 'lucide-react';

interface SettingsScreenProps {
  onBack?: () => void;
  onNavigateToBlockingSettings?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

interface App {
  id: string;
  name: string;
  icon: any;
  color: string;
  category: string;
  isBlocked: boolean;
  usage: string;
}

export function SettingsScreen({ 
  onBack, 
  onNavigateToBlockingSettings,
  isDarkMode = false,
  onToggleDarkMode
}: SettingsScreenProps) {
  const [apps, setApps] = useState<App[]>([
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'text-red-600',
      category: 'Social',
      isBlocked: true,
      usage: '2h 30m today'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      category: 'Social',
      isBlocked: true,
      usage: '1h 45m today'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Play,
      color: 'text-black dark:text-white',
      category: 'Entertainment',
      isBlocked: true,
      usage: '1h 20m today'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      category: 'Communication',
      isBlocked: false,
      usage: '45m today'
    }
  ]);

  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [autoBlock, setAutoBlock] = useState(true);

  const toggleAppBlock = (appId: string) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === appId ? { ...app, isBlocked: !app.isBlocked } : app
      )
    );
  };

  const blockedAppsCount = apps.filter(app => app.isBlocked).length;

  return (
    <div className="h-full flex flex-col">
      {/* Android-style app bar */}
      <div className="bg-card border-b border-border/50 transition-colors">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-lg font-medium">Settings</h1>
              <p className="text-sm text-muted-foreground">Customize your digital detox</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Blocked Apps Summary */}
        <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-medium">App Blocking</h3>
                <p className="text-sm text-muted-foreground">
                  {blockedAppsCount} apps currently blocked
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {blockedAppsCount} Active
              </Badge>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onNavigateToBlockingSettings}
                className="w-8 h-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="p-4 space-y-4 transition-colors">
          <h3 className="text-base font-medium">Appearance</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center transition-colors">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 text-white" />
                  ) : (
                    <Sun className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Dark mode</p>
                  <p className="text-sm text-muted-foreground">
                    {isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                  </p>
                </div>
              </div>
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={onToggleDarkMode}
              />
            </div>
          </div>
        </Card>

        {/* Quick Settings */}
        <Card className="p-4 space-y-4 transition-colors">
          <h3 className="text-base font-medium">Quick Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Auto-block during missions</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically block selected apps
                  </p>
                </div>
              </div>
              <Switch 
                checked={autoBlock} 
                onCheckedChange={setAutoBlock}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Mission notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get reminders and updates
                  </p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Vibrate className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">Vibration feedback</p>
                  <p className="text-sm text-muted-foreground">
                    Haptic feedback for interactions
                  </p>
                </div>
              </div>
              <Switch 
                checked={vibration} 
                onCheckedChange={setVibration}
              />
            </div>
          </div>
        </Card>

        {/* Enhanced App Blocking Section */}
        <Card className="p-4 space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">App Blocking Management</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={onNavigateToBlockingSettings}
            >
              <Settings2 className="w-4 h-4 mr-2" />
              Manage All Apps
            </Button>
          </div>

          {/* Quick preview of blocked apps */}
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">Recently blocked apps:</div>
            {apps.filter(app => app.isBlocked).slice(0, 3).map((app) => {
              const IconComponent = app.icon;
              return (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-muted rounded-lg flex items-center justify-center ${app.color} transition-colors`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.usage}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Blocked
                  </Badge>
                </div>
              );
            })}
            
            {blockedAppsCount > 3 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full h-8 text-xs text-muted-foreground"
                onClick={onNavigateToBlockingSettings}
              >
                +{blockedAppsCount - 3} more blocked apps
              </Button>
            )}
            
            {blockedAppsCount === 0 && (
              <div className="text-center py-4 space-y-2">
                <Shield className="w-8 h-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No apps blocked</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onNavigateToBlockingSettings}
                >
                  Select Apps to Block
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Mission Settings */}
        <Card className="p-4 space-y-4 transition-colors">
          <h3 className="text-base font-medium">Mission Settings</h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-between h-auto p-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Default mission duration</p>
                  <p className="text-sm text-muted-foreground">Currently: 2 hours</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Button>

            <Button variant="ghost" className="w-full justify-between h-auto p-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium">Reminder frequency</p>
                  <p className="text-sm text-muted-foreground">Every 30 minutes</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Button>

            <Button variant="ghost" className="w-full justify-between h-auto p-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <p className="font-medium">Break app blocks</p>
                  <p className="text-sm text-muted-foreground">Require confirmation</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </Card>

        {/* Account & Support */}
        <Card className="p-4 space-y-3 transition-colors">
          <h3 className="text-base font-medium">Account & Support</h3>
          
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/30 transition-colors">
              Export usage data
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/30 transition-colors">
              Privacy settings
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-muted/30 transition-colors">
              Help & feedback
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-3 text-destructive hover:bg-destructive/10 transition-colors">
              Reset all settings
            </Button>
          </div>
        </Card>

        {/* Theme Preview Card */}
        <Card className="p-4 bg-gradient-to-br from-primary/5 via-muted/30 to-accent/20 border-dashed border-2 transition-colors">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              {isDarkMode ? (
                <Moon className="w-4 h-4 text-white" />
              ) : (
                <Sun className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h4 className="font-medium">
                {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {isDarkMode 
                  ? 'Easier on the eyes in low light conditions' 
                  : 'Clear visibility in bright environments'
                }
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onToggleDarkMode}
              className="transition-colors"
            >
              Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <div className="text-center space-y-2 py-4">
          <p className="text-sm text-muted-foreground">Digital Detox App</p>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}