import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { type ImageSource } from "expo-image";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker"; // this acts as a method
import { useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

// variable to hold the placeholder image
const placeHolderImage = require("../../assets/images/background-image.png");


export default function Index() {

  // lets have a usestate here to hold data
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined)


  // function to pick an image from the gallery
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    // if the result is not cancelled
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert("Image selection cancelled");
    }
  };

  // function to reset
  const onReset = () => {
    setShowAppOptions(false);
  };

  // function for add sticker
  const onAddSticker = () => {
    // add sticker logic here later
    setIsModalVisible(true);

    // console.log("Sticker added");
  };

  // function for onSave image
  const onSaveImageAsync = async () => {
    // save image logic here later
    // console.log("Image saved");
  };

  // function to close the modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={placeHolderImage}
          style={styles.image}
          /> */}
        <ImageViewer imgSource={selectedImage || placeHolderImage} />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            onPress={pickImageAsync}
            label="Choose a Pic"
            theme="primary"
          />
          <Button label="Use this Pic" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList
          onSelect={setPickedEmoji}
          onCloseModal={onModalClose}
        />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },

  imageContainer: {
    flex: 1,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    // backgroundColor: "#25292e",
  },

  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },

  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-between",
  },
});
