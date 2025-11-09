package com.digitaldetox.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.core.view.WindowCompat
import androidx.lifecycle.viewmodel.compose.viewModel
import com.digitaldetox.ui.navigation.DigitalDetoxApp
import com.digitaldetox.ui.theme.DigitalDetoxTheme
import com.digitaldetox.viewmodel.DigitalDetoxViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Enable edge-to-edge display
        enableEdgeToEdge()
        WindowCompat.setDecorFitsSystemWindows(window, false)
        
        setContent {
            val viewModel: DigitalDetoxViewModel = viewModel()
            
            // Initialize ViewModel with context
            LaunchedEffect(Unit) {
                viewModel.initialize(applicationContext)
            }
            
            val isDarkMode by viewModel.isDarkMode.collectAsState()
            
            DigitalDetoxTheme(
                darkTheme = isDarkMode
            ) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    DigitalDetoxApp(viewModel = viewModel)
                }
            }
        }
    }
}
