package com.detox.app.overlay

import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.provider.Settings
import android.view.LayoutInflater
import android.view.WindowManager
import com.detox.app.R

class BlockOverlayService : Service() {
    companion object {
        private const val ACTION_SHOW = "com.detox.app.overlay.SHOW"
        private const val ACTION_HIDE = "com.detox.app.overlay.HIDE"

        fun show(context: Context, pkg: String) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context)) {
                // Missing permission; caller should have asked already
                return
            }
            val i = Intent(context, BlockOverlayService::class.java).apply { action = ACTION_SHOW }
            context.startService(i)
        }

        fun hide(context: Context) {
            val i = Intent(context, BlockOverlayService::class.java).apply { action = ACTION_HIDE }
            context.startService(i)
        }
    }

    private var windowManager: WindowManager? = null
    private var overlayView: android.view.View? = null

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_SHOW -> attachOverlay()
            ACTION_HIDE -> detachOverlay()
        }
        return START_STICKY
    }

    private fun attachOverlay() {
        if (overlayView != null) return
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        overlayView = inflater.inflate(R.layout.view_overlay_block, null)

        val type = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        else
            @Suppress("DEPRECATION") WindowManager.LayoutParams.TYPE_PHONE

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT,
            type,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                    WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT
        )

        windowManager?.addView(overlayView, params)
    }

    private fun detachOverlay() {
        overlayView?.let { v ->
            windowManager?.removeView(v)
        }
        overlayView = null
    }

    override fun onDestroy() {
        detachOverlay()
        super.onDestroy()
    }
}

