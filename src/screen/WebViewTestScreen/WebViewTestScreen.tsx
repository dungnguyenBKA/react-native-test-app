import React, {useEffect, useState} from "react";
import {FlatList, Image, SafeAreaView, StatusBar, Text} from "react-native";
import {HTMLElement, parse} from "node-html-parser";
import {html} from "./htmlContent";
import AppImage from "../../component/AppImage/AppImage";

const WebViewTestScreen: React.FC = () => {
  const parseHtmlToElement = (html: string): HTMLElement[] => {
    const dom = parse(html)
    return dom.querySelectorAll('*').filter((item) => {
      return (item.tagName !== 'DIV')
    })
  }

  const [htmlElements, setHtmlElements] = useState<HTMLElement[]>([])

  const htmlElementMapToView = (element: HTMLElement): React.ReactElement => {
    switch (element.tagName) {
      case 'P' : {
        return <Text>{element.text}</Text>
      }

      case 'IMG' : {
        return <AppImage
          style={{
            aspectRatio: 1
          }}
          source={{
            uri: element.getAttribute("src")
          }}/>
      }

      default : {
        return <Text>{element.text}</Text>
      }
    }
  }

  useEffect(() => {
    setHtmlElements(parseHtmlToElement(html))
  }, [])

  return <SafeAreaView style={{
    flex: 1,
  }}>
    <StatusBar
      translucent
      barStyle='light-content'
      backgroundColor='#fff'
    />

    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 16
      }}
      keyExtractor={(item, index) => {
        return String(index)
      }}
      data={htmlElements}
      renderItem={({item}) => {
        return htmlElementMapToView(item)
      }}/>

  </SafeAreaView>
}

export default WebViewTestScreen