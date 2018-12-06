import * as React from 'react'
import { Button } from 'react-native'
import { Component } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Text } from 'react-native'
import { View } from 'react-native'

import { Formatter } from './Formatter'
import { Wallet } from './Wallet'

interface State {
  walletAmount: number
}

export class MainScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)

    this.state = {
      walletAmount: Wallet.amount
    }

    this.props.navigation.addListener('willFocus',
      () => {
        this.setState({
          walletAmount: Wallet.amount
        })
      }
    )
  }

  public static navigationOptions = {
    title: 'Skoleglæde.nu pung'
  }

  public render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1
        }}
      >
        <Text
          style={{
            fontSize: 30,
            marginBottom: 20,
            marginTop: 30,
            textAlign: 'center'
          }}
        >
          {Formatter.formatAsCurrency(this.state.walletAmount)}
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('BarCodeScanner')}
          title={'Scan QR-kode'}
        />
      </View>
    )
  }
}