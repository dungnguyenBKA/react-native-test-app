import React from "react";
import {Button, SafeAreaView, StatusBar} from "react-native";
import {NavigationRef} from "../../../App";

export interface ImageModel {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const TestScreen: React.FC = ({}) => {
  const navigation = NavigationRef.current
  return <SafeAreaView>
    <StatusBar/>
    <Button
      onPress={
        () => {
          navigation?.navigate('TestScreen2')
        }
      }
      title={"To screen list Image"}/>
    <Button
      onPress={
        () => {
          navigation?.navigate('CollapsingToolBarScreen')
        }
      }
      title={"To CollapsingToolBar Screen"}/>
    <Button
      onPress={
        () => {
          navigation?.navigate('WebViewTestScreen')
        }
      }
      title={"To WebViewTestScreen Screen"}/>
    <Button
      onPress={
        () => {
          navigation?.navigate('QRCodeTestScreen')
        }
      }
      title={"To QRCode Screen"}/>
  </SafeAreaView>
}

export default TestScreen
