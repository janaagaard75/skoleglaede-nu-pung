import React from "react"
import { Component } from "react"
import { View } from "react-native"
import { Text } from "react-native"
import { NavigationScreenProps } from "react-navigation"

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
          TODO
        </Text>
      </View>
    )
  }
}