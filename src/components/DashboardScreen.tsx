import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Settings, Star, Clock, Shield, Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

interface DashboardScreenProps {
  onNavigateToMission: () => void;
}

const focusData = [
  { day: 'Mon', focus: 2, screenTime: 4.5 },
  { day: 'Tue', focus: 3, screenTime: 3.8 },
  { day: 'Wed', focus: 2, screenTime: 4.2 },
  { day: 'Thu', focus: 4, screenTime: 2.5 },
  { day: 'Fri', focus: 3, screenTime: 3.2 },
  { day: 'Sat', focus: 4, screenTime: 2.8 },
  { day: 'Sun', focus: 3, screenTime: 3.1 },
];

export function DashboardScreen({ onNavigateToMission }: DashboardScreenProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  // Header and summary state
  const [userName, setUserName] = useState('Siwoo');
  const [focusScore, setFocusScore] = useState<number>(3.0);
  const [screenTime, setScreenTime] = useState<string>('3h 15m');
  const [screenTimeChange, setScreenTimeChange] = useState<number>(-25);
  const [blockedAppsCount, setBlockedAppsCount] = useState<number>(4);
  const [missionDone, setMissionDone] = useState<number>(2);
  const [missionTotal, setMissionTotal] = useState<number>(2);
  const [missionStatus] = useState<'Complete' | 'In Progress' | 'Pending'>('Complete');

  // Feedback state
  const [improvementPercent, setImprovementPercent] = useState<number>(10);
  const filledStars = Math.round(focusScore);

  return (
    <div className="h-full overflow-y-auto">
      {/* Android-style app bar */}
      <div className="bg-card border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground text-base font-medium">
                SW
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-medium">Hi {userName}</p>
              <p className="text-sm text-muted-foreground">{today}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-6">
        {/* Android-style greeting card */}
        <Card className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium">Ready for focus training?</p>
              <p className="text-sm text-muted-foreground">Let's strengthen your prefrontal cortex</p>
            </div>
          </div>
        </Card>

        {/* Android-style metrics grid */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium px-1">Today's Progress</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Star className="w-5 h-5 text-primary" />
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= filledStars ? 'fill-current text-primary' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Focus Score</p>
                <p className="text-lg font-medium">{focusScore}/5</p>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-blue-600" />
                <Badge variant="secondary" className="text-xs">{screenTimeChange > 0 ? `+${screenTimeChange}%` : `${screenTimeChange}%`}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Screen Time</p>
                <p className="text-lg font-medium">{screenTime}</p>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Shield className="w-5 h-5 text-green-600" />
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blocked Apps</p>
                <p className="text-lg font-medium">{blockedAppsCount}</p>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Target className="w-5 h-5 text-orange-600" />
                <Badge className={`text-xs ${missionStatus === 'Complete' ? 'bg-green-100 text-green-800' : missionStatus === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {missionStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mission</p>
                <p className="text-lg font-medium">{missionDone}/{missionTotal}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Android-style chart card */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Focus Trend</h3>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={focusData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="focus" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: 'var(--color-primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              ?за Prefrontal focus improved by {improvementPercent}% this week
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" className="h-8 rounded-lg" onClick={() => console.log('View Brain Growth clicked')}>
                View Brain Growth
              </Button>
            </div>
            </p>
          </div>
        </Card>

        {/* Android-style FAB-like mission button */}
        <div className="pt-4">
          <Button 
            onClick={onNavigateToMission}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-base font-medium shadow-lg"
            size="lg"
          >
            <Target className="w-5 h-5 mr-3" />
            Start Today's Mission
          </Button>
        </div>
      </div>
    </div>
  );
}

function Brain({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6C14.2 6 16 7.8 16 10V14C16 16.2 14.2 18 12 18C9.8 18 8 16.2 8 14V10C8 7.8 9.8 6 12 6Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 10C6.9 10 6 10.9 6 12C6 13.1 6.9 14 8 14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 10C17.1 10 18 10.9 18 12C18 13.1 17.1 14 16 14" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

