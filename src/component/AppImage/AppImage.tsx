import React, {useEffect, useRef, useState} from "react";
import FastImage, {FastImageProps} from "react-native-fast-image";
import {ActivityIndicator, Animated, Image, ImageSourcePropType, StyleSheet, View} from "react-native";


interface AppImageProps extends FastImageProps {
  indicatorView?: React.ReactNode,
  scaleStart?: number,
  scaleEnd?: number,
  duration?: number,
  placeHolderImageSource?: ImageSourcePropType
}

const AppImage: React.FC<AppImageProps> = (
  {
    source,
    style,
    indicatorView,
    scaleStart,
    scaleEnd,
    duration,
    placeHolderImageSource,
  }) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(scale, {
        toValue: scaleEnd ? scaleEnd : defaultScaleEnd,
        duration: duration,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: scaleStart ? scaleStart : defaultScaleStart,
        duration: duration,
        useNativeDriver: true
      }).start();
    }
  }, [isLoading])

  useEffect(() => {
    if (typeof source !== 'number') {
      if (!source.uri) {
        setError(true)
        return
      }

      Image.getSize(source.uri, (width, height) => {
        setError(false)
      }, () => {
        setError(true)
      })
    } else {
      console.log('what')
    }
  }, [])

  return <View style={style}>
    {
      <AnimatedFastImage
        onLoadStart={() => {
          setLoading(true)
        }}
        onLoadEnd={() => {
          setLoading(false)
        }}
        onError={() => {
          setError(true)
        }}
        source={!error ? source : defaultPlaceHolderImageSource}
        style={[style, {
          transform: [
            {scale: scale}
          ]
        }]}>
        {
          isLoading && <View style={[StyleSheet.absoluteFill, {
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
            {indicatorView}
            </View>
        }

      </AnimatedFastImage>
    }

  </View>
}

const defaultScaleStart = 0.7
const defaultScaleEnd = 1
const defaultPlaceHolderImageSource = require('./../../assets/image/placeholder.png')

AppImage.defaultProps = {
  indicatorView: (
    <ActivityIndicator color={'#000'}/>
  ),
  duration: 300,
}

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)

export default AppImage