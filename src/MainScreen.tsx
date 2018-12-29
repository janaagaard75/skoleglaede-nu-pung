import React from "react"
import { Component } from "react"
import { Dimensions } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "react-native"
import { View } from "react-native"

import { Button } from "./Button"
import { Formatter } from "./Formatter"
import { Wallet } from "./Wallet"

interface State {
  credit: number
  savings: number
  windowWidth: number
}

export class MainScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)

    this.state = {
      credit: Wallet.credit,
      savings: Wallet.savings,
      windowWidth: Dimensions.get("window").width
    }

    // react-navigate doesn't allow sharing state between screens, and Wallet is not observable, so we are setting state manually when navigating back to this screen.
    this.props.navigation.addListener("willFocus",
      () => {
        this.setState({
          credit: Wallet.credit,
          savings: Wallet.savings
        })
      }
    )
  }

  public static navigationOptions = {
    title: "Skoleglæde.nu pung"
  }

  public render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            paddingRight: 20,
            paddingTop: 10
          }}
        >
          <Button
            onPress={() => this.props.navigation.navigate("ResetScreen")}
            fontSize={13}
            title="Nulstil"
          />
        </View>
        <View
          style={{
            flex: 1
          }}
        />
        {this.renderAccount("Konto", this.state.credit)}
        {this.renderAccount("Opsparing", this.state.savings)}
        <View
          style={{
            flex: 1
          }}
        />
        <View
          style={{
            marginBottom: 10,
            paddingHorizontal: 20
          }}
        >
          <Button
            onPress={() => this.props.navigation.navigate("TransferScreen")}
            fontSize={16}
            title="Overfør til opsparing"
          />
        </View>
        <View
          style={{
            marginBottom: 30,
            paddingHorizontal: 20
          }}
        >
          <Button
            onPress={() => this.props.navigation.navigate("ScannerScreen")}
            fontSize={16}
            title="Scan QR-kode"
          />
        </View>
      </View>
    )
  }

  private renderAccount(title: string, amount: number): JSX.Element {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 0.05 * this.state.windowWidth
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 0.13 * this.state.windowWidth,
            paddingRight: 10
          }}
        >
          {Formatter.formatAsCurrency(amount)}
        </Text>
      </View>
    )
  }
}