import React, {useEffect, useState} from "react";
import {FlatList, RefreshControl, SafeAreaView, StatusBar, Text, View} from "react-native";
import AppImage from "../../component/AppImage/AppImage";
import {ImageModel} from "../TestScreen/TestScreen";

const TestScreen2: React.FC = ({}) => {
  const [image, setImage] = useState<ImageModel[]>()
  const [refresh, setRefresh] = useState(false)
  const [mounted, setMounted] = useState(true)

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
    <FlatList
      numColumns={2}
      refreshControl={
        <RefreshControl
          onRefresh={getData}
          refreshing={refresh}/>
      }
      ListEmptyComponent={<View style={{
        flex: 1
      }}>
        <Text>Empty</Text>
      </View>}
      renderItem={({item, index}) => {
        return <AppImage
          style={{
            flex: 1,
            aspectRatio: 16 / 9
          }}
          source={{
            uri: index % 3 == 0 ? '' : item.download_url
          }}/>
      }}
      data={image}
      contentInsetAdjustmentBehavior="automatic"/>
  </SafeAreaView>
}

export default TestScreen2