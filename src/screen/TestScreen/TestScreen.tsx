import React, {useEffect, useState} from "react";
import {Button, FlatList, RefreshControl, SafeAreaView, StatusBar, ToastAndroid, View} from "react-native";
import {useAuth} from "react-native-sphoton-app-image";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import AppImage from "../../component/AppImage/AppImage";
import FastImage from "react-native-fast-image";
import LottieView from "lottie-react-native";

export interface ImageModel {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const TestScreen: React.FC = ({}) => {
  const {user} = useAuth()
  const [mounted, setMounted] = useState(true)
  const [image, setImage] = useState<ImageModel[]>()
  const [refresh, setRefresh] = useState(false)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TestScreen1'>>()

  const deleteData = async () => {
    await FastImage.clearMemoryCache()
    await FastImage.clearDiskCache()
    setImage([])
  }

  const getData = async () => {
    try {
      const customData = require('./../../assets/images_data.json')
      if(mounted) {
        setImage(customData)
      }
    } catch (e) {

    } finally {

    }
  }

  useEffect(() => {
    getData().finally(() => {

    })
    return () => {
      setMounted(false)
    }
  }, [])

  return <SafeAreaView>
    <StatusBar/>
    <Button
      onPress={
        () => {
          navigation.navigate('TestScreen2')
        }
      }
      title={"To screen list Image"}/>
    <Button
      onPress={
        () => {
          navigation.navigate('CollapsingToolBarScreen')
        }
      }
      title={"To CollapsingToolBar Screen"}/>
    <Button
      onPress={
        () => {
          navigation.navigate('WebViewTestScreen')
        }
      }
      title={"To WebViewTestScreen Screen"}/>
    <Button
      onPress={deleteData}
      title={"Delete data"}/>
    <FlatList
      contentContainerStyle={{
        flexGrow: 1
      }}
      onEndReached={() => {
        ToastAndroid.show("Scroll to end", ToastAndroid.SHORT)
      }
      }
      refreshControl={
        <RefreshControl
          onRefresh={getData}
          refreshing={refresh}/>
      }
      ListEmptyComponent={<View style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100
      }}>
        <Button
          title={'Refresh'}
          onPress={getData}/>
      </View>}
      renderItem={({item}) => {
        return <AppImage
          indicatorView={<LottieView
            style={{
              height: 50
            }}
            source={require('./../../assets/image_loading.json')}
            autoPlay
            loop
          />}
          scaleStart={0.9}
          style={{
            flex: 1,
            aspectRatio: 16 / 9
          }}
          source={{
            uri: item.download_url
          }}/>
      }}
      data={image}/>
  </SafeAreaView>
}

export default TestScreen