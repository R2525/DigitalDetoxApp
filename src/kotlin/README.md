# Digital Detox - Kotlin/Jetpack Compose Conversion

This is the Kotlin/Jetpack Compose version of the Digital Detox mobile app, converted from the React prototype.

## 📁 Project Structure

```
kotlin/
├── data/                           # Data models and repositories
│   ├── App.kt                     # App data class and repository
│   └── FocusData.kt               # Focus data models
├── viewmodel/                      # ViewModels
│   └── DigitalDetoxViewModel.kt   # Main ViewModel with state management
├── ui/                            # UI layer
│   ├── MainActivity.kt            # Main activity entry point
│   ├── components/                # Reusable UI components
│   │   └── BottomNavigationBar.kt
│   ├── navigation/                # Navigation setup
│   │   └── DigitalDetoxApp.kt
│   ├── screens/                   # Screen composables
│   │   ├── OnboardingScreen.kt
│   │   ├── DashboardScreen.kt
│   │   ├── MissionDetailScreen.kt
│   │   ├── ReportScreen.kt
│   │   ├── SettingsScreen.kt
│   │   └── BlockingSettingsScreen.kt
│   └── theme/                     # Material Design 3 theme
│       ├── Color.kt
│       ├── Theme.kt
│       └── Type.kt
├── AndroidManifest.xml            # Android manifest
├── build.gradle.kts               # Gradle build configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Android Studio Hedgehog (2023.1.1) or later
- JDK 17
- Android SDK with API 26+ (Minimum) and API 34 (Target)

### Setup Instructions

1. **Create a new Android Project** in Android Studio:
   - Select "Empty Activity"
   - Name: "DigitalDetox"
   - Package name: "com.digitaldetox"
   - Minimum SDK: API 26 (Android 8.0)
   - Build configuration language: Kotlin DSL

2. **Copy the files** from this `/kotlin` directory to your project:
   ```
   kotlin/data/              → app/src/main/java/com/digitaldetox/data/
   kotlin/viewmodel/         → app/src/main/java/com/digitaldetox/viewmodel/
   kotlin/ui/                → app/src/main/java/com/digitaldetox/ui/
   kotlin/AndroidManifest.xml → app/src/main/AndroidManifest.xml
   kotlin/build.gradle.kts   → app/build.gradle.kts
   ```

3. **Sync Gradle** files in Android Studio

4. **Run the app** on an emulator or physical device

## 🎨 Features Implemented

### Screens (without Feedback tab as requested)
- ✅ **Onboarding Screen** - Welcome screen with brain illustration and features
- ✅ **Dashboard Screen** - Focus scores, screen time tracking, and mission button
- ✅ **Mission Detail Screen** - Timer, blocked apps, and mission controls
- ✅ **Report Screen** - Weekly progress and brain health metrics
- ✅ **Settings Screen** - App settings, dark mode, and preferences
- ✅ **Blocking Settings Screen** - Comprehensive app blocking management

### Functionality
- ✅ Dark mode with persistent storage (SharedPreferences)
- ✅ Mission timer with pause/resume/reset
- ✅ App blocking toggle system
- ✅ Category-based app grouping
- ✅ Search functionality in blocking settings
- ✅ Bottom navigation bar
- ✅ Material Design 3 theming
- ✅ Edge-to-edge UI
- ✅ Proper state management with ViewModel
- ✅ Animated transitions and UI feedback

## 🏗️ Architecture

### MVVM Pattern
- **Model**: Data classes in `/data` package
- **View**: Composable functions in `/ui/screens`
- **ViewModel**: `DigitalDetoxViewModel` for state management

### State Management
- Uses Kotlin Flow's `StateFlow` for reactive state
- SharedPreferences for persistent storage
- Proper lifecycle handling with `collectAsState()`

### Material Design 3
- Dynamic color support (Android 12+)
- Custom light and dark themes
- Proper elevation and surface variants
- Material You guidelines

## 🔧 Key Components

### DigitalDetoxViewModel
Main ViewModel managing:
- Screen navigation state
- Dark mode preferences
- Mission timer logic
- App blocking state
- Settings preferences

```kotlin
// Usage example
val viewModel: DigitalDetoxViewModel = viewModel()
val isDarkMode by viewModel.isDarkMode.collectAsState()
viewModel.toggleDarkMode()
```

### Navigation
Simple screen-based navigation without Navigation Compose:
```kotlin
sealed class Screen {
    object Onboarding : Screen()
    object Dashboard : Screen()
    object Mission : Screen()
    object Report : Screen()
    object Settings : Screen()
    object BlockingSettings : Screen()
}
```

### Bottom Navigation
Custom bottom navigation bar with:
- 4 tabs (Home, Mission, Reports, Settings)
- Active state indicators
- Smooth animations
- Material Design styling

## 🎯 Differences from React Version

### Removed Features
- ❌ Feedback tab (as requested by user)

### Architectural Differences
1. **State Management**: React hooks → Kotlin Flow StateFlow
2. **Storage**: localStorage → SharedPreferences
3. **Styling**: Tailwind CSS → Material Design 3 with Compose
4. **Navigation**: React state → Custom Screen sealed class
5. **Lifecycle**: React useEffect → Compose LaunchedEffect & lifecycle

### Android-Specific Additions
- Edge-to-edge display support
- System bars handling
- Material You dynamic colors
- Proper activity lifecycle management
- Permission system ready (for app blocking implementation)

## 🔐 App Blocking Implementation

The current implementation includes the UI and state management for app blocking, but actual app blocking requires:

1. **Accessibility Service** or **Device Admin** permissions
2. **UsageStatsManager** for tracking app usage
3. **Overlay windows** for blocking notifications
4. **Background service** for monitoring

### Next Steps for Production
```kotlin
// TODO: Implement AccessibilityService
class AppBlockingService : AccessibilityService() {
    // Block apps based on viewModel.getBlockedApps()
}

