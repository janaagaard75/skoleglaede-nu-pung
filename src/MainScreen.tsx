import * as React from 'react'
import { Button } from 'react-native'
import { Component } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'

import { Formatter } from './Formatter'

interface State {
  walletAmount: number
}

export class MainScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context)

    this.state = {
      walletAmount: 0
    }
  }

  public static navigationOptions = {
    title: 'Skoleglæde.nu pung'
  }

  public render() {
    return (
      <ScrollView
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
          title={'Scan QR kode'}
        />
      </ScrollView>
    )
  }
}