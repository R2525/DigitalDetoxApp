package com.digitaldetox.data

import androidx.compose.ui.graphics.Color

/**
 * Data class representing an application that can be blocked
 */
data class App(
    val id: String,
    val name: String,
    val packageName: String, // Android package name for actual blocking
    val color: Color,
    val category: AppCategory,
    var isBlocked: Boolean = false,
    val usage: String = "",
    val description: String = "",
    val attempts: Int = 0
)

enum class AppCategory {
    SOCIAL_MEDIA,
    ENTERTAINMENT,
    COMMUNICATION,
    SHOPPING,
    GAMING,
    PRODUCTIVITY,
    NAVIGATION
}

/**
 * Sample apps for the MVP
 */
object AppRepository {
    fun getSampleApps(): List<App> = listOf(
        App(
            id = "youtube",
            name = "YouTube",
            packageName = "com.google.android.youtube",
            color = Color(0xFFFF0000),
            category = AppCategory.ENTERTAINMENT,
            isBlocked = true,
            usage = "2h 30m today",
            description = "Video streaming platform"
        ),
        App(
            id = "instagram",
            name = "Instagram",
            packageName = "com.instagram.android",
            color = Color(0xFFE4405F),
            category = AppCategory.SOCIAL_MEDIA,
            isBlocked = true,
            usage = "1h 45m today",
            description = "Photo and video sharing"
        ),
        App(
            id = "tiktok",
            name = "TikTok",
            packageName = "com.zhiliaoapp.musically",
            color = Color(0xFF000000),
            category = AppCategory.ENTERTAINMENT,
            isBlocked = true,
            usage = "1h 20m today",
            description = "Short video platform"
        ),
        App(
            id = "whatsapp",
            name = "WhatsApp",
            packageName = "com.whatsapp",
            color = Color(0xFF25D366),
            category = AppCategory.COMMUNICATION,
            isBlocked = false,
            usage = "45m today",
            description = "Messaging and calls"
        ),
        App(
            id = "snapchat",
            name = "Snapchat",
            packageName = "com.snapchat.android",
            color = Color(0xFFFFFC00),
            category = AppCategory.SOCIAL_MEDIA,
            isBlocked = false,
            usage = "30m today",
            description = "Multimedia messaging"
        ),
        App(
            id = "spotify",
            name = "Spotify",
            packageName = "com.spotify.music",
            color = Color(0xFF1DB954),
            category = AppCategory.ENTERTAINMENT,
            isBlocked = false,
            usage = "2h 15m today",
            description = "Music streaming service"
        ),
        App(
            id = "amazon",
            name = "Amazon",
            packageName = "com.amazon.mShop.android.shopping",
            color = Color(0xFFFF9900),
            category = AppCategory.SHOPPING,
            isBlocked = false,
            usage = "15m today",
            description = "Online shopping platform"
        ),
        App(
            id = "games",
            name = "Mobile Games",
            packageName = "com.games.*", // Wildcard for game category
            color = Color(0xFF9C27B0),
            category = AppCategory.GAMING,
            isBlocked = true,
            usage = "1h 10m today",
            description = "Various mobile games"
        ),
        App(
            id = "chrome",
            name = "Chrome Browser",
            packageName = "com.android.chrome",
            color = Color(0xFF4285F4),
            category = AppCategory.PRODUCTIVITY,
            isBlocked = false,
            usage = "3h 5m today",
            description = "Web browser"
        ),
        App(
            id = "gmail",
            name = "Gmail",
            packageName = "com.google.android.gm",
            color = Color(0xFFEA4335),
            category = AppCategory.PRODUCTIVITY,
            isBlocked = false,
            usage = "25m today",
            description = "Email client"
        ),
        App(
            id = "calendar",
            name = "Calendar",
            packageName = "com.google.android.calendar",
            color = Color(0xFF4285F4),
            category = AppCategory.PRODUCTIVITY,
            isBlocked = false,
            usage = "10m today",
            description = "Schedule management"
        ),
        App(
            id = "maps",
            name = "Google Maps",
            packageName = "com.google.android.apps.maps",
            color = Color(0xFF34A853),
            category = AppCategory.NAVIGATION,
            isBlocked = false,
            usage = "20m today",
            description = "Navigation and maps"
        )
    )
}
