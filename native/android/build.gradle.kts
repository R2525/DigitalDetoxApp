// 파일 위치: DigitalDetoxApp/app/build.gradle.kts

// 'version'과 'apply false'를 반드시 제거해야 합니다.
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

// 아래 내용은 기존 파일의 내용을 그대로 사용합니다.
android {
    namespace = "com.digitaldetox"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.digitaldetox"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.3"
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // 이 부분은 기존 파일의 내용을 그대로 복사합니다.
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.6.2")
    // ... 나머지 모든 의존성들 ...
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
