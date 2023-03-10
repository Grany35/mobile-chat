import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import backgroundImage from "../assets/images/back.jpg";
import colors from "../constants/colors";
import { getUserData } from "../utils/actions/userActions";
import { AuthResponse } from "../utils/interfaces/AuthResponse";
import Bubble from "../components/Bubble";
import PageContainer from "../components/PageContainer";

const ChatScreen = (props) => {
  const [messagesText, setMessagesText] = useState<string>("");
  const [recipientUserData, setRecipientUserData] =
    useState<AuthResponse | null>(null);
  const [chatId, setChatId] = useState(props.route?.params?.chatId);

  const chatData = props.route?.params?.newChatData;

  useEffect(() => {
    const recipientResult = async () => {
      const result = await getUserData(chatData.users[0]);
      setRecipientUserData(result ?? null);
    };
    recipientResult();
  }, [props.route?.params]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: recipientUserData
        ? recipientUserData.firstName + " " + recipientUserData.lastName
        : "Chat",
    });
  }, [recipientUserData]);

  const sendMessage = useCallback(() => {
    try {
      let id = chatId;
      if (!id) {
        //create new chat
      }
    } catch (error) {}

    setMessagesText("");
  }, [messagesText]);

  return (
    <SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
        >
          <PageContainer style={{ backgroundColor: "transparent" }}>
            {!chatId && (
              <Bubble type="system" text="This is a new chat. Say hi" />
            )}
          </PageContainer>
        </ImageBackground>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => console.log("pressed")}
          >
            <Feather name="plus" size={24} color={colors.blue} />
          </TouchableOpacity>

          <TextInput
            style={styles.textbox}
            value={messagesText}
            onChangeText={(text) => setMessagesText(text)}
            onSubmitEditing={sendMessage}
          />

          {messagesText === "" && (
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => console.log("pressed")}
            >
              <Feather name="camera" size={24} color={colors.blue} />
            </TouchableOpacity>
          )}
          {messagesText !== "" && (
            <TouchableOpacity
              style={{ ...styles.mediaButton, ...styles.sendButton }}
              onPress={sendMessage}
            >
              <Feather name="send" size={20} color={"white"} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  screen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightGrey,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 8,
    width: 35,
  },
});

export default ChatScreen;
