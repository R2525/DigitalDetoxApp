package com.detox.app.access

import android.accessibilityservice.AccessibilityService
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import com.detox.app.overlay.BlockOverlayService

object BlockList {
    // Hardcoded block list for MVP; replace with persisted settings
    private val packages = setOf(
        "com.google.android.youtube",
        "com.instagram.android",
        "com.ss.android.ugc.trill", // TikTok
        "com.facebook.katana"
    )
    fun contains(pkg: String): Boolean = packages.contains(pkg)
}

class BlockAccessibilityService : AccessibilityService() {
    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null) return
        if (event.eventType != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) return

        val pkg = event.packageName?.toString() ?: return
        try {
            if (BlockList.contains(pkg)) {
                BlockOverlayService.show(this, pkg)
            } else {
                BlockOverlayService.hide(this)
            }
        } catch (t: Throwable) {
            Log.e("BlockService", "Error handling event", t)
        }
    }

    override fun onInterrupt() {
        // No-op
    }
}

