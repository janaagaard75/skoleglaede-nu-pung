import React from "react"
import { Animated, LayoutChangeEvent, LayoutRectangle } from "react-native"
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
  buttonSize: LayoutRectangle | undefined,
  sliderSize: LayoutRectangle | undefined,
  sliderState: SliderState
}

export class SliderButton extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      buttonSize: undefined,
      sliderSize: undefined,
      sliderState: SliderState.Idle
    }

    this.animatedPosition = new Animated.Value(0)

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
            toValue: 0,
            useNativeDriver: true
          }
        ).start(() => {
          if (this.state.sliderState !== SliderState.Dragging) {
            this.setState({
              sliderState: SliderState.Idle
            })
          }
        })
      },
      onPanResponderMove: (e, gestureEvent) => {
        if (this.state.buttonSize === undefined || this.state.sliderSize === undefined) {
          throw new Error("Both buttonSize and sliderSize must be defined.")
        }

        const maximumDx = this.state.sliderSize.width - this.state.buttonSize.width
        const restrictedDx = this.restrict(gestureEvent.dx, 0, maximumDx)
        this.animatedPosition.setValue(restrictedDx)
      },
      onPanResponderStart: (e, gestureState) => {
        this.setState({
          sliderState: SliderState.Dragging
        })
      },
      onStartShouldSetPanResponder: (e, gestureState) => true
    })
  }

  private animatedPosition: Animated.Value
  private panResponder: PanResponderInstance

  public render() {
    const animatedViewStyle = {
      transform: [{
        translateX: this.animatedPosition
      }]
    }

    return (
      <View
        onLayout={layoutEvent => this.setSliderSize(layoutEvent)}
        style={{
          alignItems: "flex-start",
          backgroundColor: "#990"
        }}
      >
        <Animated.View
          style={animatedViewStyle}
          {...this.panResponder.panHandlers}
        >
          <Text
            onLayout={layoutEvent => this.setButtonSize(layoutEvent)}
            style={{
              backgroundColor: this.getBackgroundColor(),
              paddingHorizontal: 4,
              paddingVertical: 2
            }}
          >
            Slide me
          </Text>
        </Animated.View>
      </View>
    )
  }

  private getBackgroundColor(): string {
    switch (this.state.sliderState) {
      case SliderState.Animating:
        return "#f99"

      case SliderState.Dragging:
        return "#dda"

      case SliderState.Idle:
        return "#ccc"
    }
  }

  private restrict(input: number, minimum: number, maximum: number): number {
    if (input < minimum) {
      return minimum
    }

    if (input > maximum) {
      return maximum
    }

    return input
  }

  private setButtonSize(layoutEvent: LayoutChangeEvent): void {
    this.setState({
      buttonSize: layoutEvent.nativeEvent.layout
    })
  }

  private setSliderSize(layoutEvent: LayoutChangeEvent): void {
    this.setState({
      sliderSize: layoutEvent.nativeEvent.layout
    })
  }
}