import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import userImage from "../assets/images/userImage.jpeg";
import colors from "../constants/colors";

export interface ProfileImageProps {
  size: number | null;
}

const ProfileImage = (props: ProfileImageProps) => {
  return (
    <View>
      <Image
        source={userImage}
        style={{
          ...styles.image,
          ...{ width: props.size ?? 80, height: props.size ?? 80 },
        }}
      />
      <View style={styles.editIconContainer}>
        <FontAwesome name="pencil" size={15} color={"black"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  editIconContainer:{
    position: "absolute",
    bottom:0,
    right:0,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 8,
  }
});

export default ProfileImage;
