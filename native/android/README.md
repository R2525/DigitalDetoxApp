Digital Detox Native Android (Kotlin) MVP
=========================================

What’s included
- Foreground detection via AccessibilityService
- Full-screen overlay blocker service
- UsageStats fallback detector (utility)
- Minimal UI to request permissions
- Build files for Android Studio import

Open & run
1) Open `native/android` in Android Studio (Gradle wrapper will be created automatically if missing).
2) Create an emulator (AVD, Play image) and run the `app` configuration.
3) In the app, grant permissions:
   - Usage Access (opens Settings)
   - Overlay (Manage Overlay permission)
   - Enable Accessibility for "Digital Detox" service
4) Open a blocked app (e.g., YouTube/Instagram). You should see the overlay.

Notes
- Block list is hardcoded in `com.detox.app.access.BlockList`.
- Overlay permission must be granted in Settings; Accessibility must be enabled by the user.
- For production, persist block list, add schedules, PIN/unlock, and better UI.

