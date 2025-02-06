import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';

interface Props {
    imgSource: string;
}

// type Props = {
//     imgSource: string;
// }

//// or u can do inline like this
// export default function ImageViewer({ imgSource }:{ imgSource: string }) {

export default function ImageViewer({imgSource}: Props) {

  return (
    <Image
      source={imgSource}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    }
})