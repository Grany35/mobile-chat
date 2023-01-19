import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const ChatListScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="New Chat" iconName="create-outline" onPress={() => {}} />
          </HeaderButtons>
        );
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>ChatListScreen</Text>

      <Button
        title="Go to Chat screen"
        onPress={() => props.navigation.navigate("ChatScreen")}
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
