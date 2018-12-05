import * as React from 'react'
import { BarCodeScanner } from 'expo'
import { Button } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Permissions } from 'expo'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'

import { Action } from './Action'
import { ActionType } from './ActionType'
import { AddAction } from './AddAction'
import { Formatter } from './Formatter'
import { SetAction } from './SetAction'
import { SubtractAction } from './SubtractAction'
import { Wallet } from './Wallet'

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
}

export class ScannerScreen extends React.Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)

    this.state = {
      cameraPermission: PermissionState.Requesting,
      codeScanned: false,
      currentAction: undefined
    }
  }

  public static navigationOptions = {
    title: 'Scan QR-kode'
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      cameraPermission: status === 'granted' ? PermissionState.Granted : PermissionState.Denied
    })
  }

  public render() {
    if (this.state.cameraPermission === PermissionState.Requesting) {
      return <Text>Requesting for camera permission.</Text>
    }

    if (this.state.cameraPermission === PermissionState.Denied) {
      return <Text>No access to the camera.</Text>
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <UntypedBarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10
          }}
        >
          {this.getText(this.state.currentAction)}
        </Text>
        <View
          style={{
            marginBottom: 20
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
      throw new Error('OK button pressed, but currentAction is undefined.')
    }

    Wallet.performAction(this.state.currentAction)

    this.setState({
      codeScanned: false,
      currentAction: undefined
    })

    this.props.navigation.goBack(undefined)
  }

  private handleBarCodeScanned = ({ type, data }: any) => {
    const action = this.getAction(data)
    this.setState({
      codeScanned: true,
      currentAction: action
    })
  }

  // TODO: Move to Action class.
  private getAction(code: string): Action | undefined {
    const actionAndHash = code.split('&')

    if (actionAndHash.length !== 2) {
      return undefined
    }

    const actionString = actionAndHash[0]
    const hash = actionAndHash[1]

    // TODO: Implement actual hash check.
    if (hash !== '1234567890') {
      return undefined
    }

    const amount = parseInt(actionString.substring(1), 10)
    if (isNaN(amount)) {
      return undefined
    }

    const firstLetter = actionString.substring(0, 1)
    switch (firstLetter) {
      case '+':
        return new AddAction(amount)

      case '-':
        return new SubtractAction(amount)

      case '=':
        return new SetAction(amount)
    }

    return undefined
  }

  private getText(action: Action | undefined): string {
    if (action === undefined) {
      if (this.state.codeScanned) {
        return 'QR-koden er ikke accepteret.'
      }

      return 'Scan en QR-kode.'
    }

    return action.text
  }
}