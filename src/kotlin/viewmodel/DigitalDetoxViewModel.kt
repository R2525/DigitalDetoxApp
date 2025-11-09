package com.digitaldetox.viewmodel

import android.content.Context
import android.content.SharedPreferences
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.digitaldetox.data.App
import com.digitaldetox.data.AppRepository
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Main ViewModel for Digital Detox App
 */
class DigitalDetoxViewModel : ViewModel() {
    
    // Screen navigation state
    private val _currentScreen = MutableStateFlow<Screen>(Screen.Onboarding)
    val currentScreen: StateFlow<Screen> = _currentScreen.asStateFlow()
    
    // Onboarding state
    private val _isOnboarded = MutableStateFlow(false)
    val isOnboarded: StateFlow<Boolean> = _isOnboarded.asStateFlow()
    
    // Dark mode state
    private val _isDarkMode = MutableStateFlow(false)
    val isDarkMode: StateFlow<Boolean> = _isDarkMode.asStateFlow()
    
    // Mission state
    private val _isMissionActive = MutableStateFlow(false)
    val isMissionActive: StateFlow<Boolean> = _isMissionActive.asStateFlow()
    
    private val _timeRemaining = MutableStateFlow(7200) // 2 hours in seconds
    val timeRemaining: StateFlow<Int> = _timeRemaining.asStateFlow()
    
    private val totalTime = 7200
    
    // Apps state
    private val _apps = MutableStateFlow(AppRepository.getSampleApps())
    val apps: StateFlow<List<App>> = _apps.asStateFlow()
    
    // Settings state
    var notifications by mutableStateOf(true)
        private set
    var vibration by mutableStateOf(true)
        private set
    var autoBlock by mutableStateOf(true)
        private set
    
    // SharedPreferences for persistence
    private var sharedPrefs: SharedPreferences? = null
    
    fun initialize(context: Context) {
        sharedPrefs = context.getSharedPreferences("digital_detox_prefs", Context.MODE_PRIVATE)
        loadPreferences()
    }
    
    private fun loadPreferences() {
        sharedPrefs?.let { prefs ->
            _isDarkMode.value = prefs.getBoolean("dark_mode", false)
            _isOnboarded.value = prefs.getBoolean("is_onboarded", false)
            notifications = prefs.getBoolean("notifications", true)
            vibration = prefs.getBoolean("vibration", true)
            autoBlock = prefs.getBoolean("auto_block", true)
        }
    }
    
    fun completeOnboarding() {
        _isOnboarded.value = true
        _currentScreen.value = Screen.Dashboard
        sharedPrefs?.edit()?.putBoolean("is_onboarded", true)?.apply()
    }
    
    fun navigateTo(screen: Screen) {
        _currentScreen.value = screen
    }
    
    fun toggleDarkMode() {
        _isDarkMode.value = !_isDarkMode.value
        sharedPrefs?.edit()?.putBoolean("dark_mode", _isDarkMode.value)?.apply()
    }
    
    fun toggleAppBlock(appId: String) {
        _apps.value = _apps.value.map { app ->
            if (app.id == appId) app.copy(isBlocked = !app.isBlocked) else app
        }
    }
    
    fun toggleAllApps(block: Boolean) {
        _apps.value = _apps.value.map { it.copy(isBlocked = block) }
    }
    
    fun startMission() {
        if (getBlockedApps().isEmpty()) return
        _isMissionActive.value = true
        startTimer()
    }
    
    fun pauseMission() {
        _isMissionActive.value = false
    }
    
    fun resetMission() {
        _isMissionActive.value = false
        _timeRemaining.value = totalTime
    }
    
    private fun startTimer() {
        viewModelScope.launch {
            while (_isMissionActive.value && _timeRemaining.value > 0) {
                delay(1000)
                _timeRemaining.value -= 1
            }
            if (_timeRemaining.value == 0) {
                _isMissionActive.value = false
            }
        }
    }
    
    fun getBlockedApps(): List<App> = _apps.value.filter { it.isBlocked }
    
    fun getProgressPercentage(): Float {
        return ((totalTime - _timeRemaining.value).toFloat() / totalTime) * 100f
    }
    
    fun toggleNotifications() {
        notifications = !notifications
        sharedPrefs?.edit()?.putBoolean("notifications", notifications)?.apply()
    }
    
    fun toggleVibration() {
        vibration = !vibration
        sharedPrefs?.edit()?.putBoolean("vibration", vibration)?.apply()
    }
    
    fun toggleAutoBlock() {
        autoBlock = !autoBlock
        sharedPrefs?.edit()?.putBoolean("auto_block", autoBlock)?.apply()
    }
    
    fun simulateAppAttempt(appId: String) {
        _apps.value = _apps.value.map { app ->
            if (app.id == appId) app.copy(attempts = app.attempts + 1) else app
        }
    }
}

sealed class Screen {
    object Onboarding : Screen()
    object Dashboard : Screen()
    object Mission : Screen()
    object Report : Screen()
    object Settings : Screen()
    object BlockingSettings : Screen()
}
