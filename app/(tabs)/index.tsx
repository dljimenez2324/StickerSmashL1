import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { type ImageSource } from "expo-image";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker"; // this acts as a method
import { useEffect, useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// variable to hold the placeholder image
const placeHolderImage = require("../../assets/images/background-image.png");

export default function Index() {
  const imageRef = useRef<View>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  // lets have a usestate here to hold data
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );

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
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Image saved successfully!");
      }
    } catch (error) {
      console.log("Error saving image", error);
      alert("Error saving image");
    }
    // console.log("Image saved");
  };

  // function to close the modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={selectedImage || placeHolderImage} />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            onPress={pickImageAsync}
            label="Choose a Pic"
            theme="primary"
          />
          <Button
            label="Use this Pic"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
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
