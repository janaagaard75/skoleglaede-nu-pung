# Wallet for Skoleglæde.nu

Wallet with virtual money for Skoleglæde.nu.

## Prerequisites

Install `expo-cli` globally.

    # Install expo-cli globally. Here done using Yarn - using npm is also possible.
    yarn global add expo-cli

## Running the App

Start the local server. This will give you a QR code that you can scan using the Expo Client app on your mobile divice.

    yarn start

If you're on a Mac and have Xcode installed, you can run the app using the iOS Simulator with the following command. I am sure you can do something similar with Android.

    yarn ios

## To Do

- Slide to confirm
- Ability to put amount in bank
  - Both amounts on the front page ("konto" and "opsparing")
  - Icons: Credit card and bank
  - 500/1000/2000
- Reset button
  - 4000 to start with
  - No need for a reser QR code
- Persist the state when the app is restarted
- Buttons that look like the ones on Skoleglæde.nu
- Actual hash check
- Sound effects
- TestFlight
- Equivalent for TestFlight on Android
- Persist the state when the app is updated(?)