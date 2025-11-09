import { Button } from './ui/button';
import { LayoutDashboard, Target, BarChart3, MessageSquare, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: 'dashboard' | 'mission' | 'report' | 'feedback' | 'settings') => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'report', label: 'Reports', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="bg-card/95 backdrop-blur-md border-t border-border/50 shadow-lg transition-colors">
      {/* Safe area padding for devices with home indicators */}
      <div className="flex justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-3 px-4 min-w-0 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'text-primary bg-primary/10 shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
              <span className={`text-xs leading-none ${isActive ? 'font-medium' : 'font-normal'} transition-all duration-200`}>
                {item.label}
              </span>
              {/* Android-style active indicator */}
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full mt-1 animate-in fade-in duration-200"></div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}