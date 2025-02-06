import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, ImageSource } from 'expo-image';

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {



  return (
    <View style={{top: -10}}>
      <Image source={stickerSource} style={{width:imageSize,height:imageSize}}/>
    </View>
  )
}

// const styles = StyleSheet.create({})