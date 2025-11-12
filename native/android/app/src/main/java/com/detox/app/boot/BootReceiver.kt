package com.detox.app.boot

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        Log.i("BootReceiver", "Device booted - ensure services/permissions are configured")
        // In a full app, we might re-schedule monitors or show a notification to reopen the app.
    }
}

