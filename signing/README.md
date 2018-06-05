# 使用方法

将 `release-signing.properties` 及 `ionic.jks` 放置在 `/platforms/android` 目录下，这样构建APP时自动进行签名。

- 将 `build-extras.gradle` 放置在 `/platforms/android` 目录下，
如果 Cordova Android 7.0.0，则也要在 `/platforms/android/app` 中放置 `build-extras.gradle` 文件，
解决 `Execution failed for task ':app:processDebugResources'. > Failed to execute aapt` 问题。

