#!/bin/bash
# From https://stackoverflow.com/a/54014420/37147.

declare -a simulators=(
  "7DF63F15-849C-4616-8823-A39FBB534016"
  "56565BD8-569C-4DE8-AAE2-B4C21BE52501"
)

for i in "${simulators[@]}"
do
  xcrun instruments -w $i
  #xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.9.0.app
  xcrun simctl openurl $i exp://127.0.0.1:19000
done
