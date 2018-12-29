import React from "react"
import { Component } from "react"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"

import { SlideButton } from "./SlideButton"
import { Wallet } from "./Wallet"

enum TransferAmount {
  None = 0,
  Transfer200 = 200,
  Transfer500 = 500,
  Transfer1000 = 1000
}

interface State {
  selectedTransfer: TransferAmount
}

export class TransferScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)

    this.state = {
      selectedTransfer: TransferAmount.None
    }
  }

  public static navigationOptions = {
    title: "Overfør"
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
            alignItems: "center",
            flex: 1,
            justifyContent: "center"
          }}
        >
          {this.renderTransferAmount(TransferAmount.Transfer200)}
          {this.renderTransferAmount(TransferAmount.Transfer500)}
          {this.renderTransferAmount(TransferAmount.Transfer1000)}
        </View>
        <View
          style={{
            paddingBottom: 30,
            paddingHorizontal: 20,
            width: "100%"
          }}
        >
          <SlideButton
            onTrigger={() => this.transfer()}
            title="Overfør"
          />
        </View>
      </View>
    )
  }

  private renderTransferAmount(amount: TransferAmount) {
    const isSeleced = amount === this.state.selectedTransfer

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            selectedTransfer: amount
          })
        }}
        style={{
          backgroundColor: isSeleced ? "#bbb" : "#fff",
          borderWidth: 2,
          margin: 5,
          padding: 10,
          width: 100
        }}
      >
        <Text
          style={{
            alignSelf: "center"
          }}
        >
          {amount}
        </Text>
      </TouchableOpacity>
    )
  }

  private transfer() {
    Wallet.transferToSavings(this.state.selectedTransfer)
    this.props.navigation.goBack()
  }
}