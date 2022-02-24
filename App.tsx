import React from 'react';
import {UserAuthenticate} from "react-native-sphoton-app-image";
import {createStackNavigator} from '@react-navigation/stack';
import TestScreen from "./src/screen/TestScreen/TestScreen";
import TestScreen2 from "./src/screen/TestScreen2/TestScreen2";
import {NavigationContainer} from "@react-navigation/native";
import CollapsingToolBarScreen from "./src/screen/CollapsingToolBarScreen/CollapsingToolBarScreen";
import WebViewTestScreen from "./src/screen/WebViewTestScreen/WebViewTestScreen";


export type RootStackParamList = {
  TestScreen1: undefined;
  TestScreen2: undefined;
  CollapsingToolBarScreen: undefined;
  WebViewTestScreen: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <UserAuthenticate>
      <AppNavigator/>
    </UserAuthenticate>
  );
};

const AppNavigator = () => {
  return <NavigationContainer>
    <RootStack.Navigator initialRouteName="TestScreen1">
      <RootStack.Screen name="TestScreen1" component={TestScreen}/>
      <RootStack.Screen name="TestScreen2" component={TestScreen2}/>
      <RootStack.Screen name="WebViewTestScreen" component={WebViewTestScreen}/>
      <RootStack.Screen
        options={{
          headerShown: false
        }}
        name="CollapsingToolBarScreen"
        component={CollapsingToolBarScreen}/>
    </RootStack.Navigator>
  </NavigationContainer>
}

export default App;
