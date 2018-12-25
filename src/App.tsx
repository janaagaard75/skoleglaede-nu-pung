import { createStackNavigator } from "react-navigation"

import { MainScreen } from "./MainScreen"
import { ResetScreen } from "./ResetScreen"
import { ScannerScreen } from "./ScannerScreen"
import { TransferScreen } from "./TranferScreen"

export default createStackNavigator({
  MainScreen: {
    navigationOptions: () => ({
      headerBackTitle: "Tilbage",
      headerStyle: {
        backgroundColor: "#46a096",
        borderBottomColor: "#387f77"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }),
    screen: MainScreen
  },
  // tslint:disable-next-line:object-literal-sort-keys
  ResetScreen: {
    navigationOptions: () => ({
      headerBackTitleStyle: {
        color: "#fff"
      },
      headerStyle: {
        backgroundColor: "#46a096",
        borderBottomColor: "#387f77"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }),
    screen: ResetScreen
  },
  ScannerScreen: {
    navigationOptions: () => ({
      headerBackTitleStyle: {
        color: "#fff"
      },
      headerStyle: {
        backgroundColor: "#46a096",
        borderBottomColor: "#387f77"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }),
    screen: ScannerScreen
  },
  TransferScreen: {
    navigationOptions: () => ({
      headerBackTitleStyle: {
        color: "#fff"
      },
      headerStyle: {
        backgroundColor: "#46a096",
        borderBottomColor: "#387f77"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }),
    screen: TransferScreen
  }
})