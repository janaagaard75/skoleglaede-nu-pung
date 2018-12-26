import React from "react"
import { Animated } from "react-native"
import { Component } from "react"
import { Easing } from "react-native"
import { PanResponder } from "react-native"
import { PanResponderInstance } from "react-native"
import { Text } from "react-native"
import { View } from "react-native"

interface Props {
  title: string
}

enum SliderState {
  Animating,
  Dragging,
  Idle
}

interface State {
  // sliderState is not yet used.
  sliderState: SliderState
}

export class SliderButton extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      sliderState: SliderState.Idle
    }

    this.animatedPosition = new Animated.ValueXY()

    this.panResponder = PanResponder.create({
      onPanResponderEnd: (e, gestureState) => {
        this.setState({
          sliderState: SliderState.Animating
        })

        Animated.timing(
          this.animatedPosition,
          {
            duration: 100,
            easing: Easing.ease,
            toValue: { x: 0, y: 0 }
          }
        ).start(() => {
          if (this.state.sliderState !== SliderState.Dragging) {
            this.setState({
              sliderState: SliderState.Idle
            })
          }
        })
      },
      // onPanResponderGrant: (e, gestureState) => {
      //   Game.instance.cardDragStarted(this.props.positionedCard)
      // },
      onPanResponderMove: (e, gestureEvent) => {
        Animated.event([
          // tslint:disable-next-line:no-null-keyword
          null as any,
          {
            // dy is not included since we the button only slides horizontally.
            dx: this.animatedPosition.x
          }
        ])(e, gestureEvent)
      },
      onPanResponderStart: (e, gestureState) => {
        this.setState({
          sliderState: SliderState.Dragging
        })
      },
      onStartShouldSetPanResponder: (e, gestureState) => true
    })
  }

  private animatedPosition: Animated.ValueXY
  private panResponder: PanResponderInstance

  public render() {
    const style = {
      transform: this.animatedPosition.getTranslateTransform()
    }

    return (
      <Animated.View
        style={style}
        {...this.panResponder.panHandlers}
      >
        <View
          style={{
            alignItems: "flex-start",
            padding: 4
          }}
        >
          <Text
            style={{
              borderColor: this.getBorderColor(),
              borderWidth: 2,
              paddingHorizontal: 4,
              paddingVertical: 2
            }}
          >
            Slide me
          </Text>
        </View>
      </Animated.View>
    )
  }

  private getBorderColor(): string {
    switch (this.state.sliderState) {
      case SliderState.Animating:
        return "#0f0"

      case SliderState.Dragging:
        return "#f00"

      case SliderState.Idle:
        return "#000"
    }
  }
}