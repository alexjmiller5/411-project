Installations Used to Create this Project

1. Internet Installations
Install homebrew
Install nvm (not necessary)
Download Xcode
Go to Xcode > Settings > Location > Select any version of Xcode under Command Line Tools

2. Homebrew Installations
Install node — brew install node
Install watchman — brew install watchman
Install cocoa pods — brew install cocoapods
Install direnv brew — install direnv

3. Node Installations
Install npx — npm install -g npx
Intall expo — sudo npm install expo-cli --global
Install all other dependencies — npm install 

4. Create Accounts ***Add links
Create a Google Cloud Account
1. Create a URI as such
Create a firbase account
Create an expo account

5. Terminal Commands
npx create-expo-app <project_name>
cd <project_name>

6. Expo Installations
npx expo customize metro.config.js — Create metro.config.js file
npx expo install expo-location — Install geo locator  
npx expo install @mapbox/polyline — Install poly line
npx expo install react-native
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack
npx expo install expo-auth-session/providers/google
npx expo install expo-web-browser

7. Hook direnv to your system's shell
https://direnv.net/docs/hook.html

8. Run the Project In Terminal
run direnv allow
npx expo start --clear