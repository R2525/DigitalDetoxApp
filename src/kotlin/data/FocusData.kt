package com.digitaldetox.data

/**
 * Data class for focus trend chart
 */
data class FocusDataPoint(
    val day: String,
    val focus: Float,
    val screenTime: Float
)

object FocusDataRepository {
    fun getWeeklyFocusData(): List<FocusDataPoint> = listOf(
        FocusDataPoint("Mon", 2f, 4.5f),
        FocusDataPoint("Tue", 3f, 3.8f),
        FocusDataPoint("Wed", 2f, 4.2f),
        FocusDataPoint("Thu", 4f, 2.5f),
        FocusDataPoint("Fri", 3f, 3.2f),
        FocusDataPoint("Sat", 4f, 2.8f),
        FocusDataPoint("Sun", 3f, 3.1f)
    )
}
