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

- Sound effects
- Animate amounts
  - Slide up and down when adding or subtracting
  - Fade out and in when resetting
- Better layout
  - Commas on numbers should align
  - Broke and reset screens are too empty
- Show current amounts throughout the app?
- TestFlight on iOS
- Actual hash check
- Equivalent for TestFlight on Android