// TODO: Request permissions in MainActivity
// - PACKAGE_USAGE_STATS
// - SYSTEM_ALERT_WINDOW
// - BIND_ACCESSIBILITY_SERVICE
```

## 🎨 Customization

### Colors
Edit `ui/theme/Color.kt` to customize the color scheme:
```kotlin
val md_theme_light_primary = Color(0xFF6750A4) // Change this
```

### Typography
Edit `ui/theme/Type.kt` to customize fonts:
```kotlin
val Typography = Typography(
    bodyLarge = TextStyle(
        fontFamily = YourCustomFont, // Add custom fonts
        fontSize = 16.sp
    )
)
```

### Theme
Edit `ui/theme/Theme.kt` to enable/disable dynamic colors:
```kotlin
DigitalDetoxTheme(
    darkTheme = isDarkMode,
    dynamicColor = true // Set to false for custom colors
)
```

## 📱 Testing

### Manual Testing Checklist
- [ ] Onboarding flow completes successfully
- [ ] Dark mode toggles and persists
- [ ] Mission timer starts, pauses, and resets
- [ ] App blocking toggles work
- [ ] Search filters apps correctly
- [ ] Bottom navigation switches screens
- [ ] Settings save and persist

### Unit Test Examples
```kotlin
@Test
fun `test mission timer countdown`() {
    val viewModel = DigitalDetoxViewModel()
    viewModel.startMission()
    // Assert timer logic
}
```

## 🚧 Known Limitations

1. **Chart Library**: The focus trend chart is a placeholder. Implement using:
   - [MPAndroidChart](https://github.com/PhilJay/MPAndroidChart)
   - [Vico](https://github.com/patrykandpatrick/vico)
   - Custom Canvas drawing

2. **Actual App Blocking**: UI only - requires system permissions and services

3. **App Icons**: Using first letter placeholders - add real app icons or use package manager

4. **Animations**: Basic animations - can be enhanced with Motion/Framer-like libraries

## 📚 Dependencies

All dependencies are in `build.gradle.kts`:
- Jetpack Compose BOM 2023.10.01
- Material 3
- Kotlin Coroutines
- ViewModel Compose
- Lifecycle Runtime Compose

## 🤝 Contributing

To extend this app:

1. Add new screens in `/ui/screens`
2. Add new data models in `/data`
3. Update ViewModel for new state
4. Add navigation in `DigitalDetoxApp.kt`

## 📄 License

This is a prototype/MVP. Add your license here.

## 👨‍💻 Original Design

Converted from React/Tailwind prototype to native Android with Jetpack Compose and Material Design 3 guidelines.

---

**Note**: This is an MVP implementation. For production use, implement proper error handling, testing, analytics, and the actual app blocking functionality with appropriate system permissions.
