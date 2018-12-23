import * as React from "react"
import { BarCodeScanner } from "expo"
import { Button } from "react-native"
import { Dimensions } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Permissions } from "expo"
import { StyleSheet } from "react-native"
import { Text } from "react-native"
import { View } from "react-native"

import { Action } from "./actions/Action"
import { ActionHelper } from "./actions/ActionHelper"
import { Wallet } from "./Wallet"

// The type definitions for BarCodeScanner are unfortunately not correct.
const UntypedBarCodeScanner = BarCodeScanner as any

enum PermissionState {
  Requesting,
  Denied,
  Granted
}

interface State {
  cameraPermission: PermissionState
  codeScanned: boolean
  currentAction: Action | undefined
  windowWidth: number
}

export class ScannerScreen extends React.Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)

    this.state = {
      cameraPermission: PermissionState.Requesting,
      codeScanned: false,
      currentAction: undefined,
      windowWidth: Dimensions.get("window").width
    }
  }

  public static navigationOptions = {
    title: "Scan QR-kode"
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      cameraPermission: status === "granted" ? PermissionState.Granted : PermissionState.Denied
    })
  }

  public render() {
    if (this.state.cameraPermission === PermissionState.Requesting) {
      return <Text>Requesting for camera permission.</Text>
    }

    if (this.state.cameraPermission === PermissionState.Denied) {
      return <Text>No access to the camera.</Text>
    }

    const floatViewfinderSize = 0.7 * this.state.windowWidth
    const roundedViewfinderSize = 2 * Math.round(floatViewfinderSize / 2)

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              height: roundedViewfinderSize,
              width: roundedViewfinderSize
            }}
          >
            <UntypedBarCodeScanner
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              onBarCodeScanned={this.handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10,
            textAlign: "center"
          }}
        >
          {this.getText(this.state.currentAction)}
        </Text>
        <View
          style={{
            marginBottom: 30,
            marginTop: 10
          }}
        >
          <Button
            onPress={() => this.okButtonPressed()}
            disabled={this.state.currentAction === undefined}
            title="OK"
          />
        </View>
      </View>
    )
  }

  private okButtonPressed() {
    if (this.state.currentAction === undefined) {
      throw new Error("OK button pressed, but currentAction is undefined.")
    }

    Wallet.performAction(this.state.currentAction)

    this.setState({
      codeScanned: false,
      currentAction: undefined
    })

    this.props.navigation.goBack()
  }

  private handleBarCodeScanned = ({ type, data }: any) => {
    const action = ActionHelper.parseCodeValue(data)
    this.setState({
      codeScanned: true,
      currentAction: action
    })
  }

  private getText(action: Action | undefined): string {
    if (action === undefined) {
      if (this.state.codeScanned) {
        return "QR-koden er ikke accepteret."
      }

      return "Scan en QR-kode."
    }

    return action.text
  }
}