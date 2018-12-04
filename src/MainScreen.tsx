import * as React from 'react'
import { Button } from 'react-native'
import { Component } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { ScrollView } from 'react-native'

export class MainScreen extends Component<NavigationScreenProps> {
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
        <Button
          onPress={() => this.props.navigation.navigate('BarCodeScanner')}
          title={'Scan QR kode'}
        />
      </ScrollView>
    )
  }
}