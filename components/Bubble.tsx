import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

interface BubbleProps {
  text: string;
  type: string;
}

const Bubble = (props: BubbleProps) => {
  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };

  switch (props.type) {
    case "system":
      textStyle.color = "#65644A";
      bubbleStyle.backgroundColor = colors.beige;
      bubbleStyle.alignItems = "center";
      bubbleStyle.marginTop = 10;
      break;

    default:
      break;
  }

  return (
    <View style={styles.wrapperStyle}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    letterSpacing: 0.3,
    color: "black",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
    borderColor: "#E2DACC",
    borderWidth: 1,
    alignItems: 'center',
    marginTop:5
  },
});

export default Bubble;
