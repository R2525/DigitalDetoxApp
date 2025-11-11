import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { ArrowLeft, Play, Pause, Youtube, Instagram, MoreVertical, Settings, Shield, Plus } from 'lucide-react';

interface MissionDetailScreenProps {
  onBack: () => void;
  onNavigateToBlockingSettings?: () => void;
}

export function MissionDetailScreen({ onBack, onNavigateToBlockingSettings }: MissionDetailScreenProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const totalTime = 7200;

  const [blockedApps, setBlockedApps] = useState([
    { name: 'YouTube', icon: Youtube, blocked: true, color: 'text-red-600', attempts: 0 },
    { name: 'Instagram', icon: Instagram, blocked: true, color: 'text-pink-600', attempts: 2 },
    { name: 'TikTok', icon: Play, blocked: true, color: 'text-black', attempts: 1 },
    { name: 'Facebook', icon: Play, blocked: false, color: 'text-blue-600', attempts: 0 },
  ]);

  const getTodayKey = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `digital-detox-blocked-${yyyy}${mm}${dd}`;
  };

  const incrementTodayBlockedSeconds = () => {
    try {
      const key = getTodayKey();
      const current = Number(localStorage.getItem(key) || '0');
      localStorage.setItem(key, String(current + 1));
    } catch (_e) {
      // ignore storage errors in demo environment
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time > 0) {
            // Count towards today's cumulative blocked time while mission runs
            incrementTodayBlockedSeconds();
            return time - 1;
          }
          return time;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((totalTime - timeRemaining) / totalTime) * 100;
  const activeBlockedApps = blockedApps.filter(app => app.blocked);

  const toggleAppBlock = (appName: string) => {
    setBlockedApps(prev => 
      prev.map(app => 
        app.name === appName ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  const simulateAppAttempt = (appName: string) => {
    setBlockedApps(prev => 
      prev.map(app => 
        app.name === appName ? { ...app, attempts: app.attempts + 1 } : app
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Android-style app bar */}
      <div className="bg-card border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-medium">Digital Detox Mission</h1>
              <p className="text-sm text-muted-foreground">
                {isActive ? 'Session Active' : 'Ready to Start'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Mission Status Card */}
        <Card className={`p-6 text-center space-y-6 transition-all ${
          isActive ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20' : ''
        }`}>
          <div className="space-y-2">
            <Badge variant={timeRemaining === 0 ? 'default' : isActive ? 'secondary' : 'outline'} className="text-xs px-3 py-1">
              {timeRemaining === 0 ? 'Mission Complete! 🎉' : isActive ? 'Mission Active' : 'Ready to Start'}
            </Badge>
            <h2 className="text-xl font-medium">Block {activeBlockedApps.length} apps for 2 hours</h2>
            <p className="text-sm text-muted-foreground">
              {activeBlockedApps.length > 0 
                ? `${activeBlockedApps.length} apps will be blocked during this session` 
                : 'Select apps to block in the settings below'
              }
            </p>
          </div>

          {/* Android-style circular timer */}
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
            <div 
              className="absolute inset-0 rounded-full border-8 border-primary transition-all duration-1000"
              style={{
                background: `conic-gradient(from 0deg, var(--color-primary) ${progressPercentage * 3.6}deg, transparent ${progressPercentage * 3.6}deg)`
              }}
            ></div>
            <div className="absolute inset-8 rounded-full bg-background flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-medium tracking-tight">
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round(progressPercentage)}% complete
                </p>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={() => setIsActive(!isActive)}
              className="flex-1 h-12 rounded-xl"
              disabled={timeRemaining === 0 || activeBlockedApps.length === 0}
              variant={isActive ? "outline" : "default"}
            >
              {timeRemaining === 0 ? '🎉 Mission Complete!' : isActive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Mission
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Mission
                </>
              )}
            </Button>
            
            {timeRemaining !== totalTime && (
              <Button
                onClick={() => {
                  setTimeRemaining(totalTime);
                  setIsActive(false);
                }}
                variant="outline"
                className="h-12 px-6 rounded-xl"
              >
                Reset
              </Button>
            )}
          </div>
        </Card>

        {/* App Blocking Settings */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">App Blocking Settings</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary"
                onClick={onNavigateToBlockingSettings}
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {blockedApps.map((app) => {
              const IconComponent = app.icon;
              return (
                <div key={app.name} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-muted rounded-xl flex items-center justify-center ${app.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{app.name}</p>
                        {isActive && app.blocked && app.attempts > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {app.attempts} blocked attempts
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {app.blocked 
                          ? (isActive ? 'Currently blocked' : 'Will be blocked during mission')
                          : 'Available during mission'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Switch 
                      checked={app.blocked} 
                      onCheckedChange={() => toggleAppBlock(app.name)}
                      disabled={isActive}
                    />
                  </div>
                </div>
              );
            })}

            {/* Add more apps button */}
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-xl border-dashed"
              onClick={onNavigateToBlockingSettings}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add More Apps to Block
            </Button>
          </div>

          {activeBlockedApps.length === 0 && (
            <div className="text-center py-6 space-y-2">
              <Shield className="w-8 h-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No apps selected for blocking
              </p>
              <p className="text-xs text-muted-foreground">
                Enable apps above or customize your blocking list
              </p>
            </div>
          )}
        </Card>

        {/* Mission Progress */}
        {isActive && (
          <Card className="p-4 space-y-4">
            <h3 className="text-base font-medium">Session Progress</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Time Elapsed</span>
                <span className="text-sm font-medium">{formatTime(totalTime - timeRemaining)}</span>
              </div>
              
              <Progress value={progressPercentage} className="w-full h-2" />
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-lg font-medium">{activeBlockedApps.reduce((sum, app) => sum + app.attempts, 0)}</p>
                  <p className="text-xs text-muted-foreground">Blocked Attempts</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-lg font-medium text-primary">{activeBlockedApps.length}</p>
                  <p className="text-xs text-muted-foreground">Apps Protected</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Simulate blocked attempts for demo */}
        {isActive && (
          <Card className="p-4 bg-muted/30 border-dashed border-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                  🔒
                </div>
                <h4 className="font-medium">Demo: Simulate App Attempts</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {activeBlockedApps.slice(0, 2).map((app) => (
                  <Button
                    key={app.name}
                    variant="outline"
                    size="sm"
                    onClick={() => simulateAppAttempt(app.name)}
                    className="text-xs"
                  >
                    Try {app.name}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Android-style tips card */}
        <Card className="p-4 bg-muted/30 border-dashed border-2">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                💡
              </div>
              <h4 className="font-medium">Focus Tips</h4>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Place your phone face down or in another room</p>
              <p>• Use the 25-minute Pomodoro technique for deep work</p>
              <p>• Reward yourself after completing the mission</p>
              <p>• Stay hydrated and take short breaks every hour</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
