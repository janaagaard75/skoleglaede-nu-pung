import { createStackNavigator } from 'react-navigation'

import { MainScreen } from './MainScreen'
import { ScannerScreen } from './ScannerScreen'

export default createStackNavigator({
  Main: {
    navigationOptions: () => ({
      headerBackTitle: 'Tilbage',
      headerStyle: {
        backgroundColor: '#46a096',
        borderBottomColor: '#387f77'
      },
      headerTitleStyle: {
        color: '#fff'
      }
    }),
    screen: MainScreen
  },
  // tslint:disable-next-line:object-literal-sort-keys
  BarCodeScanner: {
    navigationOptions: () => ({
      headerBackTitleStyle: {
        color: '#fff'
      },
      headerStyle: {
        backgroundColor: '#46a096',
        borderBottomColor: '#387f77'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }),
    screen: ScannerScreen
  }
})