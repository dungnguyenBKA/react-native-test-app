import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import {Image, StatusBar, ToastAndroid, useWindowDimensions} from "react-native";
import {RNHoleView} from "react-native-hole-view";

const QRCodeScreen: React.FC = () => {
  const dimension = useWindowDimensions()
  const h = dimension.height
  const w = dimension.width

  console.log(h, w)

  return (
    <>
      <StatusBar
        backgroundColor={'rgba(255,0,0,0)'}
        translucent/>
      <QRCodeScanner
        showMarker
        customMarker={
          <Image
            style={{
              width: w / 2 + 2,
              height: w / 2 + 2,
            }}
            source={require('../../assets/image/qr_frame.png')}/>
        }
        cameraStyle={{
          height: '100%',
          zIndex: 0,
        }}

        onRead={
          (event) => {
            ToastAndroid.show('QRCode: ' + event.data, ToastAndroid.LONG)
          }
        }/>
      <RNHoleView
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        holes={[{x: (w - w / 2) / 2, y: (h - w / 2 + 35) / 2, width: w / 2, height: w / 2, borderRadius: 35}]}/>
    </>)
}

export default QRCodeScreen
