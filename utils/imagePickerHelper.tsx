import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import backend from "../constants/backend";

export const launchImagePicker = async () => {
  await checkMediaPermissions();

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

export const uploadImageAsync = async (uri: string, userId: number) => {
  try {
    const formData = new FormData();
    //TODO: Test on Android
    formData.append(
      "file",
      JSON.parse(
        JSON.stringify({
          uri: uri,
          name: "image.jpg",
          type: "image/jpg",
        })
      )
    );
    formData.append("userId", userId.toString());
    const result = await axios.post(
      backend.apiAddress + "api/Users/UpdateProfileImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const checkMediaPermissions = async () => {
  if (Platform.OS !== "web") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      return Promise.reject("Permission to access camera roll is required!");
    }
  }
  return Promise.resolve();
};
