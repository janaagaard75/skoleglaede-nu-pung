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
      // onPanResponderGrant: (e, gestureState) => {
      //   Game.instance.cardDragStarted(this.props.positionedCard)
      // },
      onPanResponderMove: (e, gestureEvent) => {
        console.info(this.animatedPosition)
        Animated.event([
          // tslint:disable-next-line:no-null-keyword
          null as any,
          {
            dx: this.animatedPosition
            // dy is not included since we the button only slides horizontally.
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

    // this.animatedPosition.addListener(x => {
    //   if (this.state.buttonSize === undefined || this.state.sliderSize === undefined) {
    //     return
    //   }

    //   const pixelsToRightBorder = (this.state.sliderSize.width) - (this.state.buttonSize.width + x.value)
    //   console.info(this.state.sliderSize.x, this.state.sliderSize.width, this.state.buttonSize.x, this.state.buttonSize.width, this.animatedPosition, x.value, pixelsToRightBorder)
    // })
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
              backgroundColor: "#cc0",
              // borderColor: this.getBorderColor(),
              // borderWidth: 2,
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

  private setSliderSize(layoutEvent: LayoutChangeEvent): void {
    this.setState({
      sliderSize: layoutEvent.nativeEvent.layout
    })
  }

  private setButtonSize(layoutEvent: LayoutChangeEvent): void {
    this.setState({
      buttonSize: layoutEvent.nativeEvent.layout
    })
  }
}