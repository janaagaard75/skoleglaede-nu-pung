# Wallet for Skoleglæde.nu

Wallet with virtual money for Skoleglæde.nu.

## Prerequisites

Install `expo-cli` globally.

    # Install expo-cli globally. Here done using Yarn - using npm is also possible.
    yarn global add expo-cli

## Running the App

Start the local server. This will give you a QR code that you can scan using the Expo Client app on your mobile device.

    yarn start

If you're on a Mac and have Xcode installed, you can run the app using the iOS Simulator with the following command. I am sure you can do something similar with Android.

    yarn ios

## To Do

- Handle that the user does not allow access to the camera
- Handle transferring more money that is available(?)
- Show amounts on the scanner screen(?)
- Sound effects
- Animate amounts
  - Slide up and down when adding or subtracting
  - Fade out and in when resetting
- Better layout
  - Commas on numbers should align
  - Reset screen is too empty
  - Show amounts on reset screen?
- TestFlight on iOS
- Actual hash check
- Equivalent for TestFlight on Android