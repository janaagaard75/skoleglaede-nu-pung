import React from "react"
import { Button } from "react-native"
import { Component } from "react"
import { View } from "react-native"
import { Text } from "react-native"
import { NavigationScreenProps } from "react-navigation"

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
          alignItems: "center",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Text>
          Nultil din konto og opsparing?
        </Text>
        <Button
          onPress={() => this.resetPresed()}
          title="Nultil"
        />
      </View>
    )
  }

  private resetPresed() {
    Wallet.reset()
    this.props.navigation.goBack()
  }
}