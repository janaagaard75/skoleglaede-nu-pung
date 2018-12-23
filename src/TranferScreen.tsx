import React from "react"
import { Component } from "react"
import { View } from "react-native"
import { Text } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export class TransferScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)
  }

  public static navigationOptions = {
    title: "Spar op"
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
          TODO 500, 1000, 2000
        </Text>
      </View>
    )
  }
}