package com.detox.app.ui

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import androidx.activity.ComponentActivity
import com.detox.app.R
import com.detox.app.overlay.BlockOverlayService

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.view_overlay_block) // reuse simple layout to keep stub minimal

        // Add minimal buttons programmatically (layout is reused just to avoid more XML)
        // In a real app, create a proper activity layout.
        val root = findViewById<android.widget.FrameLayout>(R.id.block_root)

        fun makeButton(text: String, onClick: () -> Unit): Button {
            return Button(this).apply {
                this.text = text
                setOnClickListener { onClick() }
            }
        }

        root.addView(makeButton(getString(R.string.btn_request_usage)) {
            startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))
        })

        root.addView(makeButton(getString(R.string.btn_request_overlay)) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val intent = Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:$packageName")
                )
                startActivity(intent)
            }
        })

        root.addView(makeButton(getString(R.string.btn_open_accessibility)) {
            startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
        })

        root.addView(makeButton(getString(R.string.btn_test_overlay)) {
            BlockOverlayService.show(this, "test.package")
        })
    }
}

