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
  creditAmount: number
  windowWidth: number
}

export class MainScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)

    this.state = {
      creditAmount: Wallet.credit,
      windowWidth: Dimensions.get("window").width
    }

    this.props.navigation.addListener("willFocus",
      () => {
        this.setState({
          creditAmount: Wallet.credit
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
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 0.13 * this.state.windowWidth,
              textAlign: "center"
            }}
          >
            {Formatter.formatAsCurrency(this.state.creditAmount)}
          </Text>
        </View>
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
}