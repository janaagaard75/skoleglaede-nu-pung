import { createStackNavigator } from 'react-navigation'

import { MainScreen } from './MainScreen'
import { ScannerScreen } from './ScannerScreen'

export default createStackNavigator({
  // tslint:disable:object-literal-sort-keys
  Main: { screen: MainScreen },
  BarCodeScanner: { screen: ScannerScreen }
})