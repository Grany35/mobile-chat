import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import initialUserImage from "../assets/images/userImage.jpeg";
import colors from "../constants/colors";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../utils/imagePickerHelper";
import { useSelector } from "react-redux";
import backend from "../constants/backend";

export interface ProfileImageProps {
  size: number | null;
  uri?: string | null;
  userId: number;
}

const ProfileImage = (props: ProfileImageProps) => {
  const source = props.uri ? { uri: props.uri } : initialUserImage;
  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();

      if (!tempUri) return;

      setIsLoading(true);
      const result = await uploadImageAsync(tempUri, props.userId);
      const uploadUrl = backend.apiAddress + result;
      setIsLoading(false);

      if (!result) throw new Error("Image upload failed");

      setImage({ uri: uploadUrl });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {isLoading ? (
        <View
          style={{
            height: props.size ?? 80,
            width: props.size ?? 80,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <Image
          source={image}
          style={{
            ...styles.image,
            ...{ width: props.size ?? 80, height: props.size ?? 80 },
          }}
        />
      )}

      <View style={styles.editIconContainer}>
        <FontAwesome name="pencil" size={15} color={"black"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 8,
  },
});

export default ProfileImage;
