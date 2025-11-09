import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Search,
  CheckCircle2,
  Shield,
  Youtube, 
  Instagram, 
  MessageCircle,
  Play,
  Camera,
  Music,
  ShoppingBag,
  Gamepad2,
  Chrome,
  Mail,
  Calendar,
  Map
} from 'lucide-react';

interface BlockingSettingsScreenProps {
  onBack: () => void;
}

interface App {
  id: string;
  name: string;
  icon: any;
  color: string;
  category: string;
  isBlocked: boolean;
  usage: string;
  description: string;
}

export function BlockingSettingsScreen({ onBack }: BlockingSettingsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [apps, setApps] = useState<App[]>([
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'text-red-600',
      category: 'Entertainment',
      isBlocked: true,
      usage: '2h 30m today',
      description: 'Video streaming platform'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      category: 'Social Media',
      isBlocked: true,
      usage: '1h 45m today',
      description: 'Photo and video sharing'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Play,
      color: 'text-black dark:text-white',
      category: 'Entertainment',
      isBlocked: true,
      usage: '1h 20m today',
      description: 'Short video platform'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      category: 'Communication',
      isBlocked: false,
      usage: '45m today',
      description: 'Messaging and calls'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: Camera,
      color: 'text-yellow-500',
      category: 'Social Media',
      isBlocked: false,
      usage: '30m today',
      description: 'Multimedia messaging'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: Music,
      color: 'text-green-500',
      category: 'Entertainment',
      isBlocked: false,
      usage: '2h 15m today',
      description: 'Music streaming service'
    },
    {
      id: 'amazon',
      name: 'Amazon',
      icon: ShoppingBag,
      color: 'text-orange-600',
      category: 'Shopping',
      isBlocked: false,
      usage: '15m today',
      description: 'Online shopping platform'
    },
    {
      id: 'games',
      name: 'Mobile Games',
      icon: Gamepad2,
      color: 'text-purple-600',
      category: 'Gaming',
      isBlocked: true,
      usage: '1h 10m today',
      description: 'Various mobile games'
    },
    {
      id: 'chrome',
      name: 'Chrome Browser',
      icon: Chrome,
      color: 'text-blue-600',
      category: 'Productivity',
      isBlocked: false,
      usage: '3h 5m today',
      description: 'Web browser'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      color: 'text-red-500',
      category: 'Productivity',
      isBlocked: false,
      usage: '25m today',
      description: 'Email client'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: Calendar,
      color: 'text-blue-500',
      category: 'Productivity',
      isBlocked: false,
      usage: '10m today',
      description: 'Schedule management'
    },
    {
      id: 'maps',
      name: 'Google Maps',
      icon: Map,
      color: 'text-green-700',
      category: 'Navigation',
      isBlocked: false,
      usage: '20m today',
      description: 'Navigation and maps'
    }
  ]);

  // Filter apps based on search query
  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    return apps.filter(app => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apps, searchQuery]);

  // Group apps by category
  const groupedApps = useMemo(() => {
    const groups: { [key: string]: App[] } = {};
    filteredApps.forEach(app => {
      if (!groups[app.category]) {
        groups[app.category] = [];
      }
      groups[app.category].push(app);
    });
    return groups;
  }, [filteredApps]);

  const blockedAppsCount = apps.filter(app => app.isBlocked).length;
  const totalAppsCount = apps.length;
  const allAppsBlocked = blockedAppsCount === totalAppsCount;
  const someAppsBlocked = blockedAppsCount > 0 && blockedAppsCount < totalAppsCount;

  const toggleAppBlock = (appId: string) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === appId ? { ...app, isBlocked: !app.isBlocked } : app
      )
    );
  };

  const toggleAllApps = () => {
    const shouldBlockAll = !allAppsBlocked;
    setApps(prevApps =>
      prevApps.map(app => ({ ...app, isBlocked: shouldBlockAll }))
    );
  };

  const toggleCategoryApps = (category: string) => {
    const categoryApps = apps.filter(app => app.category === category);
    const allCategoryBlocked = categoryApps.every(app => app.isBlocked);
    
    setApps(prevApps =>
      prevApps.map(app =>
        app.category === category ? { ...app, isBlocked: !allCategoryBlocked } : app
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Android-style app bar */}
      <div className="bg-card border-b border-border/50 transition-colors">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-medium">App Blocking</h1>
              <p className="text-sm text-muted-foreground">
                {blockedAppsCount} of {totalAppsCount} apps selected
              </p>
            </div>
          </div>
          <Badge 
            variant={blockedAppsCount > 0 ? "default" : "outline"} 
            className="text-xs"
          >
            {blockedAppsCount} Selected
          </Badge>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-input-background border-0 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Quick Actions */}
        <div className="px-4 py-4 space-y-4">
          {/* Select All Toggle */}
          <Card className="p-4 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center transition-colors">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {allAppsBlocked ? 'Unblock All Apps' : 'Block All Apps'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {allAppsBlocked 
                      ? 'Allow access to all applications' 
                      : 'Block access to all applications during missions'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {someAppsBlocked && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
                <Switch 
                  checked={allAppsBlocked} 
                  onCheckedChange={toggleAllApps}
                />
              </div>
            </div>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center transition-colors">
              <p className="text-lg font-medium text-primary">{blockedAppsCount}</p>
              <p className="text-xs text-muted-foreground">Blocked</p>
            </Card>
            <Card className="p-3 text-center transition-colors">
              <p className="text-lg font-medium text-muted-foreground">{totalAppsCount - blockedAppsCount}</p>
              <p className="text-xs text-muted-foreground">Allowed</p>
            </Card>
            <Card className="p-3 text-center transition-colors">
              <p className="text-lg font-medium text-green-600">{Object.keys(groupedApps).length}</p>
              <p className="text-xs text-muted-foreground">Categories</p>
            </Card>
          </div>
        </div>

        {/* Apps List by Category */}
        <div className="px-4 pb-6 space-y-6">
          {Object.entries(groupedApps).map(([category, categoryApps]) => {
            const categoryBlockedCount = categoryApps.filter(app => app.isBlocked).length;
            const allCategoryBlocked = categoryBlockedCount === categoryApps.length;
            const someCategoryBlocked = categoryBlockedCount > 0 && categoryBlockedCount < categoryApps.length;

            return (
              <Card key={category} className="p-4 space-y-4 transition-colors">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium">{category}</h3>
                    <Badge variant="outline" className="text-xs">
                      {categoryApps.length} apps
                    </Badge>
                    {categoryBlockedCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {categoryBlockedCount} blocked
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {someCategoryBlocked && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCategoryApps(category)}
                      className="text-xs h-8 px-3 hover:bg-muted/30 transition-colors"
                    >
                      {allCategoryBlocked ? 'Unblock All' : 'Block All'}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Apps in Category */}
                <div className="space-y-3">
                  {categoryApps.map((app) => {
                    const IconComponent = app.icon;
                    return (
                      <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={`w-12 h-12 bg-muted rounded-xl flex items-center justify-center ${app.color} flex-shrink-0 transition-colors`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium truncate">{app.name}</p>
                              {app.isBlocked && (
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{app.description}</p>
                            <p className="text-xs text-muted-foreground">{app.usage}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <Switch 
                            checked={app.isBlocked} 
                            onCheckedChange={() => toggleAppBlock(app.id)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}

          {filteredApps.length === 0 && (
            <Card className="p-8 text-center transition-colors">
              <div className="space-y-3">
                <Search className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="font-medium">No apps found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search query or check back later for more apps.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="hover:bg-muted/30 transition-colors"
                >
                  Clear Search
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="px-4 pb-6 pt-2">
          <Card className="p-4 bg-muted/30 border-dashed border-2 transition-colors">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium">Block Protection Active</h4>
                <p className="text-sm text-muted-foreground">
                  Selected apps will be blocked during your digital detox missions
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onBack}
                  className="flex-1 hover:bg-muted/30 transition-colors"
                >
                  Save & Continue
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setApps(prev => prev.map(app => ({ ...app, isBlocked: false })))}
                  className="hover:bg-muted/30 transition-colors"
                >
                  Reset All
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}