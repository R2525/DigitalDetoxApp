import { useState, useEffect } from "react";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { MissionDetailScreen } from "./components/MissionDetailScreen";
import { ReportScreen } from "./components/ReportScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { BlockingSettingsScreen } from "./components/BlockingSettingsScreen";
import { BottomNavigation } from "./components/BottomNavigation";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    | "onboarding"
    | "dashboard"
    | "mission"
    | "report"
    | "feedback"
    | "settings"
    | "blocking-settings"
  >("onboarding");
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem(
      "digital-detox-dark-mode",
    );
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldUseDarkMode = savedDarkMode
      ? savedDarkMode === "true"
      : systemPrefersDark;

    setIsDarkMode(shouldUseDarkMode);
  }, []);

  // Apply dark mode class to document and save to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem(
      "digital-detox-dark-mode",
      isDarkMode.toString(),
    );
  }, [isDarkMode]);

  // Listen for system color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const handleSystemThemeChange = (
      e: MediaQueryListEvent,
    ) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedPreference = localStorage.getItem(
        "digital-detox-dark-mode",
      );
      if (!savedPreference) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange,
    );
    return () =>
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleCompleteOnboarding = () => {
    setIsOnboarded(true);
    setCurrentScreen("dashboard");
  };

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-background">
        <OnboardingScreen
          onComplete={handleCompleteOnboarding}
        />
      </div>
    );
  }

  const showBottomNavigation =
    currentScreen !== "blocking-settings";

  return (
    <div className="h-screen bg-background flex flex-col transition-colors duration-300 fixed inset-0">
      {/* Android-style status bar area */}
      <div className="h-6 bg-background flex-shrink-0"></div>

      {/* Main content area with proper padding for bottom navigation */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="h-full overflow-y-auto"
          style={{
            paddingBottom: showBottomNavigation
              ? "80px"
              : "0px",
          }}
        >
          {currentScreen === "dashboard" && (
            <DashboardScreen
              onNavigateToMission={() =>
                setCurrentScreen("mission")
              }
            />
          )}
          {currentScreen === "mission" && (
            <MissionDetailScreen
              onBack={() => setCurrentScreen("dashboard")}
              onNavigateToBlockingSettings={() =>
                setCurrentScreen("blocking-settings")
              }
            />
          )}
          {currentScreen === "report" && <ReportScreen />}
          {currentScreen === "settings" && (
            <SettingsScreen
              onNavigateToBlockingSettings={() =>
                setCurrentScreen("blocking-settings")
              }
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          )}
          {currentScreen === "blocking-settings" && (
            <BlockingSettingsScreen
              onBack={() => setCurrentScreen("settings")}
            />
          )}
          {currentScreen === "feedback" && (
            <div className="flex items-center justify-center h-full px-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center transition-colors">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-medium">
                  Feedback Center
                </h3>
                <p className="text-muted-foreground">
                  Share your thoughts and suggestions
                </p>
                <div className="pt-4 space-y-2">
                  <button className="w-full p-3 text-left bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    📝 Report a bug
                  </button>
                  <button className="w-full p-3 text-left bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    💡 Suggest a feature
                  </button>
                  <button className="w-full p-3 text-left bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    ⭐ Rate the app
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom navigation */}
      {showBottomNavigation && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        </div>
      )}
    </div>
  );
}