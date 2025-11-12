package com.detox.app.usage

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context

class UsageTopAppDetector(private val context: Context) {
    fun getTopAppLastSeconds(windowSeconds: Int = 5): String? {
        val usm = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val end = System.currentTimeMillis()
        val start = end - windowSeconds * 1000
        val events = usm.queryEvents(start, end)
        var lastPkg: String? = null
        val e = UsageEvents.Event()
        while (events.hasNextEvent()) {
            events.getNextEvent(e)
            if (e.eventType == UsageEvents.Event.ACTIVITY_RESUMED ||
                e.eventType == UsageEvents.Event.ACTIVITY_PAUSED ||
                e.eventType == UsageEvents.Event.ACTIVITY_STOPPED ||
                e.eventType == UsageEvents.Event.ACTIVITY_STARTED ||
                e.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND
            ) {
                lastPkg = e.packageName
            }
        }
        return lastPkg
    }
}

