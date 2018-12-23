import * as React from "react"
import { Button } from "react-native"
import { Component } from "react"
import { Dimensions } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "react-native"
import { View } from "react-native"

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

    this.props.navigation.addListener("willFocus",
      () => {
        this.setState({
          credit: Wallet.credit
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
            marginBottom: 30,
            marginTop: 10
          }}
        >
          <Button
            onPress={() => this.props.navigation.navigate("BarCodeScanner")}
            title={"Scan QR-kode"}
          />
        </View>
      </View>
    )
  }

  private renderAccount(title: string, amount: number): JSX.Element {
    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 0.05 * this.state.windowWidth
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 0.13 * this.state.windowWidth
          }}
        >
          {Formatter.formatAsCurrency(amount)}
        </Text>
      </View>
    )
  }
}