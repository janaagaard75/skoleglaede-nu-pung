import { createStackNavigator } from 'react-navigation'

import { MainScreen } from './MainScreen'
import { ScannerScreen } from './ScannerScreen'

export default createStackNavigator({
  // tslint:disable:object-literal-sort-keys
  Main: {
    screen: MainScreen,
    navigationOptions: () => ({
      headerBackTitle: 'Tilbage',
      headerTitleStyle: {
        color: '#fff'
      },
      headerStyle: {
        backgroundColor: '#46a096',
        borderBottomColor: '#387f77'
      }
    })
  },
  BarCodeScanner: {
    screen: ScannerScreen,
    navigationOptions: () => ({
      headerBackTitleStyle: {
        color: '#fff'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerStyle: {
        backgroundColor: '#46a096',
        borderBottomColor: '#387f77'
      },
      cardStyle: {
        backgroundColor: '#f00'
      }
    })
  }
})