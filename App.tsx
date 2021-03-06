import React from 'react';
import {UserAuthenticate} from "react-native-sphoton-app-image";
import {createStackNavigator} from '@react-navigation/stack';
import TestScreen from "./src/screen/TestScreen/TestScreen";
import TestScreen2 from "./src/screen/TestScreen2/TestScreen2";
import {NavigationContainer} from "@react-navigation/native";
import WebViewTestScreen from "./src/screen/WebViewTestScreen/WebViewTestScreen";
import {NavigationContainerRef} from "@react-navigation/core";
import QRCodeScreen from "./src/screen/QRCodeScreen/QRCodeScreen";

export type RootStackParamList = {
  ListScreen: undefined;
  TestScreen2: undefined;
  CollapsingToolBarScreen: undefined;
  WebViewTestScreen: undefined;
  QRCodeTestScreen: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <UserAuthenticate>
      <AppNavigator/>
    </UserAuthenticate>
  );
};
export const NavigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>()
const AppNavigator = () => {
  return <NavigationContainer ref={NavigationRef}>
    <RootStack.Navigator initialRouteName="QRCodeTestScreen">
      <RootStack.Screen
        name="ListScreen"
        component={TestScreen}/>
      <RootStack.Screen
        name="TestScreen2"
        component={TestScreen2}/>
      <RootStack.Screen
        name="WebViewTestScreen"
        component={WebViewTestScreen}/>
      <RootStack.Screen
        options={{
          headerShown: false
        }}
        name="QRCodeTestScreen"
        component={QRCodeScreen}/>
    </RootStack.Navigator>
  </NavigationContainer>
}

export default App;
