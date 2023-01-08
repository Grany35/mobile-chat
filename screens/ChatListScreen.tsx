import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const ChatListScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>ChatListScreen</Text>

      <Button
        title="Go to settings"
        onPress={() => props.navigation.navigate("ChatSettings")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatListScreen;
