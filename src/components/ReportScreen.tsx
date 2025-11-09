import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Clock, Flame, Shield, Brain, TrendingUp, BookOpen, Award, MoreVertical } from 'lucide-react';

export function ReportScreen() {
  return (
    <div className="h-full flex flex-col">
      {/* Android-style app bar */}
      <div className="bg-card border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-medium">Weekly Report</h1>
            <p className="text-sm text-muted-foreground">Your progress summary</p>
          </div>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Android-style hero card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= 4 ? 'fill-current text-primary' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <h3 className="text-xl font-medium">Excellent Progress!</h3>
              <p className="text-sm text-muted-foreground">You're building strong focus habits</p>
            </div>
          </div>
        </Card>

        {/* Android-style metrics section */}
        <div className="space-y-4">
          <h3 className="text-base font-medium px-1">This Week's Stats</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-blue-600" />
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  ↓ 25%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Screen Time</p>
                <p className="text-xl font-medium">2h 50m</p>
                <p className="text-xs text-muted-foreground">vs 3h 45m last week</p>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Flame className="w-5 h-5 text-orange-600" />
                <Badge className="text-xs bg-orange-100 text-orange-800">
                  Personal Best!
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-xl font-medium">3 days</p>
                <p className="text-xs text-muted-foreground">Keep it going!</p>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Shield className="w-5 h-5 text-green-600" />
                <Badge variant="outline" className="text-xs">
                  This week
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Apps Blocked</p>
                <p className="text-xl font-medium">15</p>
                <p className="text-xs text-muted-foreground">4 different apps</p>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                  ↑ 15%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Focus Score</p>
                <p className="text-xl font-medium">3.4/5</p>
                <p className="text-xs text-muted-foreground">Improving steadily</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Android-style brain health card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 border-2 border-primary rounded-xl flex items-center justify-center bg-primary/5">
              <Brain className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium">Brain Health Update</h3>
              <p className="text-sm text-muted-foreground">Prefrontal cortex analysis</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                🧠 Your focus is improving and your prefrontal cortex is strengthening. 
                Consistent digital detox sessions are rewiring your brain for better concentration.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-lg font-medium text-blue-600">+10%</p>
                <p className="text-xs text-blue-600">Attention Span</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-medium text-green-600">+15%</p>
                <p className="text-xs text-green-600">Focus Quality</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-lg font-medium text-purple-600">+8%</p>
                <p className="text-xs text-purple-600">Productivity</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Android-style action buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full h-12 rounded-xl justify-start">
            <BookOpen className="w-5 h-5 mr-3" />
            Review Detailed History
          </Button>
          
          <Button variant="outline" className="w-full h-12 rounded-xl justify-start">
            <Brain className="w-5 h-5 mr-3" />
            Focus Training Tips
          </Button>
        </div>

        {/* Android-style achievement card */}
        <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-amber-900">Week 1 Champion!</h4>
              <p className="text-sm text-amber-700">
                Congratulations on completing your first week of digital detox training.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}