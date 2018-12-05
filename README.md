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

- Skoleglæde.nu logos
- Slide to confirm
- Better layout
  - Margins
  - Text sizes
  - Square camera lens
- Persist the amount when the app is restarted
- Actual hash check
- Persist the amount when the app is updated