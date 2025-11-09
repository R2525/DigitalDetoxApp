import { Button } from './ui/button';
import { Brain } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Android-style top spacing */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-12">
          {/* Android-style illustration container */}
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-primary rounded-full flex items-center justify-center bg-background">
              <Brain className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Android-style typography */}
          <div className="space-y-4">
            <h1 className="text-3xl font-medium text-foreground leading-tight px-4">
              Boost your focus with digital detox missions
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed px-8">
              Train your prefrontal cortex and improve concentration through guided digital detox sessions
            </p>
          </div>
        </div>

        {/* Android-style feature highlights */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">📱</span>
            </div>
            <p className="text-sm text-muted-foreground">Block distracting apps automatically</p>
          </div>
          <div className="flex items-center space-x-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">🧠</span>
            </div>
            <p className="text-sm text-muted-foreground">Track your focus improvement</p>
          </div>
          <div className="flex items-center space-x-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">⭐</span>
            </div>
            <p className="text-sm text-muted-foreground">Build healthy digital habits</p>
          </div>
        </div>
      </div>
      
      {/* Android-style bottom CTA area */}
      <div className="px-6 pb-8">
        <Button 
          onClick={onComplete}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-base font-medium shadow-lg"
          size="lg"
        >
          Get Started
        </Button>
        
        {/* Android-style secondary text */}
        <p className="text-xs text-muted-foreground text-center mt-4 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}