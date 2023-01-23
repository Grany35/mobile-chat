import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import ProfileImage from "./ProfileImage";

import initialUserImage from "../assets/images/userImage.jpeg";
import backend from "../constants/backend";
import colors from "../constants/colors";

interface DataItemProps {
  title: string;
  subTitle: string;
  imageUri?: string;
  userId: number;
  onPress?: () => void;
}

const DataItem = (props: DataItemProps) => {
  const { title, subTitle, imageUri, userId } = props;
  const imageSource = imageUri ? backend.apiAddress + imageUri : null;
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <ProfileImage uri={imageSource} size={40} userId={userId} />

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomColor: colors.extraLightGrey,
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 50,
  },
  textContainer: {
    marginLeft: 14,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing:0.3,
  },
  subTitle: {
    fontWeight: "normal",
    fontSize: 14,
    color:colors.grey,
    letterSpacing:0.3,
  },
});

export default DataItem;
