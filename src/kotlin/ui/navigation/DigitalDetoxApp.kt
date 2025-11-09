package com.digitaldetox.ui.navigation

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.digitaldetox.ui.components.BottomNavigationBar
import com.digitaldetox.ui.screens.*
import com.digitaldetox.viewmodel.DigitalDetoxViewModel
import com.digitaldetox.viewmodel.Screen

@Composable
fun DigitalDetoxApp(
    viewModel: DigitalDetoxViewModel
) {
    val currentScreen by viewModel.currentScreen.collectAsState()
    val isOnboarded by viewModel.isOnboarded.collectAsState()
    
    val showBottomNav = currentScreen != Screen.Onboarding && 
                        currentScreen != Screen.BlockingSettings
    
    Scaffold(
        bottomBar = {
            if (showBottomNav) {
                BottomNavigationBar(
                    currentScreen = currentScreen,
                    onNavigate = { screen -> viewModel.navigateTo(screen) }
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(
                    bottom = if (showBottomNav) paddingValues.calculateBottomPadding() else 0.dp
                )
        ) {
            when (currentScreen) {
                is Screen.Onboarding -> {
                    OnboardingScreen(
                        onComplete = { viewModel.completeOnboarding() }
                    )
                }
                
                is Screen.Dashboard -> {
                    DashboardScreen(
                        onNavigateToMission = { viewModel.navigateTo(Screen.Mission) }
                    )
                }
                
                is Screen.Mission -> {
                    MissionDetailScreen(
                        viewModel = viewModel,
                        onBack = { viewModel.navigateTo(Screen.Dashboard) },
                        onNavigateToBlockingSettings = { 
                            viewModel.navigateTo(Screen.BlockingSettings) 
                        }
                    )
                }
                
                is Screen.Report -> {
                    ReportScreen()
                }
                
                is Screen.Settings -> {
                    SettingsScreen(
                        viewModel = viewModel,
                        onNavigateToBlockingSettings = { 
                            viewModel.navigateTo(Screen.BlockingSettings) 
                        }
                    )
                }
                
                is Screen.BlockingSettings -> {
                    BlockingSettingsScreen(
                        viewModel = viewModel,
                        onBack = { viewModel.navigateTo(Screen.Settings) }
                    )
                }
            }
        }
    }
}
