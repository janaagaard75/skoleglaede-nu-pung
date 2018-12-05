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
import { Formatter } from './Formatter'
import { Wallet } from './Wallet'

// The type definitions for BarCodeScanner are unfortunately not correct.
const UntypedBarCodeScanner = BarCodeScanner as any

enum PermissionState {
  Unknown,
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
      cameraPermission: PermissionState.Unknown,
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
    // TODO: Is it necessary to use a switch to get an exhaustive check on state.cameraPermission?
    switch (this.state.cameraPermission)
    {
      case PermissionState.Unknown:
        return <Text>Requesting for camera permission.</Text>

      case PermissionState.Denied:
        return <Text>No access to the camera.</Text>

      case PermissionState.Granted:
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

      default:
        const _exhaustiveCheck: never = this.state.cameraPermission
        return _exhaustiveCheck
    }
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
        return new Action(ActionType.Add, amount)

      case '-':
        return new Action(ActionType.Remove, amount)

      case '=':
        return new Action(ActionType.Set, amount)
    }

    return undefined
  }

  // TOOD: Move to Action class.
  private getText(action: Action | undefined): string {
    if (action === undefined) {
      if (this.state.codeScanned) {
        return 'QR-koden er ikke accepteret.'
      }

      return 'Scan en QR-kode.'
    }

    const formattedAmount = Formatter.formatAsCurrency(action.amount)

    switch (action.type) {
      case ActionType.Add:
        return `Tilføj ${formattedAmount}?`

      case ActionType.Remove:
        return `Fratræk ${formattedAmount}?`

      case ActionType.Set:
        return `Nultil til ${formattedAmount}?`

      default:
        throw new Error(`The action '${action.type}' is not accepted. The amount is ${formattedAmount}.`)
    }
  }
}