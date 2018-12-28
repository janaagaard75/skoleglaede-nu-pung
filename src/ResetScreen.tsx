import React from "react"
import { Component } from "react"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "react-native"
import { View } from "react-native"

import { SliderButton } from "./SliderButton"
import { Wallet } from "./Wallet"

export class ResetScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)
  }

  public static navigationOptions = {
    title: "Nulstil"
  }

  public render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 10
          }}
        >
          <Text>
            Nultil din konto til 4.000 kroner og opsparing til 0 kroner?
          </Text>
        </View>
        <View
          style={{
            paddingBottom: 30,
            paddingHorizontal: 20,
            width: "100%"
          }}
        >
          <SliderButton
            onTrigger={() => this.resetWallet()}
            title="Nulstil"
          />
        </View>
      </View>
    )
  }

  private resetWallet() {
    Wallet.reset()
    this.props.navigation.goBack()
  }
}