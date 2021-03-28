# Nextime App

## Environment Setup 

#### Install Node and npm  
`brew install node`

#### Install watchman (hot reload)  
`brew install watchman`

#### Install jdk  
```
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

#### Install React Native cli  
`npm install -g react-native-cli`

#### Set up Xcode
```
sudo gem update — system
sudo gem install -n /usr/local/bin cocoapods
```

#### Setup Android Studio
1) Download from https://developer.android.com/studio

2) Open Android Studio

3) Goto the Configure > SDK Manager

4) Go to Appearance & Behavior → System Settings → Android SDK and check ✅ the box of latest version from Hide Obsolete Packages.

5) Also check ✅ the boxes of below in Show package details,  
- Android SDK Platform 28  
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

6) Click “Apply” to download and install the Android SDK and related build tools.

7) Set up environment variables to getting start with native code, Open terminal  
`open -e ~/.zshrc`  
and paste below lines there.
```
# SDK exporting
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$PATH
export PATH=$PATH:$ANDROID_HOME/tools:$PATH
export PATH=$PATH:$ANDROID_HOME/tools/bin:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH

# JAVA HOME
export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jre/jdk/Contents/Home/
```  

8) Create new Android Virtual Device (AVD) to run the application.


## Run application

- __Run on Android Physical Device__  
`adb devices`  
`adb -s <device> reverse tcp:8081 tcp:8081`

- __Run AVD__  
`react-native run-android`  

- __Run IOS__  
`react-native run-ios`


## Build

#### Android  
`cd android && ./gradlew assembleRelease`
