import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import SubmitButton from "../components/SubmitButton";

const AuthScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <Input
          label="First Name"
          icon={"user-o"}
          iconSize={20}
          iconPack={FontAwesome}
          errorText="Error"
        />
        <Input
          label="Last Name"
          icon={"user-o"}
          iconSize={20}
          iconPack={FontAwesome}
        />
        <Input
          label="E-Mail"
          icon={"mail-outline"}
          iconSize={20}
          iconPack={Ionicons}
        />
        <Input
          label="Password"
          icon={"lock"}
          iconSize={20}
          iconPack={Feather}
        />
        <SubmitButton />
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthScreen;
