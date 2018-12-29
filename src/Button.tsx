import React from "react"
import { Component } from "react"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"

interface Props {
  fontSize: number,
  onPress: () => void,
  selected?: boolean,
  title: string
}

export class Button extends Component<Props> {
  public render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          alignItems: "center",
          backgroundColor: this.props.selected ? "#bbb" : "transparent",
          borderColor: "#000",
          borderWidth: 2,
          paddingHorizontal: Math.round(this.props.fontSize / 16 * 11),
          paddingVertical: Math.round(this.props.fontSize / 16 * 6),
          width: "100%"
        }}
      >
        <Text
          style={{
            fontSize: this.props.fontSize
          }}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}