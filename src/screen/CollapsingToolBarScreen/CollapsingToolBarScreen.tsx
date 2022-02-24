import React, {useRef} from "react";
import {Animated, ScrollView, StatusBar, Text, View} from "react-native";

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const HEADER_HEIGHT_MAX = 200;
const HEADER_HEIGHT_MIN = 40;

const CollapsingToolBarScreen: React.FC = () => {
  const offset = useRef(new Animated.Value(0)).current;

  const headerHeight = offset.interpolate({
    inputRange: [HEADER_HEIGHT_MIN, HEADER_HEIGHT_MAX],
    outputRange: [HEADER_HEIGHT_MAX, (StatusBar.currentHeight ? StatusBar.currentHeight : 0) + HEADER_HEIGHT_MIN],
    extrapolate: 'clamp'
  });

  return <View style={{flex: 1}}>
    <StatusBar
      backgroundColor={'rgba(255,255,255,0)'}
      translucent={true}
      barStyle='light-content'/>
    <AnimatedHeader animatedValue={offset}/>

    <Animated.ScrollView
      overScrollMode={'never'}
      contentContainerStyle={{
      }}
      style={{
        backgroundColor: 'green',
        marginTop: headerHeight
      }}
      scrollEventThrottle={0}
      onScroll={Animated.event(
        [{
          nativeEvent: {
            contentOffset: {
              y: offset
            }
          }
        }]
        , {
          useNativeDriver: false
        })}
    >
      <Text>{text}</Text>
      <Text>{text}</Text>
      <Text>{text}</Text>
      <Text>{text}</Text>
      <Text>{text}</Text>
      <Text>{text}</Text>
      <Text>{text}</Text>
      <Text>{text}</Text>
    </Animated.ScrollView>
  </View>
}


interface AnimatedHeaderProps {
  animatedValue: Animated.Value
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({animatedValue}) => {
  const headerHeight = animatedValue.interpolate({
    inputRange: [HEADER_HEIGHT_MIN, HEADER_HEIGHT_MAX],
    outputRange: [HEADER_HEIGHT_MAX, (StatusBar.currentHeight ? StatusBar.currentHeight : 0) + HEADER_HEIGHT_MIN],
    extrapolate: 'clamp'
  });

  return (
    <Animated.Image
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: 'rgba(0,0,0,0.1)'
      }}
      source={{
        //uri: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/bltb26d45a4879b9456/5f9b3d9259fe1c3a2576f0a3/kaisa_skin01.jpg'
      }}/>
  );
};

export default CollapsingToolBarScreen