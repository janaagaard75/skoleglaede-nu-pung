import { createStackNavigator } from 'react-navigation'

import { BarCodeScannerScreen } from './BarCodeScannerScreen'
import { MainScreen } from './MainScreen'

export default createStackNavigator({
  // tslint:disable:object-literal-sort-keys
  Main: { screen: MainScreen },

  BarCodeScanner: { screen: BarCodeScannerScreen }
})